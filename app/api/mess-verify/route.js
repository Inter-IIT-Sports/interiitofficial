import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";

// Determine current meal
function getCurrentMeal() {
  const now = new Date();
  const hr = now.getHours();
  const min = now.getMinutes();
  const hm = hr + min / 60;

  if (hm >= 6 && hm < 9.5) return "breakfast";
  if (hm >= 11 && hm < 15) return "lunch";
  if (hm >= 19 && hm < 22) return "dinner";
  return null;
}

export async function POST(req) {
  try {
    const { qrRaw } = await req.json();

    if (!qrRaw || typeof qrRaw !== "string") {
      return NextResponse.json({ ok: false, message: "Invalid QR" });
    }

    const text = qrRaw.trim();

    // Validate QR format
    if (!text.startsWith("http")) {
      return NextResponse.json({ ok: false, message: "Invalid QR format" });
    }

    if (!text.includes("/id/mens/") && !text.includes("/id/womens/")) {
      return NextResponse.json({ ok: false, message: "Invalid QR pattern" });
    }

    // Extract group and uniqueId
    const parts = text.split("/").filter(Boolean);
    const group = parts[parts.length - 2];     // "mens" or "womens"
    const uniqueId = parts[parts.length - 1];  // IITB-STU-0001

    if (!["mens", "womens"].includes(group)) {
      return NextResponse.json({ ok: false, message: "Invalid group" });
    }

    // File paths
    const menPath = path.join(process.cwd(), "public", "mens.json");
    const womenPath = path.join(process.cwd(), "public", "womens.json");

    if (!fs.existsSync(menPath) || !fs.existsSync(womenPath)) {
      return NextResponse.json(
        { ok: false, message: "Participants list missing" },
        { status: 500 }
      );
    }

    const men = JSON.parse(fs.readFileSync(menPath, "utf8"));
    const women = JSON.parse(fs.readFileSync(womenPath, "utf8"));

    // Load correct list
    const list = group === "mens" ? men : women;

    // Find student
    const student = list.find(
      (s) => String(s.uniqueId).toLowerCase() === uniqueId.toLowerCase()
    );

    if (!student) {
      return NextResponse.json({ ok: false, message: "Not registered" });
    }

    // Determine IIT
    const iit = student.IIT.replace(/\s+/g, "-").toUpperCase();

    // Determine meal
    const meal = getCurrentMeal();
    if (!meal) {
      return NextResponse.json({ ok: false, message: "Out of meal time" });
    }

    // Today
    const date = new Date().toISOString().split("T")[0];

    // Gender prefix based on file
    const genderPrefix = group === "mens" ? "M" : "F";
    const finalId = `${genderPrefix}-${uniqueId}`;

    // VALID FIRESTORE STRUCTURE:
    // mess-entries / <date> / <meal> / <IIT> / entries / <gender-id>
    const entryRef = doc(
      db,
      "mess-entries",
      date,       // document
      meal,       // collection
      iit,        // document
      "entries",  // collection
      finalId     // document
    );

    const entrySnap = await getDoc(entryRef);


    // Already eaten?
    if (entrySnap.exists()) {
      return NextResponse.json({
        ok: false,
        message: `Already eaten at ${entrySnap.data().time}`,
      });
    }

    // Store entry
    const nowTime = new Date().toLocaleTimeString();

    await setDoc(entryRef, {
      uniqueId,
      genderId: finalId,
      name: student.Name,
      IIT: student.IIT,
      gender: group === "mens" ? "M" : "F",
      position: student.Position,
      group,
      meal,
      date,
      time: nowTime,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      message: `Entry Allowed — ${student.Name} (${student.IIT})`,
    });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return NextResponse.json(
      { ok: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
