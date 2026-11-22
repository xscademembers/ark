"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingMenuIcon from "@/components/FloatingMenuIcon";
import "@/styles/styles.css";
import "@/styles/process.css";
import "@/styles/footer.css";

export default function ProcessClient() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const compact = window.matchMedia("(max-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      gsap.from(".title-line", {
        x: compact ? 0 : -50,
        y: compact ? 16 : 0,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      document.querySelectorAll(".stat-number").forEach((stat, index) => {
        const el = stat as HTMLElement;
        const text = el.textContent || "";
        const hasPercent = text.includes("%");
        const hasSlash = text.includes("/");
        const number = parseInt(text, 10);
        if (isNaN(number)) return;

        gsap.from(el, {
          textContent: 0,
          duration: 1.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          delay: 1.4 + index * 0.1,
          onUpdate: function () {
            let displayText = String(
              Math.ceil(Number((this.targets()[0] as HTMLElement).textContent)),
            );
            if (hasPercent) displayText += "%";
            else if (hasSlash) displayText += "/7";
            el.textContent = displayText;
          },
        });
      });

      document.querySelectorAll(".process-step").forEach((step) => {
        const number = step.querySelector(".step-number");
        const text = step.querySelector(".step-text");
        const image = step.querySelector(".step-image");
        const isRight = step.classList.contains("step-right");

        if (number) {
          gsap.from(number, {
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            x: compact ? 0 : isRight ? -200 : 200,
            y: compact ? 20 : 0,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          });
        }
        if (text) {
          gsap.from(text, {
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            x: compact ? 0 : isRight ? -80 : 80,
            y: compact ? 24 : 0,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          });
        }
        if (image) {
          gsap.from(image, {
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            x: compact ? 0 : isRight ? 80 : -80,
            y: compact ? 24 : 0,
            scale: compact ? 1 : 1.05,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar variant="light" activePage="process" />
      <FloatingMenuIcon />

      <section className="process-hero">
        <div className="hero-bg-pattern"></div>
        <div className="hero-content">
          <div className="hero-badge">OUR PROCESS</div>
          <h1 className="hero-title">
            <span className="title-line">ACHIEVING SUCCESS STEMS</span>
            <span className="title-line">
              FROM <span className="highlight-text">THE JOURNEY</span>
            </span>
          </h1>
          <div className="hero-description">
            <div className="description-card left-card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 11L12 14L22 4"
                    stroke="#d62323"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                    stroke="#d62323"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="hero-text-left">
                A structured and meticulous approach guarantees that creative
                visions are transformed into tangible outcomes. This is why we
                meticulously oversee each stage and aspect, starting from the
                initial contact all the way through to the concluding inspection.
              </p>
            </div>
            <div className="description-card right-card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="#d62323"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="hero-text-right">
                Throughout the journey, our priority remains on safety,
                responsiveness to changing on-site demands, and unwavering
                commitment to delivering an exceptional Final Outcome. Discover
                further insights into the intricacies of our process.
              </p>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">Key Steps</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">100 %</div>
              <div className="stat-label">Quality Focus</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      <section className="process-steps">
        <div className="process-step step-right">
          <div className="step-number-container left">
            <div className="step-number">01</div>
          </div>
          <div className="step-content">
            <div className="step-text">
              <h2 className="step-title">
                Goals
                <br />
                and
                <br />
                vision
              </h2>
              <p>
                Every project begins with a comprehensive understanding of your
                present standing and your future aspirations. We take the time to
                carefully evaluate your objectives, operational requirements, and
                long-term vision, enabling us to establish a clear and strategic
                roadmap forward.
              </p>
              <br />
              <p>
                By gaining a thorough insight into your expectations, functional
                needs, and growth plans, we lay the foundation for delivering
                tailored solutions that are both practical and forward-thinking.
                This structured approach allows us to transform your ideas into
                well- planned, tangible outcomes, ensuring that every development
                we undertake is aligned with your vision and engineered for
                enduring value.
              </p>
            </div>
            <div className="step-image">
              <img src="/images/process-step-1.jpg" alt="Goals and vision" />
            </div>
          </div>
        </div>

        <div className="process-step step-left">
          <div className="step-content">
            <div className="step-image">
              <img src="/images/process-step-2.jpg" alt="Proposal" />
              <div className="image-overlay"></div>
            </div>
            <div className="step-text">
              <h2 className="step-title">Proposal</h2>
              <p>
                To accurately evaluate your project, we undertake a detailed
                definition of its scope, technical requirements, and execution
                parameters, followed by the solicitation of competitive bids from
                qualified vendors and contractors. Our structured assessment
                process ensures transparency, cost efficiency, and adherence to
                project objectives.
              </p>
              <br />
              <p>
                Leveraging our extensive industry expertise and market
                intelligence, we meticulously review and refine the proposals
                received to ensure optimal alignment with your vision, quality
                expectations, timelines, and budgetary considerations. Through
                strategic value engineering and cost optimization, we deliver a
                balanced solution that maximizes performance while maintaining
                financial prudence, ensuring your project is positioned for
                successful execution and long-term value creation.
              </p>
            </div>
          </div>
          <div className="step-number-container right">
            <div className="step-number">02</div>
          </div>
        </div>

        <div className="process-step step-right">
          <div className="step-number-container left">
            <div className="step-number">03</div>
          </div>
          <div className="step-content">
            <div className="step-text">
              <h2 className="step-title">
                Planning
                <br />
                and
                <br />
                logistics
              </h2>
              <p>
                Subsequent to the evaluation and planning phase, we formulate a
                comprehensive execution strategy encompassing detailed work plans,
                milestone-based timelines, and structured project schedules. This
                systematic planning ensures clarity, accountability, and seamless
                coordination across all phases of development.
              </p>
              <br />
              <p>
                With our extensive experience in executing projects within live
                and occupied environments, we implement carefully phased
                construction methodologies and safety-driven workflows to ensure
                continuity of your routine operations. Our approach prioritizes
                minimal disruption, operational safety, and timely delivery,
                enabling your organization to function smoothly while we
                efficiently transform your space.
              </p>
            </div>
            <div className="step-image">
              <img
                src="/images/process-step-3.jpg"
                alt="Planning and logistics"
              />
            </div>
          </div>
        </div>

        <div className="process-step step-left">
          <div className="step-content">
            <div className="step-image">
              <img src="/images/process-step-4.jpg" alt="Project" />
            </div>
            <div className="step-text">
              <h2 className="step-title">Project Kickoff</h2>
              <p>
                During the pre-construction phase, we comprehensively manage all
                statutory documentation, regulatory approvals, and permit
                requirements to facilitate a smooth and uninterrupted commencement
                of your project. Our team coordinates pre-construction meetings,
                liaises with relevant authorities, and ensures full compliance
                with applicable legal and procedural frameworks.
              </p>
              <br />
              <p>
                In parallel, we proactively initiate procurement processes for
                long-lead items and critical materials to mitigate schedule risks
                and prevent potential delays. We also manage all technical
                submittals, approval workflows, and documentation controls,
                thereby ensuring that every preparatory requirement is meticulously
                addressed, laying a strong foundation for timely execution and
                successful project delivery.
              </p>
            </div>
          </div>
          <div className="step-number-container right">
            <div className="step-number">04</div>
          </div>
        </div>

        <div className="process-step step-right">
          <div className="step-number-container left">
            <div className="step-number">05</div>
          </div>
          <div className="step-content">
            <div className="step-text">
              <h2 className="step-title">Project Completion</h2>
              <p>
                As the project approaches completion, we systematically compile a
                comprehensive punch list and conduct detailed inspections across
                all disciplines to verify that every component meets approved
                specifications, quality standards, and regulatory requirements.
              </p>
              <br />
              <p>
                Our team meticulously reviews finishes, installations, and
                functional systems, rectifying any deficiencies and performing
                final refinements to ensure the project is delivered in a pristine,
                fully compliant, and occupancy-ready condition. This rigorous
                close-out process guarantees that your facility is presented in an
                immaculate state, reflecting superior workmanship and enduring
                quality.
              </p>
            </div>
            <div className="step-image">
              <img src="/images/process-step-5.jpg" alt="Completion" />
            </div>
          </div>
        </div>
      </section>

      <Footer activePage="process" />
    </>
  );
}
