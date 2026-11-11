import { NextRequest, NextResponse } from "next/server";
import { COMPANY_SIZES, getSolution } from "@/content/solutions";
import { getAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BODY_BYTES = 20_000;
const NO_STORE = { "Cache-Control": "no-store" };

// Light in-memory throttle (per server instance) to blunt scripted abuse.
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 6;
}

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status, headers: NO_STORE });
}

export async function POST(request: NextRequest) {
  try {
    // Browsers send Origin on cross-site posts; refuse ones that are not this site.
    const origin = request.headers.get("origin");
    if (origin) {
      try {
        if (new URL(origin).host !== request.headers.get("host")) return bad("Not allowed.", 403);
      } catch {
        return bad("Not allowed.", 403);
      }
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (limited(ip)) return bad("Too many attempts. Please try again in a few minutes.", 429);

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return bad("That message is too long.", 413);
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return bad("Invalid request.");
    }

    // Honeypot: real people never fill this in.
    if (body.website) return bad("Please try again.");

    const solution = getSolution(str(body.solution, 80));
    if (!solution) return bad("Unknown solution.");

    const name = str(body.name, 100);
    const email = str(body.email, 254).toLowerCase();
    const company = str(body.company, 200);
    const companySize = str(body.companySize, 20);
    const message = str(body.message, 2000);

    if (!name) return bad("Please enter your name.");
    if (!EMAIL_RE.test(email)) return bad("Please enter a valid email address.");
    if (companySize && !(COMPANY_SIZES as readonly string[]).includes(companySize)) {
      return bad("Please choose a valid company size.");
    }

    // Every qualifier must be answered with one of the allowed options.
    const answers = (typeof body.qualifiers === "object" && body.qualifiers !== null
      ? body.qualifiers
      : {}) as Record<string, unknown>;
    const qualifiers: Record<string, string> = {};
    const qualifierLines: string[] = [];
    for (const q of solution.qualifiers) {
      const value = str(answers[q.id], 80);
      if (!value || !q.options.includes(value)) return bad("Please answer all of the questions.");
      qualifiers[q.id] = value;
      qualifierLines.push(`${q.label} ${value}`);
    }

    const attr = (typeof body.attribution === "object" && body.attribution !== null
      ? body.attribution
      : {}) as Record<string, unknown>;

    const [firstName, ...rest] = name.split(/\s+/);
    const composedMessage = [
      message || "(No message provided.)",
      "",
      `Solution: ${solution.name}`,
      ...qualifierLines,
    ].join("\n");

    const supabase = getAdminClient();
    if (!supabase) {
      console.error("Solution inquiry: Supabase admin client is not configured.");
      return bad("We could not take your message right now. Please email us instead.", 503);
    }

    const { error } = await supabase.from("contact_submissions").insert([
      {
        first_name: firstName.slice(0, 100),
        last_name: rest.join(" ").slice(0, 100),
        email,
        company: company || null,
        company_size: companySize || null,
        inquiry_type: "workflow-automation",
        message: composedMessage,
        solution_slug: solution.slug,
        qualifiers,
        utm_source: str(attr.utm_source, 120) || null,
        utm_medium: str(attr.utm_medium, 120) || null,
        utm_campaign: str(attr.utm_campaign, 120) || null,
        utm_content: str(attr.utm_content, 120) || null,
        referrer: str(attr.referrer, 120) || null,
        landing_path: str(attr.landing_path, 120) || null,
      },
    ]);

    if (error) {
      // Log the database error code and message only, never the submitted details.
      console.error("Solution inquiry insert failed:", error.code, error.message);
      return bad("Something went wrong. Please try again.", 500);
    }

    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (err) {
    console.error("Solution inquiry error", err instanceof Error ? err.message : "unknown");
    return bad("Something went wrong. Please try again.", 500);
  }
}
