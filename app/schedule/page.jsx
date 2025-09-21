"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Head from "next/head";

export default function AquaticsSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "schedules/aquatics/days"));
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
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500 text-lg md:text-xl">Loading schedule...</p>;

  const displayedDay = activeDay
    ? schedule.find(day => day.id === activeDay)
    : [...schedule].reverse().find(day =>
      ["forenoon", "afternoon"].some(session =>
        Object.keys(day.sessions[session] || {}).length > 0
      )
    );

  const liveMatch = schedule
    .flatMap(day =>
      ["forenoon", "afternoon"].flatMap(s =>
        Object.values(day.sessions[s] || {}).flat()
      )
    )
    .find(m => m.status === "Live");

  return (
    <>
      <Head>
        <title>Schedule & Live Matches | 58th Inter IIT Sports Meet 2025</title>
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
      <div className="text-[#800000] bg-gray-50 pt-28 px-4 md:px-12 lg:px-20 pb-20" style={{ fontFamily: '"Poppins", sans-serif' }}>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
          Aquatics Schedule | Inter IIT 2025
        </h1>

        {/* Live Match Banner */}
        {liveMatch && (
          <div className="mb-10 p-4 md:p-5 rounded-xl bg-red-50 border border-red-300 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center animate-pulse gap-3 md:gap-0">
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-red-600">
                {liveMatch.event || liveMatch.teams.join(" 🆚 ")}
              </h2>
              <p className="text-gray-700 text-sm md:text-base mt-1">
                {liveMatch.type} | Venue: {liveMatch.venue}
              </p>
            </div>
            <span className="px-3 py-1 text-xs md:text-sm bg-red-600 text-white rounded-full font-semibold self-start md:self-center">
              LIVE
            </span>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar for Days */}
          <div className="flex-shrink-0 w-full md:w-48 bg-white rounded-xl shadow-md p-4 max-h-[calc(100vh-10rem)] overflow-y-auto md:mr-6">
            <h3 className="font-semibold text-gray-700 mb-4 text-center md:text-left text-base md:text-lg">Aquatic Days</h3>
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible px-1">
              {schedule.map((day) => {
                const isActive = activeDay === day.id;
                return (
                  <div
                    key={day.id}
                    onClick={() => setActiveDay(day.id)}
                    className={`flex-shrink-0 cursor-pointer flex items-center md:flex-row md:items-center px-3 py-2 rounded transition-all duration-300
              ${isActive
                        ? "border-b-2 md:border-l-4 border-[#800000] bg-[#800000]/5 md:bg-transparent"
                        : "hover:bg-gray-100 md:hover:bg-gray-100"
                      }
            `}
                  >
                    {/* Dot for active indicator */}
                    <span
                      className={`w-3 h-3 rounded-full mr-2 transition-colors duration-300
                ${isActive ? "bg-[#800000]" : "bg-gray-300"}
              `}
                    ></span>

                    {/* Day text */}
                    <div className="flex flex-col">
                      <span className={`text-sm md:text-base font-medium ${isActive ? "text-[#800000] font-semibold" : "text-black font-medium"}`}>
                        Day {day.id.replace("day", "")}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500">{day.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>



          {/* Schedule Content */}
          <div className="flex-1 flex flex-col gap-10">
            {displayedDay &&
              ["forenoon", "afternoon"].map(sessionKey => (
                <div key={sessionKey}>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#800000] mb-6 capitalize">
                    {sessionKey} Session
                  </h3>

                  {Object.keys(displayedDay.sessions[sessionKey]).length === 0 ? (
                    <p className="text-gray-500 text-sm md:text-base mb-8">No events scheduled.</p>
                  ) : (
                    Object.keys(displayedDay.sessions[sessionKey])
                      .sort()
                      .map(sport => {
                        const events = displayedDay.sessions[sessionKey][sport].slice();
                        events.sort((a, b) => (a.eventNo || a.matchNo || 0) - (b.eventNo || b.matchNo || 0));

                        return (
                          <div key={sport} className="mb-8 md:mb-10">
                            <h4 className="font-semibold text-sky-600 text-lg md:text-xl mb-4">{sport}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {events.map(event => (
                                <div
                                  key={event.eventNo || event.matchNo}
                                  className="bg-white p-3 md:p-4 rounded-xl shadow hover:shadow-lg transition border-l-4 border-gray-600"
                                >
                                  <p className="font-bold text-gray-800 text-sm md:text-base mb-1">
                                    {event.event || event.teams.join(" 🆚 ")}
                                    {(event.eventNo || event.matchNo) && (
                                      <span className="ml-2 text-xs md:text-sm text-gray-500 font-medium">
                                        {event.eventNo ? `Event ${event.eventNo}` : ""}
                                        {event.matchNo ? `Match ${event.matchNo}` : ""}
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-gray-600 text-xs md:text-sm mb-1">{event.type}</p>
                                  <p className="text-gray-600 text-xs md:text-sm mb-2">Venue: {event.venue}</p>
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold ${event.status === "Live"
                                      ? "bg-red-100 text-red-700 animate-pulse"
                                      : "bg-green-100 text-green-700"
                                      }`}
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
      </div>
    </>

  );
}
