"use client";

import { useState } from "react";
import { readAttribution } from "@/lib/attribution";

type Props = {
  slug: string;
  solutionName: string;
  qualifiers: { id: string; label: string; options: string[] }[];
  companySizes: readonly string[];
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500";

export default function SolutionInquiryForm({ slug, solutionName, qualifiers, companySizes }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [serverError, setServerError] = useState("");

  const set = (key: string, value: string) => setValues((v) => ({ ...v, [key]: value }));

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!values.name?.trim()) e.name = "Please enter your name.";
    if (!EMAIL_RE.test((values.email ?? "").trim())) e.email = "Please enter a valid email address.";
    for (const q of qualifiers) if (!values[q.id]) e[q.id] = "Please choose one.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerError("");
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/solutions/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          solution: slug,
          name: values.name,
          email: values.email,
          company: values.company ?? "",
          companySize: values.companySize ?? "",
          message: values.message ?? "",
          qualifiers: Object.fromEntries(qualifiers.map((q) => [q.id, values[q.id] ?? ""])),
          website: honeypot,
          attribution: readAttribution(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setServerError("Could not reach the server. Please check your connection and try again.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-lg border border-green-200 bg-green-50 p-6">
        <p className="font-semibold text-green-900">Thanks, we got it.</p>
        <p className="mt-1 text-green-800">We&apos;ll be in touch within 24 hours.</p>
      </div>
    );
  }

  const err = (key: string) =>
    errors[key] ? (
      <p id={`${slug}-${key}-error`} className="mt-1 text-sm text-red-600">
        {errors[key]}
      </p>
    ) : null;
  const invalid = (key: string) => (errors[key] ? true : undefined);
  const describedBy = (key: string) => (errors[key] ? `${slug}-${key}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label={`Ask about ${solutionName}`}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${slug}-name`} className="mb-2 block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            id={`${slug}-name`}
            type="text"
            autoComplete="name"
            maxLength={100}
            value={values.name ?? ""}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={invalid("name")}
            aria-describedby={describedBy("name")}
            className={inputClass}
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${slug}-email`} className="mb-2 block text-sm font-medium text-gray-700">
            Work email *
          </label>
          <input
            id={`${slug}-email`}
            type="email"
            autoComplete="email"
            maxLength={254}
            value={values.email ?? ""}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={invalid("email")}
            aria-describedby={describedBy("email")}
            className={inputClass}
          />
          {err("email")}
        </div>
        <div>
          <label htmlFor={`${slug}-company`} className="mb-2 block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            id={`${slug}-company`}
            type="text"
            autoComplete="organization"
            maxLength={200}
            value={values.company ?? ""}
            onChange={(e) => set("company", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${slug}-size`} className="mb-2 block text-sm font-medium text-gray-700">
            Company size
          </label>
          <select
            id={`${slug}-size`}
            value={values.companySize ?? ""}
            onChange={(e) => set("companySize", e.target.value)}
            className={inputClass}
          >
            <option value="">Choose one</option>
            {companySizes.map((s) => (
              <option key={s} value={s}>
                {s} employees
              </option>
            ))}
          </select>
        </div>
      </div>

      {qualifiers.map((q) => (
        <div key={q.id}>
          <label htmlFor={`${slug}-${q.id}`} className="mb-2 block text-sm font-medium text-gray-700">
            {q.label} *
          </label>
          <select
            id={`${slug}-${q.id}`}
            value={values[q.id] ?? ""}
            onChange={(e) => set(q.id, e.target.value)}
            aria-invalid={invalid(q.id)}
            aria-describedby={describedBy(q.id)}
            className={inputClass}
          >
            <option value="">Choose one</option>
            {q.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {err(q.id)}
        </div>
      ))}

      <div>
        <label htmlFor={`${slug}-message`} className="mb-2 block text-sm font-medium text-gray-700">
          Anything we should know? <span className="font-normal text-gray-500">(optional)</span>
        </label>
        <textarea
          id={`${slug}-message`}
          rows={4}
          maxLength={2000}
          value={values.message ?? ""}
          onChange={(e) => set("message", e.target.value)}
          placeholder="How it works today, what is slow, what you have tried."
          className={inputClass}
        />
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor={`${slug}-website`}>Website</label>
        <input
          id={`${slug}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {serverError && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Ask about this"}
      </button>
      <p className="text-sm text-gray-500">
        We use your details only to reply to this inquiry.
      </p>
    </form>
  );
}
