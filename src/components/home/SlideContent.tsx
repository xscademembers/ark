"use client";

import { slidesData } from "@/lib/slidesData";

type SlideContentProps = {
  slideIndex: number;
  pageIndex: number;
  totalSlides: number;
  onNext: () => void;
};

export default function SlideContent({
  slideIndex,
  pageIndex,
  totalSlides,
  onNext,
}: SlideContentProps) {
  const slide = slidesData[slideIndex];
  if (!slide) return null;

  const counter = `${slideIndex + 1}/${String(totalSlides).padStart(2, "0")}`;
  const dots = Array.from({ length: totalSlides }, (_, i) => i);

  if (pageIndex === 0) {
    return (
      <div
        className={`slide-content slide-video-type slide-${slide.id} animate-in`}
        key={`v-${slide.id}`}
      >
        <div className="slides-bg-logo"></div>
        <div className="slide-background">
          <video className="slide-video" autoPlay muted loop playsInline>
            <source src={slide.video} type="video/mp4" />
          </video>
          <div className="slide-overlay"></div>
        </div>

        <div className="slide-left-panel">
          <div className="slide-counter-vertical">{counter}</div>
          <div className="slide-progress-dots">
            {dots.map((i) => (
              <span
                key={i}
                className={`dot${i === slideIndex ? " active" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="slide-text">
          <p className="slide-subtitle">{slide.subtitle}</p>
          <h1
            className="slide-title"
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />
        </div>

        <div
          className="slide-right-panel"
          onClick={onNext}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onNext();
          }}
        >
          <div className="scroll-explore-text" onClick={onNext}>
            SCROLL TO EXPLORE
          </div>
          <div className="scroll-arrow" onClick={onNext}>
            ↓
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`slide-content slide-detail-type slide-${slide.id}-detail animate-in`}
      key={`d-${slide.id}`}
    >
      <div className="slides-bg-logo"></div>
      <div className="slide-detail-background">
        <img
          src={slide.image}
          alt="Background"
          className="detail-bg-image"
        />
      </div>

      <div className="left-red-block"></div>

      <div className="slide-left-panel">
        <div className="slide-counter-vertical">{counter}</div>
        <div className="slide-divider"></div>
        <div className="slide-progress-dots">
          {dots.map((i) => (
            <span
              key={i}
              className={`dot${i === slideIndex ? " active" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="slide-detail-content">
        <p className="detail-subtitle">{slide.detailSubtitle}</p>
        <h2
          className="detail-title"
          dangerouslySetInnerHTML={{ __html: slide.detailTitle }}
        />
        <p
          className="detail-description"
          dangerouslySetInnerHTML={{ __html: slide.description }}
        />
      </div>

      <div
        className="slide-right-panel"
        onClick={onNext}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onNext();
        }}
      >
        <div className="scroll-explore-text" onClick={onNext}>
          SCROLL TO EXPLORE
        </div>
        <div className="scroll-arrow" onClick={onNext}>
          ↓
        </div>
      </div>
    </div>
  );
}
