import type { Metadata } from "next";
import { Suspense } from "react";
import ProjectsClient from "./ProjectsClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects - Arka Developers",
  description:
    "Explore Arka Developers projects including Beverly Hills and Winds Willow Reserve — premium residential developments in Visakhapatnam.",
  path: "/projects",
  keywords: [
    "Beverly Hills Visakhapatnam",
    "Winds Willow Reserve",
    "luxury residential projects",
  ],
});

export default function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <ProjectsClient />
    </Suspense>
  );
}
