"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingMenuIcon from "@/components/FloatingMenuIcon";
import {
  projectsData,
  projectKeys,
  type ProjectData,
} from "@/lib/projectsData";
import "@/styles/styles.css";
import "@/styles/projects.css";
import "@/styles/footer.css";

const NAV_PROJECTS = [
  { key: "Beverly-Hills", number: "01" },
  { key: "Winds-Willow-Reserve", number: "02" },
] as const;

export default function ProjectsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectParam = searchParams.get("project");

  const initialKey =
    projectParam && projectsData[projectParam]
      ? projectParam
      : projectKeys[0];

  const [currentProjectKey, setCurrentProjectKey] = useState(initialKey);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const transitioningRef = useRef(false);
  const projectKeyRef = useRef(currentProjectKey);
  const lastScrollTime = useRef(0);

  projectKeyRef.current = currentProjectKey;
  transitioningRef.current = isTransitioning;

  const project: ProjectData = projectsData[currentProjectKey];

  const applyTheme = useCallback((p: ProjectData) => {
    const accent = p.accentColor || "#dc2626";
    const bg = p.bgColor || "#ffffff";
    const titleC = p.titleColor || accent;

    document.documentElement.style.setProperty("--project-accent", accent);
    document.documentElement.style.setProperty("--project-accent-dark", accent);
    document.documentElement.style.setProperty("--project-bg", bg);
    document.documentElement.style.setProperty("--project-title-color", titleC);

    const sidebar = document.querySelector(".project-sidebar") as HTMLElement | null;
    const content = document.querySelector(".project-content") as HTMLElement | null;
    const title = document.getElementById("projectTitle");
    const arrow = document.querySelector(".scroll-arrow") as HTMLElement | null;
    const activeNav = document.querySelector(
      ".project-nav-item.active",
    ) as HTMLElement | null;

    if (sidebar) sidebar.style.background = bg;
    if (content) content.style.background = bg;
    if (title) title.style.color = titleC;
    if (arrow) arrow.style.color = accent;
    if (activeNav) activeNav.style.color = accent;
  }, []);

  const loadProject = useCallback(
    (projectKey: string, animate = true) => {
      if (!projectsData[projectKey]) return;

      if (animate) {
        setIsTransitioning(true);
      }

      const runUpdate = () => {
        setCurrentProjectKey(projectKey);
        setCurrentImageIndex(0);
        applyTheme(projectsData[projectKey]);

        if (animate) {
          setTimeout(() => {
            setIsTransitioning(false);
          }, 150);
        }
      };

      if (animate) {
        setTimeout(runUpdate, 400);
      } else {
        runUpdate();
      }
    },
    [applyTheme],
  );

  const navigateToProject = useCallback(
    (projectKey: string) => {
      if (!projectsData[projectKey] || transitioningRef.current) return;
      if (projectKey === projectKeyRef.current) return;

      router.replace(`/projects?project=${projectKey}`, { scroll: false });
      loadProject(projectKey, true);
    },
    [loadProject, router],
  );

  const navigateToNextProject = useCallback(() => {
    const currentIndex = projectKeys.indexOf(projectKeyRef.current);
    const nextIndex = (currentIndex + 1) % projectKeys.length;
    navigateToProject(projectKeys[nextIndex]);
  }, [navigateToProject]);

  const navigateToPreviousProject = useCallback(() => {
    const currentIndex = projectKeys.indexOf(projectKeyRef.current);
    const prevIndex =
      (currentIndex - 1 + projectKeys.length) % projectKeys.length;
    navigateToProject(projectKeys[prevIndex]);
  }, [navigateToProject]);

  const previousImage = useCallback(() => {
    const p = projectsData[projectKeyRef.current];
    if (!p) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + p.images.length) % p.images.length,
    );
  }, []);

  const nextImage = useCallback(() => {
    const p = projectsData[projectKeyRef.current];
    if (!p) return;
    setCurrentImageIndex((prev) => (prev + 1) % p.images.length);
  }, []);

  const openLightbox = useCallback(() => {
    setLightboxIndex(currentImageIndex);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, [currentImageIndex]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  // Sync from URL on mount / param change
  useEffect(() => {
    if (projectParam && projectsData[projectParam] && projectParam !== currentProjectKey) {
      loadProject(projectParam, false);
    } else if (!projectParam) {
      applyTheme(projectsData[currentProjectKey]);
    } else {
      applyTheme(projectsData[currentProjectKey]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectParam]);

  useEffect(() => {
    applyTheme(project);

    // Carry project theme into contact links (matches original projects.js)
    document
      .querySelectorAll('a[href="/contact"], a[href*="/contact"]')
      .forEach((link) => {
        const a = link as HTMLAnchorElement;
        a.href = `/contact?project=${currentProjectKey}`;
      });
  }, [project, applyTheme, currentProjectKey]);

  // Wheel + keyboard navigation
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Stacked mobile layout should scroll. Project changes stay on the nav.
      if (window.matchMedia("(max-width: 1024px)").matches) return;

      if (transitioningRef.current) {
        e.preventDefault();
        return;
      }

      const descriptionElement = document.querySelector(".project-description");
      const isScrollingDescription =
        descriptionElement && descriptionElement.contains(e.target as Node);

      if (isScrollingDescription) return;

      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime.current < 1200) return;

      if (Math.abs(e.deltaY) > 10) {
        if (e.deltaY > 0) {
          navigateToNextProject();
        } else {
          navigateToPreviousProject();
        }
        lastScrollTime.current = Date.now();
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") closeLightbox();
        else if (e.key === "ArrowLeft") {
          setLightboxIndex(
            (prev) =>
              (prev - 1 + project.images.length) % project.images.length,
          );
        } else if (e.key === "ArrowRight") {
          setLightboxIndex((prev) => (prev + 1) % project.images.length);
        }
        return;
      }

      if (transitioningRef.current) return;

      if (e.key === "ArrowLeft") previousImage();
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        navigateToNextProject();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        navigateToPreviousProject();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("keydown", onKey);
    };
  }, [
    lightboxOpen,
    closeLightbox,
    navigateToNextProject,
    navigateToPreviousProject,
    nextImage,
    previousImage,
    project.images.length,
  ]);

  return (
    <>
      <Navbar variant="light" activePage="projects" />
      <FloatingMenuIcon />

      <div
        className={`project-page${isTransitioning ? " transitioning" : ""}`}
      >
        <div className="project-sidebar">
          <div className="project-nav">
            {NAV_PROJECTS.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className={`project-nav-item${
                  currentProjectKey === item.key ? " active" : ""
                }`}
                data-project={item.key}
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    item.key !== currentProjectKey &&
                    !transitioningRef.current
                  ) {
                    navigateToProject(item.key);
                  }
                }}
              >
                <span className="project-number">{item.number}</span>
              </a>
            ))}
            <Link href="/projects" className="project-nav-all">
              ALL WORKS
            </Link>
          </div>
        </div>

        <div className="project-content">
          <div className="project-info">
            <h1 className="project-title" id="projectTitle">
              {project.title}
            </h1>
            <div
              className="project-description"
              id="projectDescription"
              dangerouslySetInnerHTML={{
                __html: `<p>${project.description}</p>`,
              }}
            />
          </div>
        </div>

        <div className="project-images">
          <div className="image-carousel">
            <div className="carousel-counter">
              <span className="current-image">{currentImageIndex + 1}</span>
              <span className="total-images" id="totalImages">
                {project.images.length}
              </span>
            </div>

            <div className="carousel-controls">
              <button
                className="carousel-btn prev-btn"
                id="prevImage"
                type="button"
                onClick={previousImage}
              >
                ←
              </button>
              <button
                className="carousel-btn next-btn"
                id="nextImage"
                type="button"
                onClick={nextImage}
              >
                →
              </button>
            </div>

            <div
              className="carousel-track"
              id="carouselTrack"
              style={{
                transform: `translateX(${currentImageIndex * -100}%)`,
              }}
              onClick={(e) => {
                if ((e.target as HTMLElement).tagName === "IMG") {
                  openLightbox();
                }
              }}
            >
              {project.images.map((src, index) => (
                <div className="carousel-slide" key={src}>
                  <img src={src} alt={`Project image ${index + 1}`} />
                </div>
              ))}
            </div>

            <button
              className="view-gallery-btn"
              id="viewGalleryBtn"
              type="button"
              onClick={openLightbox}
            >
              <span className="gallery-icon">⛶</span>
              <span>View Gallery</span>
            </button>
          </div>

          <div
            className="scroll-explore scroll-explore-desktop"
            onClick={navigateToNextProject}
          >
            <div className="scroll-explore-text">SCROLL TO EXPLORE</div>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>

        <div
          className="scroll-explore scroll-explore-mobile"
          onClick={navigateToNextProject}
        >
          <div className="scroll-explore-text">SCROLL TO EXPLORE</div>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>

      <Footer activePage="projects" />

      <div
        className={`gallery-lightbox${lightboxOpen ? " active" : ""}`}
        id="galleryLightbox"
        style={{ display: lightboxOpen ? "flex" : "none" }}
        onClick={(e) => {
          if (
            e.target === e.currentTarget ||
            (e.target as HTMLElement).classList.contains("lightbox-content")
          ) {
            closeLightbox();
          }
        }}
      >
        <div className="lightbox-header">
          <div className="lightbox-counter">
            <span className="lightbox-current">{lightboxIndex + 1}</span>
            <span className="lightbox-total">
              / {project.images.length}
            </span>
          </div>
          <button
            className="lightbox-close"
            id="lightboxClose"
            type="button"
            onClick={closeLightbox}
          >
            ✕
          </button>
        </div>

        <div className="lightbox-content">
          <button
            className="lightbox-nav lightbox-prev"
            id="lightboxPrev"
            type="button"
            onClick={() =>
              setLightboxIndex(
                (prev) =>
                  (prev - 1 + project.images.length) % project.images.length,
              )
            }
          >
            ←
          </button>
          <div className="lightbox-image-container">
            <img
              src={project.images[lightboxIndex]}
              alt="Gallery Image"
              className="lightbox-image"
              id="lightboxImage"
            />
          </div>
          <button
            className="lightbox-nav lightbox-next"
            id="lightboxNext"
            type="button"
            onClick={() =>
              setLightboxIndex(
                (prev) => (prev + 1) % project.images.length,
              )
            }
          >
            →
          </button>
        </div>

        <div className="lightbox-thumbnails" id="lightboxThumbnails">
          {project.images.map((src, index) => (
            <div
              key={src}
              className={`lightbox-thumbnail${
                index === lightboxIndex ? " active" : ""
              }`}
              onClick={() => setLightboxIndex(index)}
            >
              <img src={src} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
