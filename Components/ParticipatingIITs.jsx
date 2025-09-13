"use client";

import React from "react";

const iits = [
  { name: "IIT Bhilai", logo: "/images/alliits/IIT Bhilai.webp" },
  { name: "IIT Bhubaneswar", logo: "/images/alliits/IIT Bhubaneswar.webp" },
  { name: "IIT (BHU) Varanasi", logo: "/images/alliits/IIT (BHU) Varanasi.webp" },
  { name: "IIT Bombay", logo: "/images/alliits/IIT Bombay.webp" },
  { name: "IIT Delhi", logo: "/images/alliits/IIT Delhi.webp"},
  { name: "IIT (ISM) Dhanbad", logo: "/images/alliits/IIT (ISM) Dhanbad.webp"},
  { name: "IIT Dharwad", logo: "/images/alliits/IIT Dharwad.webp" },
  { name: "IIT Gandhinagar", logo: "/images/alliits/IIT Gandhinagar.webp" },
  { name: "IIT Goa", logo: "/images/alliits/IIT Goa.webp" },
  { name: "IIT Guwahati", logo: "/images/alliits/IIT Guwahati.webp" },
  { name: "IIT Hyderabad", logo: "/images/alliits/IIT Hyderabad.webp"},
  { name: "IIT Indore", logo: "/images/alliits/IIT Indore.webp"},
  { name: "IIT Jammu", logo: "/images/alliits/IIT Jammu.webp" },
  { name: "IIT Jodhpur", logo: "/images/alliits/IIT Jodhpur.webp"},
  { name: "IIT Kanpur", logo: "/images/alliits/IIT Kanpur.webp" },
  { name: "IIT Kharagpur",logo: "/images/alliits/IIT Kharagpur.webp" },
  { name: "IIT Madras", logo: "/images/alliits/IIT Madras.webp" },
  { name: "IIT Mandi", logo: "/images/alliits/IIT Mandi.webp" },
  { name: "IIT Palakkad", logo: "/images/alliits/IIT Palakkad.webp" },
  { name: "IIT Patna", logo: "/images/alliits/IIT Patna.webp" },
  { name: "IIT Roorkee", logo: "/images/alliits/IIT Roorkee.webp"},
  { name: "IIT Ropar", logo: "/images/alliits/IIT Ropar.webp" },
  { name: "IIT Tirupati", logo: "/images/alliits/IIT TIRUPATI.webp" },
];

export default function ParticipatingIITs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl text-[#800000] font-bold mb-4">PARTICIPATING IITS</h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          The following IITs are participating in the Inter IIT Sports Meet 2025.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 justify-items-center">
        {iits.map((iit, idx) => (
          <div key={idx} className="cursor-pointer group flex flex-col items-center text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-blue-300 rounded-lg">
              <img
                src={iit.logo}
                alt={iit.name}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {iit.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
