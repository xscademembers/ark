import type { Metadata } from "next";
import SolutionsClient from "./SolutionsClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Solutions - Arka Developers",
  description:
    "Complete construction solutions from Arka Developers — emergency services, commercial and residential builds, renovations, and in-house expertise across project management, carpentry, audiovisual, and hardware.",
  path: "/solutions",
  keywords: [
    "construction solutions",
    "emergency construction service",
    "commercial construction Visakhapatnam",
  ],
});

export default function SolutionsPage() {
  return <SolutionsClient />;
}
