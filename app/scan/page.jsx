"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

export default function ScanPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false); // 👈 NEW

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  const scannerRef = useRef(null);
  const cooldown = useRef(false); // modified for 2–3 sec delay
  const cameraIdRef = useRef(null);
  const [cameras, setCameras] = useState([]);
  const [torchOn, setTorchOn] = useState(false);

  // Auto clear status
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => {
      setStatus("");
      setStatusType("");
    }, 1500);
    return () => clearTimeout(timer);
  }, [status]);

  async function handlePassword() {
    const res = await fetch("/api/scan-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pass }),
    });

    const data = await res.json();
    if (data.ok) setAuthenticated(true);
    else alert("Incorrect Password");
  }

  async function verifyQR(text) {
    if (cooldown.current) return;

    // ⏳ NEW: lock scanner for 2.5 seconds
    cooldown.current = true;
    setTimeout(() => (cooldown.current = false), 2500);

    setStatus("Checking...");
    setStatusType("loading");

    const res = await fetch("/api/mess-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qrRaw: text }),
    });

    const j = await res.json();

    if (j.ok) {
      setStatus(j.message);
      setStatusType("success");
      navigator.vibrate?.(120);
    } else {
      setStatus(j.message);
      setStatusType("error");
      navigator.vibrate?.([120, 80, 120]);
    }
  }

  useEffect(() => {
    if (!authenticated || scannerRef.current) return;

    Html5Qrcode.getCameras().then((devices) => {
      if (!devices.length) {
        alert("No camera found");
        return;
      }

      setCameras(devices);
      cameraIdRef.current = devices[0].id;
      startScanner(devices[0].id);
    });
  }, [authenticated]);

  async function startScanner(cameraId) {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (_) {}
    }

    scannerRef.current = new Html5Qrcode("reader");

    await scannerRef.current.start(
      cameraId,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      },
      (decodedText) => {
        const text = String(decodedText).trim();
        if (!text.startsWith("http")) return;
        if (!text.includes("/id/mens/") && !text.includes("/id/womens/"))
          return;

        verifyQR(text);
      },
      () => {}
    );
  }

  async function switchCamera() {
    if (cameras.length < 2) return alert("Only one camera available");

    const currentIndex = cameras.findIndex((c) => c.id === cameraIdRef.current);
    const nextIndex = (currentIndex + 1) % cameras.length;

    cameraIdRef.current = cameras[nextIndex].id;
    startScanner(cameraIdRef.current);
  }

  async function toggleTorch() {
    try {
      const track = scannerRef.current.getState().stream.getVideoTracks()[0];
      await track.applyConstraints({
        advanced: [{ torch: !torchOn }],
      });
      setTorchOn(!torchOn);
    } catch {
      alert("Torch not supported");
    }
  }

  useEffect(() => {
    return () => {
      scannerRef.current?.stop().catch(() => {});
    };
  }, []);

  // =============== LOGIN UI ===============
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
        <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-xl font-semibold text-center mb-6">Mess Scanner Login</h1>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"} // 👈 NEW
              className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />

            {/* 👁 PASSWORD VISIBILITY BUTTON */}
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-600"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            onClick={handlePassword}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // =============== SCANNER UI ===============
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-50 px-4 pt-20 pb-10">

      <div className="text-center mb-5">
        <h1 className="text-2xl font-semibold">Mess Entry Scanner</h1>
        <p className="text-gray-500 text-sm">Scan student QR codes securely</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4">

        <div
          id="reader"
          className="w-full h-[280px] sm:h-[320px] rounded-xl overflow-hidden bg-black"
        ></div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={switchCamera}
            className="flex-1 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
          >
            Switch Camera
          </button>

          <button
            onClick={toggleTorch}
            className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-900 font-medium hover:bg-gray-300 transition"
          >
            {torchOn ? "Torch Off" : "Torch On"}
          </button>
        </div>

        <div
          className={`mt-4 p-3 rounded-xl text-center text-sm font-medium transition ${
            statusType === "success"
              ? "bg-green-100 text-green-700"
              : statusType === "error"
              ? "bg-red-100 text-red-700"
              : statusType === "loading"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {status || "Scan QR to continue"}
        </div>
      </div>
    </div>
  );
}
