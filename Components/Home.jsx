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
  const [sportsTimeLeft, setSportsTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [aquaticsTimeLeft, setAquaticsTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
    { name: "IIT Tirupati", logo: "/images/alliits/IIT TIRUPATI.webp", dates: "Dec 14 – 21" },
  ];

  const aquaticsMeet = {
    name: "IIT Madras",
    logo: "/images/alliits/IIT Madras.webp",
    meet: "39th Aquatics Meet",
    dates: "Sep 30 – Oct 5",
  };

  return (
    <>
      <section className="w-full bg-gray-50 py-16 px-6" style={{ fontFamily: '"Poppins", sans-serif' }}>
        <div className="flex justify-center mb-6">
          <Image src="/logo_2.png" alt="Inter IIT Sports Meet Logo" width={150} height={150} />
        </div>

        {/* Title */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold flex justify-center flex-wrap gap-2">
            <TextType text={["Inter IIT"]} typingSpeed={75} pauseDuration={1500} showCursor={false} className="text-black" />
            <TextType text={["Sports"]} typingSpeed={75} pauseDuration={1500} showCursor={false} className="text-sky-600" />
            <TextType text={["Meet"]} typingSpeed={75} pauseDuration={1500} showCursor={true} className="text-[#800000]" />
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mt-2">
            The Inter IIT Sports Meet 2025 brings together athletes from all IITs,
            showcasing talent, energy, and sportsmanship in a week-long celebration
            of competitive spirit.
          </p>
        </div>

        {/* Meets side by side */}
        <div className="mt-12 max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-stretch">

          {/* 58th Inter IIT Sports Meet */}
          <div className="flex-1 text-center flex flex-col justify-between items-center bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#800000] mb-6">
              58th Inter IIT Sports Meet
            </h2>

            <span className="text-gray-600 mb-2">Event starts In</span>
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
                    <Image src={iit.logo} alt={iit.name} width={100} height={100} className="object-contain" />
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-1">{iit.name}</p>
                  <p className="text-gray-700 text-sm">{iit.dates}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 max-w-md text-center mt-auto">
              Hosted collaboratively by IIT Madras, Hyderabad, and Tirupati, this meet celebrates
              athletic excellence across all IITs with a variety of competitive sports and events.
            </p>
          </div>

          {/* 39th Aquatics Meet */}
          <div className="flex-1 text-center flex flex-col justify-between items-center bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#800000] mb-6">
              39th Aquatics Meet
            </h2>

            <span className="text-gray-600 mb-2">Event starts In</span>
            <div className="flex justify-center gap-4 flex-wrap mb-6">
              {Object.entries(aquaticsTimeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-white border border-gray-300 shadow-md rounded-xl px-4 py-3 w-20 flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">{value}</span>
                  <span className="text-sm md:text-base text-gray-600 capitalize">{unit}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-600 font-medium mb-4">Hosted by</p>
            <div className="flex justify-center mb-4">
              <Image src={aquaticsMeet.logo} alt={aquaticsMeet.name} width={100} height={100} className="object-contain" />
            </div>
            <p className="text-lg font-semibold text-gray-900">{aquaticsMeet.name}</p>
            <p className="text-gray-700 text-sm mb-4">{aquaticsMeet.dates}</p>

            <p className="text-gray-600 max-w-md text-center mt-auto">
              Hosted exclusively by IIT Madras. A highlight of the year, showcasing top aquatic
              talent alongside the main sports meet.
            </p>
          </div>

        </div>
      </section>

      <section className="w-full px-4 md:px-8 overflow-hidden"><VideoCarousel /></section>
      <section className="w-full px-4 md:px-8 overflow-hidden"><DirectorsSection /></section>
      <section className="w-full px-4 md:px-8 overflow-hidden"><DeansSection /></section>
      <section className="w-full px-4 md:px-8 overflow-hidden"><CommitteesSection /></section>
      <section className="w-full px-4 md:px-8 overflow-hidden"><ParticipatingIITs /></section>
    </>
  );
}
