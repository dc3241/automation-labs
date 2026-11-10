import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PDF_NAME = '100-Ways-to-Make-Money-with-AI.pdf';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Light in-memory throttle (per server instance) to blunt scripted abuse.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (limited(ip)) {
      return NextResponse.json({ error: 'Too many attempts. Please try again in a few minutes.' }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const email = String(body.email ?? '').trim().toLowerCase();
    const source = String(body.source ?? 'landing').slice(0, 40);

    // Honeypot: real people never fill this in. Reject quietly.
    if (body.website) {
      return NextResponse.json({ error: 'Please try again.' }, { status: 400 });
    }
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    // Load the PDF first so a missing file never costs the visitor their signup.
    const pdf = await readFile(path.join(process.cwd(), 'private-assets', '100-ways-to-make-money-with-ai.pdf'));

    // Add to Beehiiv. Never blocks the download if Beehiiv is down.
    const apiKey = process.env.BEEHIIV_API_KEY;
    const pubId = process.env.BEEHIIV_PUBLICATION_ID;
    if (apiKey && pubId) {
      try {
        const res = await fetch(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            reactivate_existing: false,
            send_welcome_email: true,
            utm_source: 'website',
            utm_medium: 'lead-magnet',
            utm_campaign: '100-ways-to-make-money-with-ai',
            referring_site: 'https://automationlabsai.com/100-ways-to-make-money-with-ai',
            tags: ['lead-magnet-100-ways', `source-${source}`],
          }),
        });
        if (!res.ok) console.warn('Beehiiv subscribe failed', res.status);
      } catch (err) {
        console.error('Beehiiv error', err);
      }
    } else {
      console.warn('Beehiiv credentials not configured; lead not stored');
    }

    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${PDF_NAME}"`,
        'Content-Length': String(pdf.length),
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex',
      },
    });
  } catch (err) {
    console.error('100-ways error', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
