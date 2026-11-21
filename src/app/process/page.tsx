import type { Metadata } from "next";
import ProcessClient from "./ProcessClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Process - Arka Developers",
  description:
    "Discover Arka Developers’ structured 5-step process — from goals and vision through proposal, planning, kickoff, and project completion — with quality and safety at every stage.",
  path: "/process",
  keywords: [
    "construction process",
    "project delivery",
    "construction management process",
  ],
});

export default function ProcessPage() {
  return <ProcessClient />;
}
