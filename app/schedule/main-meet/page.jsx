'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ScheduleCard from '../../../Components/ScheduleCard';
import mainMeetSchedule from '../../../lib/mainMeetSchedule';
import { sportImages } from '../../../lib/sportImageMapping';

const iits = ["IIT Madras", "IIT Hyderabad", "IIT Tirupati"];

const dates = [
  "All Dates", "14th Dec", "15th Dec", "16th Dec", "17th Dec", "18th Dec",
  "19th Dec", "20th Dec", "21st Dec"
];

const iitSports = {
  "IIT Madras": ["Badminton", "Basketball", "Squash", "Table Tennis"],
  "IIT Tirupati": ["Tennis", "Weightlifting"],
  "IIT Hyderabad": ["Athletics", "Chess", "Cricket", "Football", "Hockey", "Volleyball"],
};
const allSports = ["All Sports", "Athletics", "Badminton", "Basketball", "Chess", "Cricket",
"Football", "Hockey", "Squash", "Table Tennis", "Tennis", "Volleyball", "Weightlifting"];

const processedSchedule = (() => {
  const flatSchedule = mainMeetSchedule.flat();
  const lastImageIndex = {};

  return flatSchedule.map(item => {
    if (!item || !item.sport) return item;

    // Date formatting
    let formattedDate = item.date;
    if (item.date) {
        const dateParts = item.date.split('/');
        const day = parseInt(dateParts[0]);
        let suffix = 'th';
        if (day === 1 || day === 21 || day === 31) suffix = 'st';
        else if (day === 2 || day === 22) suffix = 'nd';
        else if (day === 3 || day === 23) suffix = 'rd';
        formattedDate = `${day}${suffix} Dec`;
    }

    // Background Image assignment
    const sport = item.sport.toLowerCase();
    const images = sportImages[sport];
    let backgroundImage = '/images/main_meet_bg_image.jpg'; // default

    if (images && images.length > 0) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * images.length);
      } while (images.length > 1 && randomIndex === lastImageIndex[sport]);
      
      lastImageIndex[sport] = randomIndex;
      backgroundImage = images[randomIndex];
    }
    
    return {
        ...item,
        date: formattedDate,
        backgroundImage: backgroundImage,
    };
  });
})();

export default function SchedulePage() {
  const [activeIit, setActiveIit] = useState(iits[0]);
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedDate, setSelectedDate] = useState("All Dates");
  const [availableSports, setAvailableSports] = useState(allSports);

  useEffect(() => {
    const getOrdinal = (d) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    };
  
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.toLocaleString('default', { month: 'short' });
    
    const formattedToday = `${currentDay}${getOrdinal(currentDay)} ${currentMonth}`;
  
    const eventStartDay = parseInt(dates[1]);
    const eventStartDate = new Date(2025, 11, eventStartDay); 
  
    if (today < eventStartDate) {
      setSelectedDate("All Dates");
    } else if (dates.includes(formattedToday)) {
      setSelectedDate(formattedToday);
    } else {
      setSelectedDate("All Dates");
    }
  }, []);

  useEffect(() => {
    const newSports = iitSports[activeIit] ? ["All Sports", ...iitSports[activeIit]] : allSports;
    setAvailableSports(newSports);
    if (!newSports.includes(selectedSport)) {
      setSelectedSport("All Sports");
    }
  }, [activeIit, selectedSport]);

  const filteredSchedule = processedSchedule.filter(item => {
    if (!item) return false;
    const iitMatch = item.iit === activeIit;
    const sportMatch = selectedSport === "All Sports" || item.sport === selectedSport;
    const dateMatch = selectedDate === "All Dates" || item.date === selectedDate;
    return iitMatch && sportMatch && dateMatch;
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {/* Desktop background */}
        <div className="hidden lg:block absolute top-0 left-108 w-full h-full">
            <Image
                src="/images/main_meet_bg_image.jpg"
                alt="Background"
                layout="fill"
                objectFit="cover"
                objectPosition="center right"
                className="opacity-20"
            />
        </div>
        {/* Mobile background */}
        <div className="block lg:hidden">
            <Image
                src="/images/main_meet_bg_image_mobile.jpg"
                alt="Background"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="opacity-10"
            />
        </div>
      </div>

      <main className="container mx-auto px-4 md:py-24 py-20 relative z-10">
        <div className="md:mb-8">
          <h1 className="text-3xl lg:text-4xl text-center font-bold text-red-800 mb-4">
            Inter IIT Sports Schedule
          </h1>
        </div>


        <div className="flex flex-col lg:flex-row gap-8 px-0">
          <div className="w-full lg:w-2/3">
            <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="flex items-center justify-center md:pl-10 md:justify-start gap-2 mb-4 md:mb-0">
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

              <div className="flex flex-col-2 sm:flex-row gap-4 items-center justify-center">
                <div className="flex items-center gap-2">
                  <label htmlFor="sport-filter" className="text-sm font-medium shrink-0">
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
                  <label htmlFor="date-filter" className="text-sm font-medium shrink-0">
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
            {/* This container will handle the scrolling for the cards */}
            <div className="lg:h-[calc(100vh-12rem)] md:pl-10 overflow-y-auto no-scrollbar">
              <div className="space-y-6">
                {filteredSchedule.length > 0 ? (
                  filteredSchedule.map((item) => (
                    <ScheduleCard key={item.id} item={item} />
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
          <div className="hidden lg:block lg:w-1/3">
            {/* This space is for the background image to be more visible */}
          </div>
        </div>
      </main>
    </div>
  );
}