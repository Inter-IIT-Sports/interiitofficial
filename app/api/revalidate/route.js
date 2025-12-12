import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  
  //Check secret validity
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    // Trigger Revalidation
    revalidatePath("/main-meet");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}