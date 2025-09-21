"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Head from "next/head";

export default function AquaticsSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(null);
  const [selectedMeet, setSelectedMeet] = useState("Aquatics");

  useEffect(() => {
    if (selectedMeet === "Aquatics") {
      const fetchSchedule = async () => {
        try {
          const parentDocRef = doc(db, "schedules", "aquatics");
          const daysColRef = collection(parentDocRef, "days");
          const querySnapshot = await getDocs(daysColRef);
          const allDays = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          allDays.sort((a, b) => parseInt(a.id.replace("day", "")) - parseInt(b.id.replace("day", "")));
          setSchedule(allDays);
        } catch (error) {
          console.error("Error fetching schedule:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSchedule();
    }
  }, [selectedMeet]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500 text-lg md:text-xl font-nunito">Loading schedule...</p>;

  const displayedDay =
    selectedMeet === "Aquatics"
      ? activeDay
        ? schedule.find(day => day.id === activeDay)
        : [...schedule].reverse().find(day =>
          ["forenoon", "afternoon"].some(session =>
            Object.keys(day.sessions[session] || {}).length > 0
          )
        )
      : null;

  return (
    <>
      <Head>
        <title>Schedule & Live Matches | 58th Inter IIT Sports Meet 2025 | 39th Aquatics meet | Aquatics meet score</title>
        <meta
          name="description"
          content="Check the live schedule and updates of ongoing matches for the 58th Inter IIT Sports Meet 2025, including the 39th Aquatics Meet and other sports events across all IITs."
        />
        <meta
          name="keywords"
          content="Inter IIT Sports Meet 2025, 58th Inter IIT Sports Meet, 39th Aquatics Meet 2025, IIT sports schedule, live IIT matches, athletics schedule, cricket schedule, football schedule, volleyball schedule"
        />
        {/* Open Graph */}
        <meta property="og:title" content="Schedule & Live Matches | 58th Inter IIT Sports Meet 2025" />
        <meta
          property="og:description"
          content="Stay updated with the live schedule and results of the 58th Inter IIT Sports Meet 2025, including the 39th Aquatics Meet and other events across all IITs."
        />
        <meta property="og:url" content="https://interiitsports.in/schedule" />
        <meta property="og:site_name" content="Inter IIT Sports Meet 2025" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://interiitsports.in/logo_2.png"
        />
        <meta property="og:locale" content="en_IN" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Schedule & Live Matches | 58th Inter IIT Sports Meet 2025" />
        <meta
          name="twitter:description"
          content="Live schedule and results for the 58th Inter IIT Sports Meet 2025, including the 39th Aquatics Meet and other events across all IITs."
        />
        <meta name="twitter:image" content="https://interiitsports.in/logo_2.png" />
        {/* Canonical */}
        <link rel="canonical" href="https://interiitsports.in/schedule" />
      </Head>

      <div className="pt-28 px-4 md:px-12 lg:px-20 pb-20 text-[#800000] bg-gray-50" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4 md:gap-0">
          <h1 className="text-2xl md:text-3xl font-bold text-center font-playfair">
            Inter IIT 2025 Schedule
          </h1>

          {/* Meet Toggle */}
          <div className="flex gap-2 md:gap-4 bg-white rounded-full shadow px-3 py-1">
            <button
              className={`px-4 py-1.5 rounded-full font-medium font-poppins transition-all duration-200
      ${selectedMeet === "Aquatics"
                  ? "bg-[#800000] text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"}`}
              onClick={() => setSelectedMeet("Aquatics")}
            >
              Aquatics
            </button>
            <button
              className={`px-4 py-1.5 rounded-full font-medium font-poppins transition-all duration-200
      ${selectedMeet === "Main Meet"
                  ? "bg-[#800000] text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"}`}
              onClick={() => setSelectedMeet("Main Meet")}
            >
              Main Meet
            </button>
          </div>

        </div>

        {selectedMeet === "Main Meet" ? (
          <p className="text-center text-gray-500 text-lg md:text-xl font-nunito mt-20">
            Main Meet schedule is not available yet. Please check back later.
          </p>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Days Sidebar */}
            <div className="flex-shrink-0 w-full md:w-48 bg-white rounded-xl shadow-md p-4 max-h-[calc(100vh-10rem)] overflow-y-auto">
              <h3 className="text-gray-700 font-semibold mb-4 text-center md:text-left text-lg font-poppins">Aquatic Days</h3>

              {/* Tabs container */}
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible px-1 py-1">
                {schedule.map(day => {
                  const isActive = activeDay === day.id;
                  return (
                    <div
                      key={day.id}
                      onClick={() => setActiveDay(day.id)}
                      className={`flex-shrink-0 flex items-center cursor-pointer px-3 py-2 rounded transition-all duration-300
            ${isActive ? "bg-[#800000]/10 border-l-4 border-[#800000]" : "hover:bg-gray-100"}`}
                    >
                      <span className={`w-3 h-3 rounded-full mr-2 ${isActive ? "bg-[#800000]" : "bg-gray-300"}`}></span>
                      <div className="flex flex-col min-w-max">
                        <span className={`${isActive ? "text-[#800000] font-semibold" : "text-gray-800"} text-sm md:text-base font-poppins`}>
                          Day {day.id.replace("day", "")}
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 font-nunito">{day.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>


            {/* Schedule Content */}
            <div className="flex-1 flex flex-col gap-10">
              {displayedDay && ["forenoon", "afternoon"].map(sessionKey => (
                <div key={sessionKey}>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#800000] mb-6 capitalize border-b pb-2 font-poppins">
                    {sessionKey} Session
                  </h3>

                  {Object.keys(displayedDay.sessions[sessionKey]).length === 0 ? (
                    <p className="text-gray-500 text-sm md:text-base mb-8 font-nunito">No events scheduled.</p>
                  ) : (
                    Object.keys(displayedDay.sessions[sessionKey])
                      .sort()
                      .map(sport => {
                        const events = displayedDay.sessions[sessionKey][sport].slice();
                        events.sort((a, b) => (a.eventNo || a.matchNo || 0) - (b.eventNo || b.matchNo || 0));

                        return (
                          <div key={sport} className="mb-8 md:mb-10">
                            <h4 className="text-sky-600 font-semibold text-lg md:text-xl mb-4 font-poppins">{sport}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {events.map(event => (
                                <div
                                  key={event.eventNo || event.matchNo}
                                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col gap-2 min-h-[140px]"
                                >
                                  <div className="flex justify-between items-center flex-wrap gap-2">
                                    <span className="font-bold text-gray-800 text-sm md:text-base font-nunito">{event.event || event.teams.join(" 🆚 ")}</span>
                                    {(event.eventNo || event.matchNo) && (
                                      <span className="text-xs md:text-sm text-gray-500 font-medium flex-shrink-0 font-nunito">
                                        {event.eventNo ? `Event ${event.eventNo}` : ""}
                                        {event.matchNo ? `Match ${event.matchNo}` : ""}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-gray-600 text-xs md:text-sm font-nunito">{event.type}</p>
                                  <p className="text-gray-600 text-xs md:text-sm font-nunito">Venue: {event.venue}</p>
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold w-max ${event.status === "Live"
                                      ? "bg-red-100 text-red-700 animate-pulse"
                                      : "bg-green-100 text-green-700"
                                      } font-nunito`}
                                  >
                                    {event.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
