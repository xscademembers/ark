import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us - Arka Developers",
  description:
    "Learn about Arka Developers — a design-driven real estate firm building possibilities with innovation, uncompromising quality, and purposeful design in Visakhapatnam.",
  path: "/about",
  keywords: ["about Arka Developers", "our story", "real estate firm"],
});

export default function AboutPage() {
  return <AboutClient />;
}
