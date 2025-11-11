"use client";

import { useState } from "react";
import LiveAdminPanel from "../../Components/LiveAdminPanel"; // adjust path if needed
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // react-icons for eye icon

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const ADMIN_PASSWORD = "interiit2025"; // Change to your secure password

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password!");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-[#800000] mb-6 text-center">Admin Login</h1>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-[#800000] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </button>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-[#800000] text-white py-3 rounded-lg hover:bg-[#a00000] transition font-medium"
          >
            Login
          </button>
          {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
        </div>
      </div>
    );
  }

  return <LiveAdminPanel />;
}
