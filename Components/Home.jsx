"use client";
import VideoCarousel from "./VideoCarousel";
import DirectorsSection from "./DirectorsSection";
import DeansSection from "./Deans";
import CommitteesSection from "./CommitteesSection";
import ParticipatingIITs from "./ParticipatingIITs";
import { useEffect, useState } from "react";
import Image from "next/image";
import TextType from "./TextType";
import FluidGlass from "./FluidGlass";

export default function HeroSection2025() {
  const [sportsTimeLeft, setSportsTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [aquaticsTimeLeft, setAquaticsTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const iitPoints = [
  { name: "IIT Madras", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT Bombay", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT Delhi", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT Kanpur", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT Kharagpur", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT Guwahati", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT Roorkee", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT BHU", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT Hyderabad", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT Indore", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT Mandi", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT Palakkad", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT Patna", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT Bhubaneswar", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT Gandhinagar", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT Jodhpur", g: 0, s: 0, b: 0, f: 0, total: 0 },
  { name: "IIT (ISM) Dhanbad", g: 0, s: 0, b: 0, f: 0, total: 0 }
];


  useEffect(() => {
    const sportsDate = new Date("December 14, 2025 00:00:00").getTime();
    const aquaticsDate = new Date("September 30, 2025 00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();

      const diffSports = sportsDate - now;
      const diffAquatics = aquaticsDate - now;

      if (diffSports > 0) {
        setSportsTimeLeft({
          days: Math.floor(diffSports / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diffSports / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diffSports / (1000 * 60)) % 60),
          seconds: Math.floor((diffSports / 1000) % 60),
        });
      }

      if (diffAquatics > 0) {
        setAquaticsTimeLeft({
          days: Math.floor(diffAquatics / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diffAquatics / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diffAquatics / (1000 * 60)) % 60),
          seconds: Math.floor((diffAquatics / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const mainMeetIITs = [
    { name: "IIT Madras", logo: "/images/alliits/IIT Madras.webp", dates: "Dec 14 – 21" },
    { name: "IIT Hyderabad", logo: "/images/alliits/IIT Hyderabad.webp", dates: "Dec 14 – 21" },
    { name: "IIT Tirupati", logo: "/images/alliits/IIT_Tirupati_logo.svg.png", dates: "Dec 14 – 21" },
  ];

  const aquaticsMeet = {
    name: "IIT Madras",
    logo: "/images/alliits/IIT Madras.webp",
    meet: "39th Aquatics Meet",
    dates: "Sep 30 – Oct 5",
  };

  return (
    <>
      {/* Hero Banner Section */}
      <div style={{ height: '600px', position: 'relative', fontFamily: "'Poppins', sans-serif" }}>
        <FluidGlass
          mode="cube"
          lensProps={{
            scale: 0.25,
            ior: 1.15,
            thickness: 5,
            chromaticAberration: 0.1,
            anisotropy: 0.01
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
          {/* Logo */}
          <div className="relative w-32 md:w-40 lg:w-48 h-32 md:h-40 lg:h-48">
            <Image src="/logo_2.png" alt="Inter IIT Sports Meet Logo" fill style={{ objectFit: 'contain' }} />
          </div>

          {/* Title */}
          <h1 className="font-semibold flex flex-wrap justify-center gap-2 mt-4 text-[2rem] md:text-[3rem] lg:text-[4rem]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <TextType text={["Inter IIT"]} typingSpeed={75} pauseDuration={1500} showCursor={false} className="text-black" />
            <TextType text={["Sports"]} typingSpeed={75} pauseDuration={1500} showCursor={false} className="text-sky-600" />
            <TextType text={["Meet"]} typingSpeed={75} pauseDuration={1500} showCursor={true} className="text-[#800000]" />
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 font-semibold text-base md:text-lg lg:text-xl mt-2 max-w-2xl" style={{ fontFamily: "'Mukta', sans-serif" }}>
            The Inter IIT Sports Meet 2025 unites athletes from across all IITs to celebrate excellence,
            teamwork, and the spirit of sportsmanship in one of the most prestigious sporting events of the year.
          </p>
        </div>
      </div>

      {/* Countdown Section */}
      <section className="w-full bg-gray-200 py-16 px-6" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
        <div className="mt-0 max-w-6xl mx-auto flex flex-col-reverse md:flex-row-reverse gap-6 items-stretch">

          {/* Main Sports Meet */}
          <div className="flex-1 text-center flex flex-col justify-between items-center bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#800000] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              58th Inter IIT Sports Meet
            </h2>

            <span className="text-gray-600 mb-2">Event Starts In</span>
            <div className="flex justify-center gap-4 flex-wrap mb-6">
              {Object.entries(sportsTimeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-white border border-gray-300 shadow-md rounded-xl px-4 py-3 w-20 flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">{value}</span>
                  <span className="text-sm md:text-base text-gray-600 capitalize">{unit}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-600 font-medium mb-4">Co-hosted by</p>
            <div className="flex flex-wrap justify-center items-center gap-12 mb-4">
              {mainMeetIITs.map((iit) => (
                <div key={iit.name} className="flex flex-col items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mb-2">
                    <Image
                      src={iit.logo}
                      alt={iit.name}
                      width={100}
                      height={100}
                      className={`object-contain ${iit.name === "IIT Tirupati" ? "my-8" : ""}`}
                    />
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-1">{iit.name}</p>
                  <p className="text-gray-700 text-sm">{iit.dates}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 max-w-md text-start mt-auto">
              Co-hosted by IIT Madras, IIT Hyderabad, and IIT Tirupati, this edition embodies the unity and
              competitive spirit that define the Inter IIT legacy — featuring diverse disciplines and events
              showcasing the best athletic talent across the IIT ecosystem.
            </p>
          </div>

          {/* Aquatics Meet */}
          <div className="flex-1 text-center flex flex-col justify-between items-center bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#800000] mb-6">
              39th Aquatics Meet
            </h2>

            {/* Event Status & Day */}
            {(() => {
              const now = new Date().getTime();
              const aquaticsStart = new Date("September 30, 2025 00:00:00").getTime();
              const aquaticsEnd = new Date("October 5, 2025 23:59:59").getTime();
              let dayNumber = Math.floor((now - aquaticsStart) / (1000 * 60 * 60 * 24));
              dayNumber = Math.max(0, Math.min(dayNumber, 5));
              const liveStreamLinks = [
                "https://www.youtube.com/live/6SBnH-Th7Z4?si=dAdkB8vVNdBH0-aF",
                "https://www.youtube.com/live/67Mj4P1R__I?si=d5fvnDFRr2tx0CwV",
                "https://www.youtube.com/live/E2XZV3TZuFI",
                "https://example.com/day3",
                "https://example.com/day4",
                "https://example.com/day5",
              ];

              if (now < aquaticsStart) return <p className="text-gray-500 font-medium text-lg mb-6">Event Not Started</p>;
              if (now > aquaticsEnd) return <p className="text-gray-500 font-medium text-lg mb-6">Event Concluded ✅</p>;

              return (
                <div className="flex flex-col items-center gap-2 mb-6">
                  {/* Event Ongoing */}
                  <p className="flex items-center gap-2 text-sky-600 font-semibold text-lg">
                    <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
                    Event Ongoing 🎉
                  </p>

                  {/* Day */}
                  <p className="text-gray-800 font-semibold text-lg">Day {dayNumber}</p>

                  {/* Watch Live Button */}
                  <a
                    href={liveStreamLinks[dayNumber]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-sky-600 px-4 py-1 rounded-full text-sm font-medium mt-1 hover:bg-sky-700 transition-all duration-200"
                  >
                    Watch Live
                  </a>
                </div>
              );
            })()}

            <p className="text-gray-600 font-medium mb-2">Hosted by</p>
            <div className="flex justify-center mb-4">
              <Image src={aquaticsMeet.logo} alt={aquaticsMeet.name} width={100} height={100} className="object-contain" />
            </div>

            <p className="text-lg font-semibold text-gray-900">{aquaticsMeet.name}</p>
            <p className="text-gray-700 text-sm mb-2">{aquaticsMeet.dates}</p>

            <p className="text-gray-600 max-w-md text-center mt-2">
              Organized by IIT Madras, the 39th Aquatics Meet marks the opening chapter of the Inter IIT season — highlighting speed, strength, and teamwork across swimming, diving, and water polo disciplines.
            </p>
          </div>





        </div>
      </section>

      {/* Other Sections */}
      <section className="w-full px-4 md:px-8 overflow-hidden"><DirectorsSection /></section>
      <section className="w-full px-4 md:px-8 overflow-hidden"><DeansSection /></section>
      <section className="w-full px-4 md:px-8 overflow-hidden"><CommitteesSection /></section>
      <section className="w-full px-4 md:px-8 overflow-hidden"><ParticipatingIITs /></section>
    </>
  );
}
