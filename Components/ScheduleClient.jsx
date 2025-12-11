"use client";

import Image from "next/image";
import ScheduleCard from "./ScheduleCard";
import useSchedule from "../lib/useSchedule";
import { useEffect, useState, useRef } from "react";

// This component now accepts initialSchedule as a prop from the server
export default function ScheduleClient({ initialSchedule }) {
  const {
    loading,
    iits,
    dates,
    activeIit,
    setActiveIit,
    selectedSport,
    setSelectedSport,
    selectedDate,
    setSelectedDate,
    availableSports,
    filteredSchedule,
  } = useSchedule(initialSchedule);

  const [showButton, setShowButton] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollTimeout;
    const handleScroll = (e) => {
      setIsScrolling(true);
      setShowButton(e.target.scrollTop > 200);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="hidden lg:block absolute top-0 left-108 w-full h-full">
          <Image
            src="/images/main_meet_bg_image.jpg"
            alt="Background"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center right' }}
            className="opacity-20"
          />
        </div>
        {/* Mobile background */}
        <div className="block lg:hidden">
          <Image
            src="/images/main_meet_bg_image_mobile.jpg"
            alt="Background"
            fill
            className="object-cover object-center opacity-10"
          />
        </div>
      </div>
      <main className="container mx-auto px-4 md:py-24 py-20 relative z-10">
        <div className="md:mb-8">
          <h1 className="text-2xl lg:text-4xl text-center font-bold text-red-800 mb-4">
            Inter IIT Sports Schedule
          </h1>
        </div>
        <div className="flex flex-col xl:flex-row gap-8 px-0">
          <div className="w-full xl:w-2/3">
            <div className="mb-4 flex flex-col lg:flex-row lg:justify-between lg:items-center">
              <div className="flex items-center justify-center lg:pl-10 lg:justify-start gap-2 mb-4 lg:mb-0 min-h-12">
                {iits.map((iit) => (
                  <button
                    key={iit}
                    onClick={() => setActiveIit(iit)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-400 ${
                      activeIit === iit
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {iit}
                  </button>
                ))}
              </div>
              {/* Dropdowns Container (Stacks on mobile, horizontal on LG+) */}
              <div className="flex flex-row gap-4 items-center justify-center w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="sport-filter"
                    className="text-sm font-medium shrink-0"
                  >
                    Sport:
                  </label>
                  <select
                    id="sport-filter"
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {availableSports.map((sport) => (
                      <option key={sport} value={sport}>
                        {sport}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="date-filter"
                    className="text-sm font-medium shrink-0"
                  >
                    Date:
                  </label>
                  <select
                    id="date-filter"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {dates.map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* Schedule Cards Scroll Area */}
            <div className="relative">
               {showButton && (
                <button
                  onClick={scrollToTop}
                  className={`absolute z-10 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-100
                    top-4 right-4 
                    lg:top-0 lg:-right-14 
                    ${isScrolling ? "opacity-0" : "opacity-100"}
                  `}
                  aria-label="Scroll to top"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </button>
              )}
              <div ref={scrollContainerRef} className="h-[70vh] lg:h-[calc(100vh-12rem)] md:pl-10 overflow-y-auto no-scrollbar">
                <div className="space-y-6">
                  {loading ? (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <p className="text-center text-gray-500">
                        Loading schedule...
                      </p>
                    </div>
                  ) : filteredSchedule.length > 0 ? (
                    filteredSchedule.map((item) => (
                      <ScheduleCard key={item._id} item={item} />
                    ))
                  ) : (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <p className="text-center text-gray-500">
                        No matches found for the selected filters.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:block xl:w-1/3">
            {/* This space is for the background image to be more visible */}
          </div>
        </div>
      </main>
    </div>
  );
}
