import { createHash, createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

/**
 * Minimal password gate for the private admin pages.
 *
 * - ADMIN_PASSWORD (server-only env var) is the shared password.
 * - A successful login sets an httpOnly, signed, expiring cookie.
 * - If ADMIN_PASSWORD is missing, every check fails closed.
 */

export const ADMIN_COOKIE = "al_admin";
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

function sessionKey(): Buffer | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256")
    .update(`automation-labs-admin-session:${password}`)
    .digest();
}

function sign(expires: string, key: Buffer): string {
  return createHmac("sha256", key).update(expires).digest("hex");
}

export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export function createSessionToken(): string | null {
  const key = sessionKey();
  if (!key) return null;
  const expires = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  return `${expires}.${sign(expires, key)}`;
}

export function isAuthorized(req: NextRequest): boolean {
  const key = sessionKey();
  if (!key) return false;

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (!/^\d+$/.test(expires) || Number(expires) < Date.now()) return false;

  const expected = sign(expires, key);
  if (signature.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
