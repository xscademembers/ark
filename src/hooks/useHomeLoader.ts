"use client";

import { useEffect, useRef, useState } from "react";

type UseHomeLoaderArgs = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
};

function clamp(n: number) {
  return Math.max(0, Math.min(100, n));
}

/**
 * Real asset-based loader: logo + hero video readiness drive 0–100.
 * Dismisses only after progress reaches 100 (with a hard safety timeout).
 */
export function useHomeLoader({ videoRef }: UseHomeLoaderArgs) {
  const [progress, setProgress] = useState(0);
  const [loadingHidden, setLoadingHidden] = useState(false);
  const [loadingGone, setLoadingGone] = useState(false);
  const [heroAnimate, setHeroAnimate] = useState(false);

  const displayRef = useRef(0);
  const targetRef = useRef(0);
  const doneRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    doneRef.current = false;
    displayRef.current = 0;
    targetRef.current = 0;

    document.body.classList.add("loading");
    document.body.classList.remove("hero-locked", "content-view-active");

    const weights = { logo: 0.2, fonts: 0.1, video: 0.7 };
    const parts = { logo: 0, fonts: 0, video: 0 };
    const startedAt = performance.now();
    const MIN_MS = 900; // always show a brief real loader, even on cache hits

    const recompute = () => {
      const next =
        parts.logo * weights.logo +
        parts.fonts * weights.fonts +
        parts.video * weights.video;
      // Keep a soft floor so the bar always moves while waiting
      targetRef.current = clamp(Math.max(targetRef.current, next * 100));
    };

    // --- Logo ---
    const logo = new Image();
    logo.onload = () => {
      parts.logo = 1;
      recompute();
    };
    logo.onerror = () => {
      parts.logo = 1;
      recompute();
    };
    logo.src = "/images/logo.png";
    if (logo.complete) {
      parts.logo = 1;
      recompute();
    }

    // --- Fonts ---
    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (cancelled) return;
        parts.fonts = 1;
        recompute();
      });
    } else {
      parts.fonts = 1;
      recompute();
    }

    // --- Hero video ---
    const bindVideo = (video: HTMLVideoElement) => {
      const updateFromBuffer = () => {
        if (cancelled || parts.video >= 1) return;

        // Prefer real buffer progress when duration is known
        if (
          video.duration &&
          isFinite(video.duration) &&
          video.buffered.length > 0
        ) {
          const end = video.buffered.end(video.buffered.length - 1);
          // Enough buffered to start playing (~12% or 2s) counts as "ready"
          const readyRatio = Math.min(1, end / Math.max(video.duration * 0.12, 2));
          parts.video = Math.max(parts.video, readyRatio * 0.95);
        } else if (video.readyState >= 2) {
          // HAVE_CURRENT_DATA+
          parts.video = Math.max(parts.video, 0.6);
        } else if (video.readyState >= 1) {
          parts.video = Math.max(parts.video, 0.25);
        }
        recompute();
      };

      const markVideoReady = () => {
        parts.video = 1;
        recompute();
      };

      video.addEventListener("loadstart", updateFromBuffer);
      video.addEventListener("progress", updateFromBuffer);
      video.addEventListener("loadedmetadata", updateFromBuffer);
      video.addEventListener("loadeddata", updateFromBuffer);
      video.addEventListener("canplay", markVideoReady);
      video.addEventListener("canplaythrough", markVideoReady);
      video.addEventListener("error", markVideoReady);

      // Kick loading
      try {
        video.preload = "auto";
        video.load();
      } catch {
        /* ignore */
      }

      updateFromBuffer();

      return () => {
        video.removeEventListener("loadstart", updateFromBuffer);
        video.removeEventListener("progress", updateFromBuffer);
        video.removeEventListener("loadedmetadata", updateFromBuffer);
        video.removeEventListener("loadeddata", updateFromBuffer);
        video.removeEventListener("canplay", markVideoReady);
        video.removeEventListener("canplaythrough", markVideoReady);
        video.removeEventListener("error", markVideoReady);
      };
    };

    let unbindVideo: (() => void) | undefined;
    const videoWait = window.setInterval(() => {
      const video = videoRef.current;
      if (video && !unbindVideo) {
        unbindVideo = bindVideo(video);
        window.clearInterval(videoWait);
      }
    }, 50);

    // Slow creep so bar never freezes before assets report
    const creep = window.setInterval(() => {
      if (doneRef.current || cancelled) return;
      if (targetRef.current < 90) {
        targetRef.current = clamp(targetRef.current + 0.35);
      }
    }, 100);

    const finish = () => {
      if (doneRef.current || cancelled) return;
      doneRef.current = true;
      targetRef.current = 100;
      displayRef.current = 100;
      setProgress(100);

      window.setTimeout(() => {
        if (cancelled) return;
        setLoadingHidden(true);
        document.body.classList.remove("loading");
        document.body.classList.add("hero-locked");
        setHeroAnimate(true);

        // Start playback once revealed
        const video = videoRef.current;
        if (video) {
          void video.play().catch(() => undefined);
        }

        window.setTimeout(() => {
          if (!cancelled) setLoadingGone(true);
        }, 700);
      }, 280);
    };

    // Smooth display progress toward target; finish at 100 when assets ready
    const tick = () => {
      if (cancelled) return;

      const allReady =
        parts.logo >= 1 && parts.fonts >= 1 && parts.video >= 1;

      if (allReady) {
        targetRef.current = 100;
      }

      const diff = targetRef.current - displayRef.current;
      // Ease toward target — faster when catching up, smoother near end
      const step = Math.max(0.4, Math.abs(diff) * 0.12);
      if (Math.abs(diff) <= 0.5) {
        displayRef.current = targetRef.current;
      } else {
        displayRef.current = clamp(
          displayRef.current + Math.sign(diff) * step,
        );
      }

      setProgress(Math.floor(displayRef.current));

      const longEnough = performance.now() - startedAt >= MIN_MS;
      if (allReady && displayRef.current >= 99.5 && longEnough) {
        finish();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Absolute safety — never leave users stuck
    const safety = window.setTimeout(() => {
      parts.logo = 1;
      parts.fonts = 1;
      parts.video = 1;
      recompute();
      finish();
    }, 12000);

    // Start bg logo depth animation
    const bgTimer = window.setTimeout(() => {
      const bgLogo = document.querySelector(
        ".loading-bg-logo",
      ) as HTMLElement | null;
      if (bgLogo) bgLogo.style.animationPlayState = "running";
    }, 40);

    return () => {
      cancelled = true;
      window.clearInterval(videoWait);
      window.clearInterval(creep);
      window.clearTimeout(safety);
      window.clearTimeout(bgTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      unbindVideo?.();
      document.body.classList.remove(
        "loading",
        "hero-locked",
        "content-view-active",
      );
      document.body.style.overflow = "";
    };
  }, [videoRef]);

  return { progress, loadingHidden, loadingGone, heroAnimate };
}
