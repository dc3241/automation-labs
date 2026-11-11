"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Renders nothing. Records where the visitor came from, once per session. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
