"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

export default function ScanPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  const scannerRef = useRef(null);
  const cooldown = useRef(false);
  const cameraIdRef = useRef(null);
  const [cameras, setCameras] = useState([]);
  const [torchOn, setTorchOn] = useState(false);

  // ====================== LOGIN ==========================
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

  // ====================== VERIFY QR =======================
  async function verifyQR(text) {
    if (cooldown.current) return;

    cooldown.current = true;
    setTimeout(() => (cooldown.current = false), 1500);

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

  // ====================== INITIALIZE SCANNER =======================
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
        qrbox: 250,
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      },
      (decodedText) => {
        const text = String(decodedText).trim();

        // ======================== 🔥 FRONTEND FILTERING FIREWALL  🔥 ========================
        // Prevents ALL 500 errors & SyntaxErrors
        if (!text.startsWith("http")) return;
        if (!text.includes("/id/mens/") && !text.includes("/id/womens/")) return;
        // ====================================================================================

        verifyQR(text);
      },
      () => {} // ignore scanner errors
    );
  }

  // ====================== CAMERA SWITCH =======================
  async function switchCamera() {
    if (cameras.length < 2) {
      alert("Only one camera found");
      return;
    }

    const currentIndex = cameras.findIndex((c) => c.id === cameraIdRef.current);
    const nextIndex = (currentIndex + 1) % cameras.length;

    cameraIdRef.current = cameras[nextIndex].id;

    startScanner(cameraIdRef.current);
  }

  // ====================== TORCH TOGGLE =======================
  async function toggleTorch() {
    try {
      const track = scannerRef.current.getState().stream.getVideoTracks()[0];
      await track.applyConstraints({
        advanced: [{ torch: !torchOn }],
      });
      setTorchOn(!torchOn);
    } catch (err) {
      alert("Torch not supported on this device");
    }
  }

  // ====================== CLEANUP =======================
  useEffect(() => {
    return () => {
      scannerRef.current?.stop().catch(() => {});
    };
  }, []);

  // ====================== LOGIN UI =======================
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg p-8 rounded-xl max-w-sm w-full">
          <h1 className="text-2xl text-center mb-4 font-bold">
            Mess Scanner Login
          </h1>

          <input
            type="password"
            className="w-full border p-3 rounded-lg"
            placeholder="Enter Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            onClick={handlePassword}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // ====================== SCANNER UI =======================
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Mess Entry Scanner
      </h1>

      <div
        id="reader"
        className="w-full max-w-lg mx-auto h-[430px] rounded-xl overflow-hidden border-4 border-blue-600 shadow-lg"
      ></div>

      <div className="flex justify-center gap-4 mt-4 max-w-lg mx-auto">
        <button
          onClick={switchCamera}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg"
        >
          Switch Camera
        </button>

        <button
          onClick={toggleTorch}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
        >
          {torchOn ? "Torch Off" : "Torch On"}
        </button>
      </div>

      <div
        className={`mt-5 w-full max-w-lg mx-auto p-4 rounded-xl text-center text-lg font-semibold ${
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
  );
}
