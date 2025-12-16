"use client";

import { useEffect, useState } from "react";

const MEALS = ["breakfast", "lunch", "dinner"];

export default function MessReportPage() {
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [meal, setMeal] = useState("breakfast");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReport();
  }, [date, meal]);

  async function loadReport() {
    setLoading(true);
    const res = await fetch(
      `/api/mess-report?date=${date}&meal=${meal}`
    );
    const json = await res.json();

    // 🔒 Secret available only in console
    console.log("SECRET AUDIT:", json.__secret);

    setData(json.result);
    setLoading(false);
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">
        Mess Caterer Report
      </h1>

      <p className="text-sm text-gray-600 mb-6">
        Caterer-1: <b>Student / Core / Head</b> &nbsp;|&nbsp;
        Caterer-2: <b>All Others</b>
      </p>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        {MEALS.map((m) => (
          <button
            key={m}
            onClick={() => setMeal(m)}
            className={`px-4 py-2 rounded border ${
              meal === m ? "bg-black text-white" : ""
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      {data && <ReportTable data={data} />}
    </div>
  );
}

function ReportTable({ data }) {
  // ✅ Calculate totals from displayed rows
  let totalCaterer1 = 0;
  let totalCaterer2 = 0;

  Object.values(data).forEach((r) => {
    totalCaterer1 += r.caterer1;
    totalCaterer2 += r.caterer2;
  });

  return (
    <table className="w-full border-collapse border text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">IIT</th>
          <th className="border p-2 text-green-700">
            Caterer-1
            <br />
            <span className="text-xs">(Student / Core / Head)</span>
          </th>
          <th className="border p-2 text-blue-700">
            Caterer-2
            <br />
            <span className="text-xs">(Others)</span>
          </th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(data).map(([iit, r]) => (
          <tr key={iit}>
            <td className="border p-2 font-medium">{iit}</td>
            <td className="border p-2 text-green-700">{r.caterer1}</td>
            <td className="border p-2 text-blue-700">{r.caterer2}</td>
          </tr>
        ))}

        {/* ✅ TOTAL ROW */}
        <tr className="bg-gray-50 font-bold">
          <td className="border p-2">TOTAL</td>
          <td className="border p-2 text-green-700">
            {totalCaterer1}
          </td>
          <td className="border p-2 text-blue-700">
            {totalCaterer2}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

