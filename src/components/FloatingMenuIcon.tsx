"use client";

import { useEffect, useState } from "react";

export default function FloatingMenuIcon() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`floating-menu-icon${visible ? " show" : ""}`}
      onClick={() => window.dispatchEvent(new Event("arka:open-menu"))}
      role="button"
      tabIndex={0}
      aria-label="Open menu"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          window.dispatchEvent(new Event("arka:open-menu"));
        }
      }}
    >
      <span></span>
    </div>
  );
}
