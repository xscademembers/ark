import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { pageMetadata, SITE_TAGLINE } from "@/lib/seo";
import "@/styles/styles.css";
import "@/styles/home.css";
import "@/styles/slides-common.css";
import "@/styles/slide-video.css";
import "@/styles/slide-detail.css";
import "@/styles/footer.css";

export const metadata: Metadata = pageMetadata({
  title: "Arka Elements",
  description: SITE_TAGLINE,
  path: "/",
  keywords: [
    "design-driven real estate",
    "architectural excellence",
    "Visakhapatnam developers",
  ],
});

export default function Page() {
  return <HomePage />;
}
