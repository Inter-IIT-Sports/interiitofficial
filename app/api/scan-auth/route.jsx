export const runtime = "nodejs";

import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { password } = await req.json();

    const storedHash = process.env.SCAN_PAGE_PASSWORD_HASH
    const salt = process.env.SCAN_PAGE_SALT;

    if (!storedHash || !salt) {
      return NextResponse.json(
        { ok: false, message: "Server config missing" },
        { status: 500 }
      );
    }

    // Calculate SHA-256 hash(password + salt)
    const hash = crypto
      .createHash("sha256")
      .update(password + salt)
      .digest("hex");

    if (hash === storedHash) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
