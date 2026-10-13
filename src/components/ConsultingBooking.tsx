"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

type ConsultingBookingProps = {
  calLink: string;
};

export default function ConsultingBooking({ calLink }: ConsultingBookingProps) {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cal = await getCalApi({ namespace: "consulting" });
      if (cancelled) return;
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "light",
        styles: { branding: { brandColor: "#111827" } },
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="h-[720px] w-full">
      <Cal
        namespace="consulting"
        calLink={calLink}
        config={{ layout: "month_view", theme: "light" }}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
      />
    </div>
  );
}
