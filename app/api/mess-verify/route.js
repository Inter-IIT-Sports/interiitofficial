import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import fs from "fs";
import path from "path";

// Meal Calculation
function getCurrentMeal() {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const hm = hour + minutes / 60;

  if (hm >= 6 && hm < 9.5) return "breakfast";
  if (hm >= 11 && hm < 15) return "lunch";
  if (hm >= 19 && hm < 22) return "dinner";
  return null;
}

export async function POST(req) {
  try {
    const body = await req.json();
    let qrRaw = body.qrRaw;

    if (!qrRaw) {
      return NextResponse.json(
        { ok: false, message: "No QR data found" },
        { status: 400 }
      );
    }

    // Parse QR Data
    let parsed;
    try {
      parsed = JSON.parse(qrRaw); // { roll, name }
    } catch (err) {
      parsed = { roll: qrRaw.trim(), name: "" };
    }

    const roll = parsed.roll?.trim();
    const qrName = parsed.name?.trim();

    if (!roll) {
      return NextResponse.json(
        { ok: false, message: "Invalid QR code" },
        { status: 400 }
      );
    }

    // Load student list
    const filePath = path.join(process.cwd(), "public", "students.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { ok: false, message: "Students list missing" },
        { status: 500 }
      );
    }

    const students = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const student = students.find(
      (s) => s.roll.toLowerCase() === roll.toLowerCase()
    );

    if (!student) {
      return NextResponse.json({
        ok: false,
        message: "❌ Not a registered participant",
      });
    }

    // If QR contains name -> Check mismatch
    if (qrName && student.name.toLowerCase() !== qrName.toLowerCase()) {
      return NextResponse.json({
        ok: false,
        message: `❌ QR name mismatch (Expected ${student.name}, got ${qrName})`,
      });
    }

    // Determine meal & date
    const meal = getCurrentMeal();
    if (!meal) {
      return NextResponse.json({
        ok: false,
        message: "❌ Out of meal time",
      });
    }

    const date = new Date().toISOString().split("T")[0];

    // Firestore document path
    const documentId = `${date}#${meal}#${roll}`;

    const entryRef = doc(db, "mess-entries", documentId);
    const entrySnap = await getDoc(entryRef);

    // Already eaten?
    if (entrySnap.exists()) {
      const data = entrySnap.data();
      return NextResponse.json({
        ok: false,
        message: `⚠️ Already eaten at ${data.time}`,
        data,
      });
    }

    // Log New Entry
    const nowTime = new Date().toLocaleTimeString();

    await setDoc(entryRef, {
      roll,
      name: student.name,
      meal,
      date,
      time: nowTime,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      message: `✅ Entry Allowed — ${student.name} (${roll})`,
      data: {
        roll,
        name: student.name,
        meal,
        time: nowTime,
      },
    });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return NextResponse.json(
      { ok: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
