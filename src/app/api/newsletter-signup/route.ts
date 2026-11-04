import { NextRequest, NextResponse } from "next/server";
import { SUBSCRIBER_COOKIE, normalizeSource } from "@/lib/newsletter";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BEEHIIV_API = "https://api.beehiiv.com/v2";

function withSubscriberCookie(res: NextResponse) {
  res.cookies.set(SUBSCRIBER_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

/** Best effort: tagging must never block or fail a signup. */
async function addTags(
  apiKey: string,
  publicationId: string,
  subscriptionId: string,
  tags: string[]
) {
  try {
    await fetch(
      `${BEEHIIV_API}/publications/${publicationId}/subscriptions/${subscriptionId}/tags`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags }),
      }
    );
  } catch (error) {
    console.error("Beehiiv tagging failed", error);
  }
}

export async function POST(request: NextRequest) {
  let body: { email?: unknown; source?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  const source = normalizeSource(body.source);

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) {
    console.error("Newsletter signup: Beehiiv env vars are not set");
    return NextResponse.json(
      { error: "Signup is temporarily unavailable. Please try again later." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${BEEHIIV_API}/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: "website",
          utm_medium: "organic",
          // The pack keyword or page name, so Beehiiv shows which video or page converts.
          utm_campaign: source,
        }),
      }
    );

    // Already on the list: treat as success so the pack still unlocks.
    if (response.status === 409) {
      return withSubscriberCookie(
        NextResponse.json({ success: true, message: "You're already on the list." })
      );
    }

    if (!response.ok) {
      console.error("Beehiiv signup failed", response.status, await response.text());
      const error =
        response.status === 429
          ? "Too many requests. Please try again in a minute."
          : "Something went wrong. Please try again.";
      return NextResponse.json({ error }, { status: response.status === 429 ? 429 : 500 });
    }

    const data = (await response.json().catch(() => null)) as
      | { data?: { id?: string } }
      | null;
    const subscriptionId = data?.data?.id;
    if (subscriptionId) {
      await addTags(apiKey, publicationId, subscriptionId, [
        "lab-notes",
        `source-${source}`,
      ]);
    }

    return withSubscriberCookie(
      NextResponse.json({
        success: true,
        message: "You're in. Lab Notes lands in your inbox once a week.",
      })
    );
  } catch (error) {
    console.error("Newsletter signup error", error);
    return NextResponse.json(
      { error: "Connection error. Please try again." },
      { status: 500 }
    );
  }
}
