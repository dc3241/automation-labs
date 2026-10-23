import { NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "@/lib/admin-auth";
import { getAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };
const STATUSES = ["new", "replied", "closed"] as const;

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_STORE });
  }

  const supabase = getAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Admin is not configured." },
      { status: 503, headers: NO_STORE }
    );
  }

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contact submissions:", error.message);
    return NextResponse.json(
      { error: "Failed to load contact submissions" },
      { status: 500, headers: NO_STORE }
    );
  }

  return NextResponse.json({ submissions: data ?? [] }, { headers: NO_STORE });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_STORE });
  }

  const supabase = getAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Admin is not configured." },
      { status: 503, headers: NO_STORE }
    );
  }

  let id: unknown;
  let status: unknown;
  try {
    ({ id, status } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: NO_STORE });
  }

  if (
    typeof id !== "number" ||
    !Number.isInteger(id) ||
    typeof status !== "string" ||
    !(STATUSES as readonly string[]).includes(status)
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: NO_STORE });
  }

  const { error } = await supabase
    .from("contact_submissions")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating contact submission status:", error.message);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500, headers: NO_STORE }
    );
  }

  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}
