import { NextResponse } from "next/server";

export async function POST(req) {
  const { password } = await req.json();

//   process.env.SCAN_PAGE_PASSWORD

  if (password ==="interiit2025secure") {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
