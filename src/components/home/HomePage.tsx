"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useHomeLoader } from "@/hooks/useHomeLoader";
import { slidesData } from "@/lib/slidesData";
import SlideContent from "./SlideContent";

export default function HomePage() {
  const [contentViewActive, setContentViewActive] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const navigatingRef = useRef(false);
  const scrollLockRef = useRef(false);
  const slideIndexRef = useRef(0);
  const pageIndexRef = useRef(0);
  const totalSlides = slidesData.length;

  const isCompactViewport = useCallback(
    () => window.matchMedia("(max-width: 1024px)").matches,
    [],
  );

  const { progress, loadingHidden, loadingGone, heroAnimate } = useHomeLoader({
    videoRef,
  });

  useEffect(() => {
    slideIndexRef.current = slideIndex;
  }, [slideIndex]);
  useEffect(() => {
    pageIndexRef.current = pageIndex;
  }, [pageIndex]);

  const openContentView = useCallback(() => {
    document.body.style.overflow = "hidden";
    videoRef.current?.pause();
    document.body.classList.add("content-view-active");
    document.querySelector(".header")?.classList.add("content-view-nav");
    setContentViewActive(true);
    setSlideIndex(0);
    setPageIndex(0);
  }, []);

  const closeContentView = useCallback(() => {
    document.body.classList.remove("content-view-active");
    document.body.style.overflow = "";
    document.querySelector(".header")?.classList.remove("content-view-nav");
    setContentViewActive(false);
    void videoRef.current?.play();
  }, []);

  const navigateNext = useCallback(() => {
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    setFade(false);

    setTimeout(() => {
      const si = slideIndexRef.current;
      const pi = pageIndexRef.current;
      if (pi < 1) {
        setPageIndex(1);
      } else if (si < totalSlides - 1) {
        setSlideIndex(si + 1);
        setPageIndex(0);
      }
      setFade(true);
      setTimeout(() => {
        navigatingRef.current = false;
      }, 800);
    }, 50);
  }, [totalSlides]);

  const navigatePrev = useCallback(() => {
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    setFade(false);

    setTimeout(() => {
      const si = slideIndexRef.current;
      const pi = pageIndexRef.current;
      if (pi > 0) {
        setPageIndex(0);
      } else if (si > 0) {
        setSlideIndex(si - 1);
        setPageIndex(1);
      }
      setFade(true);
      setTimeout(() => {
        navigatingRef.current = false;
      }, 800);
    }, 50);
  }, []);

  useEffect(() => {
    if (!heroAnimate || contentViewActive) return;

    let isHeroScrolling = false;
    let heroScrollTimeout: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      if (isCompactViewport()) return;
      if (document.body.classList.contains("content-view-active")) return;
      clearTimeout(heroScrollTimeout);
      if (isHeroScrolling) return;
      if (e.deltaY > 50) {
        isHeroScrolling = true;
        openContentView();
        heroScrollTimeout = setTimeout(() => {
          isHeroScrolling = false;
        }, 1000);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      clearTimeout(heroScrollTimeout);
    };
  }, [heroAnimate, contentViewActive, openContentView, isCompactViewport]);

  useEffect(() => {
    if (!contentViewActive) return;

    const contentView = document.querySelector(".content-view");

    const onWheel = (e: WheelEvent) => {
      // On phones and tablets the story is a normal scrolling page.
      if (isCompactViewport()) return;
      e.preventDefault();
      if (scrollLockRef.current || navigatingRef.current) return;
      scrollLockRef.current = true;
      if (e.deltaY > 0) navigateNext();
      else navigatePrev();
      setTimeout(() => {
        scrollLockRef.current = false;
      }, 1000);
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!isCompactViewport() || !contentView) return;
      const canScroll = contentView.scrollHeight > contentView.clientHeight + 24;
      if (canScroll) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - endY;
      if (Math.abs(delta) < 48) return;
      if (delta > 0) navigateNext();
      else navigatePrev();
    };

    const onKey = (e: KeyboardEvent) => {
      if (!document.body.classList.contains("content-view-active")) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        navigateNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        navigatePrev();
      } else if (e.key === "Escape") {
        closeContentView();
      }
    };

    contentView?.addEventListener("wheel", onWheel as EventListener, {
      passive: false,
    } as AddEventListenerOptions);
    contentView?.addEventListener("touchstart", onTouchStart, { passive: true });
    contentView?.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("keydown", onKey);

    return () => {
      contentView?.removeEventListener("wheel", onWheel as EventListener);
      contentView?.removeEventListener("touchstart", onTouchStart);
      contentView?.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("keydown", onKey);
    };
  }, [
    contentViewActive,
    navigateNext,
    navigatePrev,
    closeContentView,
    isCompactViewport,
  ]);

  return (
    <>
      {!loadingGone && (
        <div className={`loading-screen${loadingHidden ? " hidden" : ""}`}>
          <div className="loading-bg-logo"></div>
          <div className="loading-content">
            <img
              src="/images/logo.png"
              alt="Arka Developers"
              className="loading-main-logo"
            />
            <div className="loading-counter">
              <span className="counter-number">{progress}</span>
            </div>
            <div className="loading-tagline">QUALITY IS OUR STANDARD</div>
          </div>
          <div className="loading-bar">
            <div
              className="loading-progress"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <Navbar activePage="home" />

      <section className="hero">
        <video
          ref={videoRef}
          className="hero-video"
          muted
          loop
          playsInline
          preload="auto"
          // Autoplay after loader finishes (hook calls play())
        >
          <source src="/videos/HomePageVideo1.mp4" type="video/mp4" />
        </video>

        <div className="hero-bottom">
          <div className="hero-lower">
            <div className={`hero-left${heroAnimate ? " animate" : ""}`}>
              <p className="tagline">EXPERTS SINCE 2021</p>
              <h3>
                Arka Developers is a design-driven real estate firm that curates
                environments where architectural excellence, modern lifestyle,
                and enduring value converge.
              </h3>
            </div>

            <div className={`hero-middle${heroAnimate ? " animate" : ""}`}>
              <p style={{ color: "rgb(208, 208, 208)" }}>
                The Arka signature is defined by a holistic approach to
                development, where sophisticated architecture, sustainable
                innovation, and punctual execution intersect. Our commitment
                extends beyond the physical structure, ensuring that every
                project reinforces a foundation of long-term reliability for our
                clients.
              </p>
            </div>

            <div
              className={`hero-right${heroAnimate ? " animate" : ""}`}
              onClick={openContentView}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openContentView();
              }}
            >
              <div className="scroll-text" onClick={openContentView}>
                Scroll to discover
              </div>
            </div>
          </div>

          <div
            className={`hero-arrow${heroAnimate ? " animate" : ""}`}
            onClick={openContentView}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openContentView();
            }}
          >
            ↓
          </div>
        </div>
      </section>

      <div className="content-view">
        <div className="content-view-left">
          <div className="slide-counter">
            {contentViewActive
              ? `${slideIndex + 1}/${String(totalSlides).padStart(2, "0")}`
              : ""}
          </div>
          <div className="slide-progress">
            {contentViewActive &&
              Array.from({ length: totalSlides }, (_, i) => (
                <span
                  key={i}
                  className={`progress-dot${i === slideIndex ? " active" : ""}`}
                />
              ))}
          </div>
        </div>

        <div
          className="content-view-inner"
          style={{ opacity: fade ? 1 : 0, transition: "opacity 0.05s" }}
        >
          {contentViewActive && (
            <SlideContent
              slideIndex={slideIndex}
              pageIndex={pageIndex}
              totalSlides={totalSlides}
              onNext={navigateNext}
            />
          )}
        </div>

        <div className="content-view-right">
          <div
            className="vertical-scroll-text"
            onClick={navigateNext}
            role="button"
            tabIndex={0}
          >
            SCROLL TO EXPLORE
          </div>
          <div
            className="vertical-arrow"
            onClick={navigateNext}
            role="button"
            tabIndex={0}
          >
            ↓
          </div>
        </div>
      </div>

      <Footer activePage="home" />
    </>
  );
}
