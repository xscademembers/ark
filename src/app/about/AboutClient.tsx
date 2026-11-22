"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingMenuIcon from "@/components/FloatingMenuIcon";
import "@/styles/styles.css";
import "@/styles/about.css";
import "@/styles/footer.css";

export default function AboutClient() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const compact = window.matchMedia("(max-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      gsap.set(
        [
          ".hero-title",
          ".hero-subtitle",
          ".stat-item",
          ".stat-number",
          ".stat-label",
          ".story-block",
          ".showcase-item",
        ],
        {
          clearProps: "all",
          opacity: 1,
          visibility: "visible",
        },
      );

      gsap.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.from(".section-label", {
        scrollTrigger: {
          trigger: ".story-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".section-title", {
        scrollTrigger: {
          trigger: ".story-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      document.querySelectorAll(".story-block").forEach((block, index) => {
        const isEven = index % 2 === 0;
        gsap.from(block, {
          scrollTrigger: {
            trigger: block,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          x: compact ? 0 : isEven ? -60 : 60,
          y: compact ? 24 : 0,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      gsap.from(".cta-title", {
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".cta-text", {
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".cta-button", {
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.4,
      });

      if (!compact) {
        gsap.to(".about-hero-image img", {
          scrollTrigger: {
            trigger: ".about-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          y: 150,
          ease: "none",
        });
      }

      document.querySelectorAll(".story-block").forEach((block) => {
        block.addEventListener("mouseenter", () => {
          gsap.to(block, { y: -8, duration: 0.3, ease: "power2.out" });
        });
        block.addEventListener("mouseleave", () => {
          gsap.to(block, { y: 0, duration: 0.3, ease: "power2.out" });
        });
      });

      gsap.to(".cta-button", {
        boxShadow: "0 15px 50px rgba(220, 38, 38, 0.4)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar variant="light" activePage="about" />
      <FloatingMenuIcon />

      <section className="about-hero">
        <div className="about-hero-image">
          <img
            src="/images/water-university-1.jpg"
            alt="Maman Corp Team"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-text-overlay">
          <div className="hero-label">ABOUT US</div>
          <h1 className="hero-title">
            Building the Future,
            <br />
            One Project at a Time
          </h1>
          <div className="hero-scroll-indicator">
            <span>Scroll to explore</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="story-container">
          <div className="story-header">
            <span className="section-label">OUR STORY</span>
            <h2 className="section-title">We build possibilities.</h2>
          </div>
          <p>
            At ARKA DEVELOPERS, we transcend conventional construction by
            creating environments that enable growth, inspire progress, and
            transform vision into tangible reality. Each project we undertake is
            guided by a steadfast commitment to innovation, uncompromising
            quality, and purposeful design — ensuring that every space we
            deliver is thoughtfully engineered to support your ambitions,
            operational needs, and long-term aspirations.
          </p>
          <br />
          <p>
            Through disciplined planning, advanced construction methodologies,
            and a client-centric delivery model, we develop spaces that combine
            functionality, aesthetic refinement, and structural integrity. Our
            approach is focused on delivering enduring value, operational
            efficiency, and future-ready infrastructure — converting potential
            into performance and ideas into lasting achievements.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Build Something Amazing?</h2>
            <p className="cta-text">
              Let&apos;s discuss how we can bring your vision to life with our
              expertise and dedication.
            </p>
            <Link href="/contact" className="cta-button">
              <span>Get in Touch</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10h12m0 0l-6-6m6 6l-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <div className="cta-background"></div>
        </div>
      </section>

      <Footer activePage="about" />
    </>
  );
}
