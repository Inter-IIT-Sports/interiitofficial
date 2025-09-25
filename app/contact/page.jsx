// app/contact/page.tsx  (Next.js 13+ App Router)

import React from "react";

export const metadata = {
  title: "Contact Us | Inter IIT Sports Meet 2025",
  description:
    "Get in touch with the organizing team of Inter IIT Sports Meet 2025 for queries related to registration, schedules, participation, and support.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Welcome to the official contact page of{" "}
          <strong>Inter IIT Sports Meet 2025</strong>.  
          Our organizing team is here to help participants, officials, and
          institutions with queries related to registrations, event schedules,
          and other event-related support.
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          You will soon find detailed contact information including email
          addresses, phone numbers, and helpdesk details on this page. In the
          meantime, please stay tuned as we finalize the details. This page will
          be regularly updated.
        </p>

        <div className="mt-6">
          <button
            className="px-5 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700"
            disabled
          >
            🚧 Coming Soon
          </button>
        </div>
      </div>
    </main>
  );
}
