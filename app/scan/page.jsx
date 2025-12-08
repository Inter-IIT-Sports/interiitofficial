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

  // ✅ Auto clear status
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => {
      setStatus("");
      setStatusType("");
    }, 1200);
    return () => clearTimeout(timer);
  }, [status]);

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
    setTimeout(() => (cooldown.current = false), 1200);

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

        if (!text.startsWith("http")) return;
        if (!text.includes("/id/mens/") && !text.includes("/id/womens/")) return;

        verifyQR(text);
      },
      () => {}
    );
  }

  // ====================== CAMERA SWITCH =======================
  async function switchCamera() {
    if (cameras.length < 2) return alert("Only one camera available");

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
    } catch {
      alert("Torch not supported");
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
        <div className="bg-white shadow-md p-8 rounded-xl w-full max-w-sm">
          <h1 className="text-xl font-semibold text-center mb-4">
            Mess Scanner Login
          </h1>

          <input
            type="password"
            className="w-full border p-3 rounded-lg mb-4"
            placeholder="Enter Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
            onClick={handlePassword}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // ====================== CLEAN MODERN SCANNER UI =======================
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 py-6">

      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-semibold">Mess Entry Scanner</h1>
        <p className="text-sm text-gray-500">Secure QR Verification</p>
      </div>

      {/* Scanner */}
      <div className="w-full max-w-md bg-white rounded-xl shadow p-3">
        <div
          id="reader"
          className="w-full h-[300px] rounded-lg overflow-hidden bg-black"
        ></div>

        {/* Buttons */}
        <div className="flex gap-3 mt-3">
          <button
            onClick={switchCamera}
            className="flex-1 py-2 rounded-lg bg-gray-900 text-white"
          >
            Switch Camera
          </button>

          <button
            onClick={toggleTorch}
            className="flex-1 py-2 rounded-lg bg-gray-200 text-gray-900"
          >
            {torchOn ? "Torch Off" : "Torch On"}
          </button>
        </div>

        {/* Status */}
        <div
          className={`mt-3 p-3 rounded-lg text-center text-sm font-medium ${
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