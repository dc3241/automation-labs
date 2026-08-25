import type { Metadata } from "next";
import { Suspense } from "react";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Work With Us | Automation Labs",
  description:
    "Tell us about the automation you need. We help SMBs build custom internal tools and integrate the workflows that off-the-shelf tools don't solve.",
};

export default function Contact() {
  return (
    <Suspense
      fallback={
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Loading…</p>
        </div>
      }
    >
      <ContactPage />
    </Suspense>
  );
}
