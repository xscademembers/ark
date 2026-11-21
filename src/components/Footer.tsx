"use client";

import Link from "next/link";

type FooterProps = {
  activePage?: string;
};

export default function Footer({ activePage = "home" }: FooterProps) {
  const linkClass = (key: string) => (activePage === key ? "active" : undefined);

  return (
    <footer className="mc-footer">
      <div className="mc-container">
        <div className="mc-footer-top">
          <div className="mc-brand">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="Arka Developers Logo"
                className="logo-image"
              />
            </Link>
            <h2>
              Arka
              <br />
              Developers
            </h2>
          </div>

          <nav className="mc-nav">
            <Link href="/" data-page="index" className={linkClass("home")}>
              HOME
            </Link>
            <Link
              href="/solutions"
              data-page="solutions"
              className={linkClass("solutions")}
            >
              SOLUTIONS
            </Link>
            <Link
              href="/process"
              data-page="process"
              className={linkClass("process")}
            >
              PROCESS
            </Link>
            <Link
              href="/projects"
              data-page="projects"
              className={linkClass("projects")}
            >
              PROJECTS
            </Link>
            <Link href="/about" data-page="about" className={linkClass("about")}>
              ABOUT US
            </Link>
            <Link
              href="/contact"
              data-page="contact"
              className={linkClass("contact")}
            >
              CONTACT
            </Link>
          </nav>
        </div>

        <div className="mc-footer-middle">
          <div className="mc-footer-col">
            <p className="mc-footer-title">Arka Developers</p>
            <p>27-B-484, Rushikonda</p>
            <p>Visakhapatnam, 530045</p>
            <div>
              <p className="info-text">
                <strong>Phone:</strong> 9581616789
              </p>
              <p className="info-text">
                <strong>Email:</strong> thearkadevelopers@gmail.com{" "}
              </p>
            </div>
          </div>

          <div className="mc-footer-col">
            <Link href="/about">Story</Link>
            <Link href="/process">Services</Link>
          </div>

          <div className="mc-footer-col">
            <Link href="/projects?project=Beverly-Hills">Beverly Hills</Link>
            <Link href="/projects?project=Winds-Willow-Reserve">
              Winds Willow Reserve
            </Link>
          </div>

          <div className="mc-footer-col mc-footer-col-small">
            <a href="#">Careers</a>
          </div>
        </div>

        <div className="mc-footer-bottom">
          <div className="mc-footer-bottom-left">
            <p>2025 Arka Developers. All Rights Reserved.</p>
            <a href="#" className="mc-footer-bottom-link">
              Terms & conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
