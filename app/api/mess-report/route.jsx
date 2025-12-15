import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

const IITS = [
  "MADRAS","BOMBAY","DELHI","KANPUR","KHARAGPUR","ROORKEE",
  "GUWAHATI","HYDERABAD","INDORE","BHILAI","DHANBAD","PALAKKAD",
  "TIRUPATI","JAMMU","DHARWAD","BHU","GOA","MANDI","PATNA",
  "ROPAR","JODHPUR","GANDHI-NAGAR","BHUBANESHWAR"
];

function normalizePosition(position = "") {
  return position.toString().trim().toLowerCase();
}

function isCatererOne(position) {
  const p = normalizePosition(position);

  if (p.includes("student")) return true;
  if (p.includes("core")) return true;
  if (p === "head") return true;

  return false;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const meal = searchParams.get("meal");

  if (!date || !meal) {
    return NextResponse.json(
      { error: "date and meal required" },
      { status: 400 }
    );
  }

  const result = {};

  // 🔒 SECRET totals (not meant for UI)
  const secretTotals = {
    caterer1: 0,
    caterer2: 0,
    totalFromDB: 0,
  };

  for (const iit of IITS) {
    const entriesRef = collection(
      db,
      "mess-entries",
      date,
      meal,
      iit,
      "entries"
    );

    // ✅ REAL DB COUNT (truth)
    const countSnap = await getCountFromServer(entriesRef);
    const totalFromDB = countSnap.data().count;

    // Fetch docs for classification
    const snap = await getDocs(entriesRef);

    let caterer1 = 0;
    let caterer2 = 0;

    snap.forEach((doc) => {
      const d = doc.data();
      if (isCatererOne(d.position)) {
        caterer1++;
      } else {
        caterer2++;
      }
    });

    result[iit] = {
      caterer1,
      caterer2,
      // ❌ totalFromDB NOT sent to UI
    };

    // 🔒 accumulate secret totals
    secretTotals.caterer1 += caterer1;
    secretTotals.caterer2 += caterer2;
    secretTotals.totalFromDB += totalFromDB;
  }

  // 🔒 returned but UI will not render it
  return NextResponse.json({
    result,
    __secret: secretTotals,
  });
}
