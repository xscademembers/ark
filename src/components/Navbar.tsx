"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "HOME", key: "home" },
  { href: "/solutions", label: "SOLUTIONS", key: "solutions" },
  { href: "/process", label: "PROCESS", key: "process" },
  { href: "/projects", label: "PROJECTS", key: "projects" },
  { href: "/about", label: "ABOUT US", key: "about" },
] as const;

type NavbarProps = {
  variant?: "default" | "light";
  activePage?: string;
};

export default function Navbar({
  variant = "default",
  activePage = "home",
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  }, []);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const handler = () => openMenu();
    window.addEventListener("arka:open-menu", handler);
    return () => window.removeEventListener("arka:open-menu", handler);
  }, [openMenu]);

  const headerClass = [
    "header",
    variant === "light" ? "header-light" : "",
    scrolled ? "scrolled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const isActive = (key: string) => activePage === key;

  return (
    <>
      <header className={headerClass}>
        <div className="nav-container">
          <div className="logo">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="Arka Developers Logo"
                className="logo-image"
              />
            </Link>
          </div>

          <nav className="nav">
            <button
              className="menu-toggle"
              aria-label="Toggle menu"
              type="button"
              onClick={openMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul className="nav-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={isActive(item.key) ? "active" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-contact">
            <Link
              href="/contact"
              className={isActive("contact") ? "active" : undefined}
            >
              CONTACT
            </Link>
          </div>

          <button
            className="slides-menu-icon"
            aria-label="Open menu"
            type="button"
            onClick={openMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div
        className={`menu-overlay${menuOpen ? " active" : ""}`}
        style={
          menuOpen
            ? { opacity: 1, visibility: "visible" }
            : undefined
        }
      >
        <div className="menu-bg-logo"></div>

        <button
          className="menu-close"
          aria-label="Close menu"
          type="button"
          onClick={closeMenu}
        >
          <span></span>
          <span></span>
        </button>

        <nav className="menu-overlay-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`menu-overlay-link${isActive(item.key) ? " active" : ""}`}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}

          <div className="menu-overlay-contact">
            <Link
              href="/contact"
              className={isActive("contact") ? "active" : undefined}
              onClick={closeMenu}
            >
              CONTACT
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
