import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
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
  return p.includes("student") || p.includes("core") || p === "head";
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

  const secretTotals = {
    caterer1: 0,
    caterer2: 0,
    totalFromDB: 0,
  };

  const tasks = IITS.map(async (iit) => {
    const entriesRef = collection(
      db,
      "mess-entries",
      date,
      meal,
      iit,
      "entries"
    );

    const snap = await getDocs(entriesRef);

    let caterer1 = 0;
    let caterer2 = 0;

    snap.forEach((doc) => {
      const d = doc.data();
      if (isCatererOne(d.position)) caterer1++;
      else caterer2++;
    });

    secretTotals.caterer1 += caterer1;
    secretTotals.caterer2 += caterer2;
    secretTotals.totalFromDB += snap.size;

    return [iit, { caterer1, caterer2 }];
  });

  const resolved = await Promise.all(tasks);
  const result = Object.fromEntries(resolved);

  return NextResponse.json({
    result,
    __secret: secretTotals,
  });
}
