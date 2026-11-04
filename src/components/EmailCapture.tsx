"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  /** Pack keyword or page name. Sent to Beehiiv as utm_campaign + tag. */
  source: string;
  buttonLabel?: string;
  /** "light" for white sections, "dark" for black sections. */
  tone?: "light" | "dark";
  /** Re-render the server page after signup (used to unlock packs). */
  refreshOnSuccess?: boolean;
  note?: string;
};

export function EmailCapture({
  source,
  buttonLabel = "Subscribe",
  tone = "light",
  refreshOnSuccess = false,
  note = "Free. One email a week. Unsubscribe anytime.",
}: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage(data.message || "You're in. Check your inbox to confirm.");
      setEmail("");
      if (refreshOnSuccess) router.refresh();
    } catch {
      setStatus("error");
      setMessage("Connection error. Please try again.");
    }
  }

  const dark = tone === "dark";

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className={`field-focus flex-1 min-w-0 rounded-lg px-4 py-3 text-base border ${
            dark
              ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`btn-press rounded-lg px-6 py-3 font-semibold whitespace-nowrap disabled:opacity-60 ${
            dark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {status === "loading" ? "Joining..." : buttonLabel}
        </button>
      </form>
      <p
        role="status"
        className={`mt-3 text-sm ${
          status === "error"
            ? dark ? "text-red-300" : "text-red-600"
            : status === "success"
            ? dark ? "text-white" : "text-gray-900 font-medium"
            : dark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {message || note}
      </p>
    </div>
  );
}
