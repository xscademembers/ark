"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingMenuIcon from "@/components/FloatingMenuIcon";
import "@/styles/styles.css";
import "@/styles/solutions.css";
import "@/styles/footer.css";

export default function SolutionsClient() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".hero-bg", {
        x: 180,
        scale: 1.1,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
      });

      gsap.from(".hero-white", {
        x: -160,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".solutions-tagline", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.6,
      });

      gsap.from(".solutions-title", {
        opacity: 0,
        y: 60,
        duration: 1,
        delay: 0.7,
        ease: "power3.out",
      });

      gsap.from(".solutions-intro-content", {
        scrollTrigger: {
          trigger: ".solutions-intro",
          start: "top 75%",
        },
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      document.querySelectorAll(".service-row").forEach((row, i) => {
        const text = row.querySelector(".service-content");
        const image = row.querySelector("img");

        if (text) {
          gsap.from(text, {
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
            },
            x: i % 2 === 0 ? -120 : 120,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
          });
        }

        if (image) {
          gsap.from(image, {
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
            },
            x: i % 2 === 0 ? 120 : -120,
            scale: 1.08,
            opacity: 0,
            duration: 1.3,
            ease: "power3.out",
          });
        }
      });

      gsap.from(".experts-header", {
        scrollTrigger: {
          trigger: ".experts-section",
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
      });

      gsap.from(".expert-item", {
        scrollTrigger: {
          trigger: ".experts-grid",
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar variant="light" activePage="solutions" />
      <FloatingMenuIcon />

      <section className="solutions-hero">
        <div className="hero-bg"></div>

        <div className="hero-white">
          <p className="solutions-tagline">WE PROVIDE</p>
          <h1 className="solutions-title">
            Complete
            <br />
            Construction
            <br />
            Solutions
          </h1>
        </div>
      </section>

      <section className="solutions-intro">
        <div className="solutions-intro-content">
          <h2>We don&apos;t just build spaces. We craft Atmospheres.</h2>
          <p>
            Our focus is on tailoring construction services and skills to cater
            to the needs of Commercial and Residential clients, assisting them
            in revitalizing and reinventing their environments. Whether
            constructing a new project, expanding existing structures, or
            renovating spaces, we bring our expertise and inventive solutions to
            every project.
          </p>
        </div>
      </section>

      <section className="service-section">
        <div className="service-row">
          <div className="service-content">
            <h2>
              ARKA’s Emergency
              <br />
              Service Team
            </h2>
            <p>
              We understand that emergencies can occur at any time, which is why
              we provide our dedicated team around the clock you can rest
              assured that you&apos;ll receive prompt assistance and efficient
              recovery whenever the need arises.
            </p>
          </div>
          <div className="service-image-right">
            <img src="/images/emergency-service.jpg" alt="Emergency service" />
          </div>
        </div>

        <div className="service-row">
          <div className="service-image-left">
            <img src="/images/warehouse.jpg" alt="Industrial interior" />
          </div>
          <div className="service-content">
            <h2>CRAFTING FUTURES TOGETHER:</h2>
            <p>
              Let&apos;s be honest - our collaboration with clients extends far
              beyond mere construction; it&apos;s about fostering productivity,
              fostering innovation, achieving breakthroughs, and driving
              progress within the spaces we create. That&apos;s why we
              collaborate closely with each client to design environments
              tailored to their specific requirements. By integrating our
              understanding of technology and current trends with our
              construction proficiency, we&apos;re dedicated to constructing the
              future for you and ensuring its optimal functionality.
            </p>
          </div>
        </div>
      </section>

      <section className="experts-section">
        <div className="experts-header">
          <h2>Our in-house experts</h2>
          <p>
            With expertise on the team, we can offer creative and complete
            construction solutions.
          </p>
        </div>

        <div className="experts-grid">
          <div className="expert-item">
            <div className="expert-icon">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 50h40M15 50V20l10-10M25 10v40M35 25h10v25M35 25l10-10v10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 style={{ color: "#e8999c" }}>PROJECT MANAGEMENT</h3>
            <p>The art and science of making things happen</p>
          </div>

          <div className="expert-item">
            <div className="expert-icon">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="30"
                  cy="30"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="2 3"
                />
                <line
                  x1="30"
                  y1="15"
                  x2="30"
                  y2="30"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3 style={{ color: "#e8999c" }}>CARPENTRY</h3>
            <p>Shaping spaces with craftsmanship and attention to detail</p>
          </div>

          <div className="expert-item">
            <div className="expert-icon">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="15"
                  y="15"
                  width="30"
                  height="30"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M20 20h20M20 25h20M20 30h20M20 35h20M20 40h20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <h3 style={{ color: "#e8999c" }}>AUDIOVISUAL</h3>
            <p>Technical expertise for basic to fully equipped spaces</p>
          </div>

          <div className="expert-item">
            <div className="expert-icon">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 50h40M15 50V20l10-10M25 10v40M35 25h10v25M35 25l10-10v10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 style={{ color: "#e8999c" }}>HARDWARE</h3>
            <p>
              High-security hardware knowledge and custom finishing details
            </p>
          </div>
        </div>
      </section>

      <Footer activePage="solutions" />
    </>
  );
}
