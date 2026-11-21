import type { Metadata } from "next";
import { Suspense } from "react";
import ContactClient from "./ContactClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us - Arka Developers",
  description:
    "Contact Arka Developers in Rushikonda, Visakhapatnam. Call 9581616789 or email thearkadevelopers@gmail.com for projects, partnerships, or careers.",
  path: "/contact",
  keywords: [
    "contact Arka Developers",
    "Rushikonda office",
    "Visakhapatnam real estate contact",
  ],
});

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactClient />
    </Suspense>
  );
}
