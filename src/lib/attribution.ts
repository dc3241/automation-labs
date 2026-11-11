/**
 * First-touch attribution for the session: where a visitor came from before
 * they reached an inquiry form. Stored in sessionStorage only (cleared when the
 * tab closes), limited to UTM tags, the referring site and the landing path.
 * Browser-only: call from client components and effects.
 */

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  referrer?: string;
  landing_path?: string;
};

const KEY = "al_attribution_v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
const MAX = 120;

function clean(value: string | null | undefined): string | undefined {
  const v = (value ?? "").trim().slice(0, MAX);
  return v || undefined;
}

/** Record attribution once per session. Later visits in the session do not overwrite it. */
export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {};
    for (const k of UTM_KEYS) data[k] = clean(params.get(k));

    // Only keep the referring host, not the full URL (which can contain private query strings).
    if (document.referrer) {
      try {
        const ref = new URL(document.referrer);
        if (ref.host && ref.host !== window.location.host) data.referrer = clean(ref.host);
      } catch {
        /* ignore malformed referrers */
      }
    }
    data.landing_path = clean(window.location.pathname);

    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage can be unavailable (private mode, blocked); attribution is best-effort */
  }
}

/** Stored attribution, with any UTM tags on the current URL taking priority. */
export function readAttribution(): Attribution {
  let stored: Attribution = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    stored = {};
  }
  const params = new URLSearchParams(window.location.search);
  const out: Attribution = { ...stored };
  for (const k of UTM_KEYS) {
    const fromUrl = clean(params.get(k));
    if (fromUrl) out[k] = fromUrl;
  }
  return out;
}
