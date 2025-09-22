// app/contact/page.tsx  (Next.js 13+ App Router)

import React from "react";

export default function ContactPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-6">
          🚧 This page is currently under development.  
          Please check back later!
        </p>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700"
          disabled
        >
          Coming Soon
        </button>
      </div>
    </main>
  );
}
