// app/legacy/Content.tsx
export const metadata = {
  title: "Team | Inter IIT Sports Meet 2025",
  description:
    "Meet the organizing team behind the 58th Inter IIT Sports Meet 2025. Learn about the officials, coordinators, and volunteers making this event possible across all IITs.",
  keywords: [
    "Inter IIT Sports Meet team",
    "IIT sports organizers",
    "IIT sports coordinators",
    "IIT volunteers 2025",
    "Inter IIT officials"
  ],
  openGraph: {
    title: "Team | Inter IIT Sports Meet 2025",
    description:
      "Discover the team of organizers, officials, and volunteers behind the 58th Inter IIT Sports Meet 2025, making it a successful event across all IITs.",
    url: "https://interiitsports.in/team",
    siteName: "Inter IIT Sports Meet 2025",
    images: [
      {
        url: "https://interiitsports.in/favicon.ico",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team | Inter IIT Sports Meet 2025",
    description:
      "Meet the organizers, officials, and volunteers making the 58th Inter IIT Sports Meet 2025 possible across all IITs.",
    images: ["https://interiitsports.in/logo_2.png"],
  },
  alternates: {
    canonical: "https://interiitsports.in/team",
  },
};
// app/legacy/Content.tsx


export default function LegacyContent() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-xl text-center">
        <p className="text-lg sm:text-xl text-gray-700 mb-6">
          This page will showcase the organizers, officials, and volunteers behind the 58th Inter IIT Sports Meet 2025.
        </p>
        <div className="inline-block w-24 h-1 rounded-full bg-gradient-to-r from-[#481311] to-[#cf6b57]" />
      </div>
    </section>
  );
}

