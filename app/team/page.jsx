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
export default function LegacyContent() {
  const sections = [
    {
      title: "IIT Madras",
      people: [
        { name: "Prof. Arul Prakash K", role: "Advisor Sports", img: "/images/our-team/Arul.png" },
        { name: "Prof. Shruti Dubey", role: "Co Advisor Sports", img: "/images/our-team/Shruti.png" },
        { name: "Prof. Sudakar Chandran", role: "Co Advisor Sports", img: "/images/our-team/Sudakar.png" },
        { name: "Dr. Edinbrow Pakiaraj", role: "Sports Officer", img: "/images/our-team/dummy.png" },
      ],
    },
    {
      title: "IIT Hyderabad",
      people: [
        { name: "", role: "Advisor Sports", img: "/images/our-team/dummy.png" },
        { name: "", role: "Co Advisor Sports", img: "/images/our-team/dummy.png" },
        { name: "", role: "Co Advisor Sports", img: "/images/our-team/dummy.png" },
        { name: "", role: "Sports Officer", img: "/images/our-team/dummy.png" },
      ],
    },
    {
      title: "IIT Tirupati",
      people: [
        { name: "", role: "Advisor Sports", img: "/images/our-team/dummy.png" },
        { name: "", role: "Co Advisor Sports", img: "/images/our-team/dummy.png" },
        { name: "", role: "Co Advisor Sports", img: "/images/our-team/dummy.png" },
        { name: "", role: "Sports Officer", img: "/images/our-team/dummy.png" },
      ],
    },
  ];

  return (
    <section>
    <div className="page-content bg-gray-50 mt-8">
      <div className="section-full content-inner">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {sections.map((section, idx) => (
            <section key={idx} className="py-10 sm:py-12 lg:py-16">
              {/* Section header */}
              <div className="text-center mb-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-gray-900 inline-block">
                  {section.title}
                </h2>
                <div className="mt-2 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-[#481311] to-[#cf6b57]" />
              </div>

              {/* Horizontal scroll container */}
              <div className="flex overflow-x-auto gap-4 py-2">
                {section.people.map((p, i) => (
                  <article
                    key={i}
                    className="flex-none w-64 sm:w-72 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="overflow-hidden rounded-t-2xl aspect-[4/5]">
                      <a href="#">
                        <img
                          src={p.img}
                          alt={p.name}
                          loading="lazy"
                          className="w-64 h-64 object-cover object-top transition-transform duration-500 hover:scale-105"
                        />
                      </a>
                    </div>
                    <div className="px-4 py-3 text-center">
                      <h4 className="text-lg font-semibold text-gray-900">{p.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{p.role}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
}
