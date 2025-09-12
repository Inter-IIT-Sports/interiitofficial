// "use client";
// import { useState, useEffect } from "react";
// import VideoCarousel from "./VideoCarousel";
// import DirectorsSection from "./DirectorsSection";
// import DeansSection from "./Deans";
// import CommitteesSection from "./CommitteesSection";
// import ParticipatingIITs from "./ParticipatingIITs";


// export default function HeroWithText() {
//   const [showText, setShowText] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowText(true), 300);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="relative w-full h-screen overflow-hidden">
//         {/* Background Image */}
//         <img
//           src="/images/background/slider1.png"
//           alt="Hero Background"
//           className="absolute top-0 left-0 w-full h-full object-cover"
//         />
//       </section>

//       {/* Video Carousel */}
//       <section className="w-full px-4 md:px-8 overflow-hidden">
//         <VideoCarousel />
//       </section>
//       <section className="w-full px-4 md:px-8 overflow-hidden">
//         <DirectorsSection />
//       </section>
//       <section className="w-full px-4 md:px-8 overflow-hidden">
//         <DeansSection />
//       </section>
//       <section className="w-full px-4 md:px-8 overflow-hidden">
//         <CommitteesSection />
//       </section>
//       <section className="w-full px-4 md:px-8 overflow-hidden">
//         <ParticipatingIITs />
//       </section>
//     </>
//   );
// }

"use client";
import VideoCarousel from "./VideoCarousel";
import DirectorsSection from "./DirectorsSection";
import DeansSection from "./Deans";
import CommitteesSection from "./CommitteesSection";
import ParticipatingIITs from "./ParticipatingIITs";
import { useEffect, useState } from "react";
import Image from "next/image";
import TextType from "./TextType";

export default function HeroSection2025() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("December 14, 2025 00:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mainMeetIITs = [
    { name: "IIT Madras", logo: "/images/alliits/IIT Madras.webp", dates: "Dec 14 – 21" },
    { name: "IIT Hyderabad", logo: "/images/alliits/IIT Hyderabad.webp", dates: "Dec 14 – 21" },
    { name: "IIT Tirupati", logo: "/images/alliits/IIT TIRUPATI.webp", dates: "Dec 14 – 21" },
  ];

  const aquaticsMeet = {
    name: "IIT Madras",
    logo: "/images/alliits/IIT Madras.webp",
    meet: "39th Aquatics Meet",
    dates: "Sep 31 – Oct 5",
  };

  return (
    <>
      <section className="w-full bg-gray-50 py-16 px-6">
        {/* Inter IIT Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo_2.png"
            alt="Inter IIT Sports Meet Logo"
            width={150}
            height={150}
          />
        </div>

        {/* Title + Description */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            <TextType
              text={["Inter IIT Sports Meet"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mt-2">
            The Inter IIT Sports Meet 2025 brings together athletes from all IITs,
            showcasing talent, energy, and sportsmanship in a week-long celebration
            of competitive spirit.
          </p>
        </div>

        {/* 58th Inter IIT Sports Meet + Countdown */}
        <div className="mt-12 max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-sky-600 mb-6">
            58th Inter IIT Sports Meet
          </h2>

          {/* Countdown Timer */}

          <span className="text-gray-600 ">Event starts In</span>
          <div className="flex justify-center gap-4 flex-wrap mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-white border-gray-400 mt-4 shadow-md rounded-xl px-4 py-3 w-20 flex flex-col items-center"
              >
                <span className="text-2xl md:text-3xl font-bold text-gray-900">
                  {value}
                </span>
                <span className="text-sm md:text-base text-gray-600 capitalize">
                  {unit}
                </span>
              </div>
            ))}
          </div>

          {/* Hosting IITs for Main Meet (Inline, modern) */}
          <p className="text-gray-600 font-medium mb-4">Co-hosted by</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {mainMeetIITs.map((iit) => (
              <div key={iit.name} className="flex flex-col items-center">
                <div className="w-20 h-20 md:w-24 md:h-24 mb-2">
                  <Image
                    src={iit.logo}
                    alt={iit.name}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <p className="text-lg font-semibold text-gray-900">{iit.name}</p>
                <p className="text-gray-700 text-sm">{iit.dates}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 39th Aquatics Meet (Side Highlight) */}
        <div className="mt-16 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between bg-white border-gray-400 shadow-md rounded-xl p-6">
          {/* Text on left */}
          <div className="md:w-2/3 text-left">
            <h2 className="text-xl md:text-2xl font-semibold text-sky-600 mb-2">
              39th Aquatics Meet
            </h2>
            <p className="text-gray-700 text-lg md:text-xl mb-1">{aquaticsMeet.name}</p>
            <p className="text-gray-800 font-medium">{aquaticsMeet.dates}</p>
            <p className="mt-2 text-gray-600">
              Hosted exclusively by IIT Madras. A highlight of the year, showcasing
              top aquatic talent alongside the main sports meet.
            </p>
          </div>

          {/* Logo on right */}
          <div className="md:w-1/3 flex justify-center md:justify-end mt-4 md:mt-0">
            <Image
              src={aquaticsMeet.logo}
              alt={aquaticsMeet.name}
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
        </div>
      </section>
      <section className="w-full px-4 md:px-8 overflow-hidden">
        <VideoCarousel />
      </section>
      <section className="w-full px-4 md:px-8 overflow-hidden">
        <DirectorsSection />
      </section>
      <section className="w-full px-4 md:px-8 overflow-hidden">
        <DeansSection />
      </section>
      <section className="w-full px-4 md:px-8 overflow-hidden">
        <CommitteesSection />
      </section>
      <section className="w-full px-4 md:px-8 overflow-hidden">
        <ParticipatingIITs />
      </section>
    </>
  );
}






