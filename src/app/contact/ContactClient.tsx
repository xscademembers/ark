"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingMenuIcon from "@/components/FloatingMenuIcon";
import "@/styles/styles.css";
import "@/styles/contact.css";
import "@/styles/footer.css";

const THEME_MAP: Record<string, string> = {
  "Beverly-Hills": "theme-blue",
  "Winds-Willow-Reserve": "theme-green",
};

export default function ContactClient() {
  const searchParams = useSearchParams();
  const project = searchParams.get("project");
  const themeClass = project && THEME_MAP[project] ? THEME_MAP[project] : "";

  const [activeOption, setActiveOption] = useState(0);
  const [fileLabel, setFileLabel] = useState("Join a file");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const bestTimeRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (themeClass) {
      document.body.classList.add(themeClass);
    }
    return () => {
      Object.values(THEME_MAP).forEach((c) => document.body.classList.remove(c));
    };
  }, [themeClass]);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      ".say-hello-container, .contact-form-container, .request-info-box, .contact-options, .form-section",
    );

    animatedElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(30px)";
      htmlEl.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      fadeInObserver.observe(el);
    });

    const heroImage = document.querySelector(
      ".contact-hero-image img",
    ) as HTMLElement | null;

    const onScroll = () => {
      if (heroImage) {
        const rate = window.pageYOffset * 0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      fadeInObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = (file.size / 1024).toFixed(2);
      setFileLabel(`${file.name} (${fileSize} KB)`);
    }
  };

  const handleSend = (e: React.MouseEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";

    if (!name || !email) {
      alert("Please fill in the required fields (Name and Email)");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    alert(
      "Thank you! Your message has been sent successfully. We will get back to you soon.",
    );
  };

  const onInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <>
      <Navbar variant="light" activePage="contact" />
      <FloatingMenuIcon />

      <section className="contact-hero-wrapper">
        <div className="contact-hero">
          <div className="contact-hero-image">
            <img
              src="/images/water-university-1.jpg"
              alt="Contact Maman Corp"
            />
            <div className="hero-overlay"></div>
          </div>
        </div>

        <div className="say-hello-section">
          <div className="say-hello-container">
            <h2 className="say-hello-label">Say Hello !</h2>
            <h1 className="say-hello-title">
              For a project, as a partner or as a team.
            </h1>
            <p className="say-hello-text">
              We are blending physical building structures from concepts and
              ideas to link people and space to the solution they need to be
              more efficient and productive. If you&apos;re a potential employee
              or want become a vendor or have a project we can discuss our
              journey together begins here.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="contact-form-container">
          <div className="contact-options">
            <h3 className="contact-options-title">Get in touch</h3>

            <div
              className={`option-item${activeOption === 0 ? " active" : ""}`}
              onClick={() => setActiveOption(0)}
            >
              <div className="option-radio"></div>
              <span className="option-text">
                Request our service for a project
              </span>
            </div>

            <div
              className={`option-item${activeOption === 1 ? " active" : ""}`}
              onClick={() => setActiveOption(1)}
            >
              <div className="option-radio"></div>
              <span className="option-text">Working with us as a Vendor</span>
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">
              Name<span className="required">*</span>
            </label>
            <div className="form-row">
              <input
                ref={nameRef}
                type="text"
                className="form-input"
                placeholder="Name"
                onFocus={onInputFocus}
                onBlur={onInputBlur}
              />
              <input
                ref={companyRef}
                type="text"
                className="form-input"
                placeholder="Name of your company"
                onFocus={onInputFocus}
                onBlur={onInputBlur}
              />
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">
              Info<span className="required">*</span>
            </label>
            <div className="form-row">
              <input
                ref={emailRef}
                type="email"
                className="form-input"
                placeholder="Email"
                onFocus={onInputFocus}
                onBlur={onInputBlur}
              />
              <input
                ref={phoneRef}
                type="tel"
                className="form-input"
                placeholder="Phone"
                onFocus={onInputFocus}
                onBlur={onInputBlur}
              />
            </div>
            <div className="form-row">
              <input
                ref={addressRef}
                type="text"
                className="form-input"
                placeholder="Address"
                onFocus={onInputFocus}
                onBlur={onInputBlur}
              />
              <input
                ref={bestTimeRef}
                type="text"
                className="form-input"
                placeholder="Best time to call"
                onFocus={onInputFocus}
                onBlur={onInputBlur}
              />
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Your message</label>
            <textarea
              ref={messageRef}
              className="form-textarea"
              placeholder="Type your request here"
              onFocus={onInputFocus}
              onBlur={onInputBlur}
            ></textarea>
          </div>

          <div className="form-actions">
            <button className="btn-send-message" type="button" onClick={handleSend}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Send message</span>
            </button>

            <button
              className="btn-join-file"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current?.click();
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 13v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4M14 7l-4-4m0 0L6 7m4-4v12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{fileLabel}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              id="file-input"
              accept=".doc,.docx,.pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          <p className="form-note">
            * The attach a file should be able to receive .doc, .docx, and .pdf
            file formats.
          </p>
        </div>
      </section>

      <section className="any-request-section">
        <div className="any-request-container">
          <div className="request-info-box">
            <h2 className="request-title">Any request ?</h2>

            <div className="request-info-group">
              <h3 className="info-title">Get in touch !</h3>
              <p className="info-text">Arka developers</p>
              <p className="info-text">27-B-484, Rushikonda</p>
              <p className="info-text">Visakhapatnam, 530045</p>
            </div>

            <div className="request-info-group">
              <p className="info-text">
                <strong>Phone:</strong> 9581616789
              </p>
              <p className="info-text">
                <strong>Email:</strong> thearkadevelopers@gmail.com{" "}
              </p>
            </div>

            <div className="request-info-group">
              <h3 className="info-title">Want to join the team ?</h3>
              <p className="info-text">
                Use the form. All applicants must complete the online form
              </p>
            </div>
          </div>

          <div className="request-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15203.820729382!2d83.3861866!3d17.8002179!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395b703573dbcd%3A0xca06ff987866d420!2sARKA%20DEVELOPERS!5e0!3m2!1sen!2sin!4v1702896000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer activePage="contact" />
    </>
  );
}
