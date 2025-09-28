import Home from "../Components/Home"

export const metadata = {
  title: "Inter IIT Sports Meet 2025",
  description:
    "Official registration and updates for the Inter IIT Sports Meet 2025. Participate in athletics, cricket, football, volleyball, and more across all IITs.",
  keywords: [
    "Inter IIT Sports Meet",
    "Inter IIT Sports Meet 2025",
    "Inter IIT official website",
    "58th Inter IIT Sports Meet",
    "39th Aquatics Meet",
    "IIT sports events 2025",
    "IIT sports registration",
    "Inter IIT updates",
    "Inter IIT registration",
    "IIT athletics, cricket, football, volleyball",
    "IIT sports events",
    "All IITs sports meet 2025",
    "Inter IIT Sports Meet Official Website"
  ],
  openGraph: {
    title: "Inter IIT Sports Meet",
    description:
      "Register and get updates for the Inter IIT Sports Meet 2025. Athletics, Cricket, Football, Volleyball, and more for all participating IITs.",
    url: "https://interiitsports.in",
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
    title: "Inter IIT Sports Meet 2025 | Official Event Website",
    description:
      "Official registration and updates for the Inter IIT Sports Meet 2025. Join athletics, cricket, football, and more across all IITs.",
    images: ["https://interiitsports.in/favicon.ico"],
  },
};


export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: `
{
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "name": "Inter IIT Sports Meet 2025",
  "startDate": "2025-12-01",
  "endDate": "2025-12-10",
  "location": {
    "@type": "Place",
    "name": "Host IIT (Rotating)",
    "address": "India"
  },
  "url": "https://interiitsports.in",
  "image": "https://interiitsports.in/favicon.ico",
  "performer": {
    "@type": "CollegeOrUniversity",
    "name": "Indian Institute of Technologies (IITs)"
  }
}
`}} />

      {/* Adjust padding to match navbar height */}
      <div className="pt-16"
      // style={{fontFamily: '"Nunito Sans", sans-serif'}}
      >
        <Home />
      </div>
    </>
  );
}

// https://www.instagram.com/interiit_sportsmeet_2025?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D