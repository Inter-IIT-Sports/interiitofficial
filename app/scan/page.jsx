"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";

const QrScanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((m) => m.Scanner),
  { ssr: false }
);

export default function ScanPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // success | error | loading
  const cooldown = useRef(false);

  async function handlePassword() {
    const res = await fetch("/api/scan-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pass }),
    });

    const data = await res.json();
    if (data.ok) {
      setAuthenticated(true);
    } else {
      alert("Incorrect Password");
    }
  }

  async function handleDecode(value) {
    if (!value || cooldown.current) return;

    cooldown.current = true;
    setTimeout(() => (cooldown.current = false), 1500);

    setStatus("Checking...");
    setStatusType("loading");

    const res = await fetch("/api/mess-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qrRaw: value }),
    });

    const j = await res.json();

    if (j.ok) {
      setStatus(j.message);
      setStatusType("success");
    } else {
      setStatus(j.message);
      setStatusType("error");
    }
  }

  // -------------------------
  // LOGIN UI
  // -------------------------
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Mess Scanner Login
          </h1>

          <input
            type="password"
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg mt-4"
            onClick={handlePassword}
          >
            Login
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Authorized personnel only
          </p>
        </div>
      </div>
    );
  }

  // -------------------------
  // SCANNER UI
  // -------------------------
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
        Mess Entry Scanner
      </h1>

      <div className="bg-white shadow-xl rounded-2xl p-5 max-w-lg mx-auto border border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-full rounded-xl overflow-hidden border-4 border-blue-600 shadow-md">
            <QrScanner
              onDecode={(res) => handleDecode(res?.text || res)}
              onError={(err) => console.error(err)}
              constraints={{ facingMode: "environment" }}
            />
          </div>

          {/* STATUS BOX */}
          <div
            className={`mt-5 w-full p-4 rounded-xl text-center text-lg font-semibold transition-all duration-300 ${
              statusType === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : statusType === "error"
                ? "bg-red-100 text-red-700 border border-red-300"
                : statusType === "loading"
                ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            {status || "Scan a QR to begin"}
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-gray-500 text-sm">
        Ensure camera access is allowed • Best viewed in portrait mode
      </p>
    </div>
  );
}
