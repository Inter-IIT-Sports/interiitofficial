"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Head from "next/head";
import { waterPoloPools } from "../../lib/waterPoloPools";

export default function AquaticsSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(null);
  const [selectedMeet, setSelectedMeet] = useState("Aquatics");
  const [iitPoints, setIITPoints] = useState([]);
  const [waterPoloPoints, setWaterPoloPoints] = useState([]);

  // Fetch Aquatics schedule
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

  // Fetch IIT points
  useEffect(() => {
    const fetchIITPoints = async () => {
      try {
        const pointsSnapshot = await getDocs(collection(db, "pointsTable", "aquatics", "iitPoints"));
        const pointsData = pointsSnapshot.docs.map(doc => doc.data());
        setIITPoints(pointsData);
      } catch (error) {
        console.error("Error fetching IIT points:", error);
      }
    };
    fetchIITPoints();
  }, []);

  // Fetch Water Polo Pools
  useEffect(() => {
    const fetchWaterPolo = async () => {
      try {
        const poolsData = [];
        for (const poolKey of Object.keys(waterPoloPools)) {
          const poolRef = collection(db, "pointsTable", "waterpolo", poolKey);
          const snapshot = await getDocs(poolRef);
          const teams = snapshot.docs.map(doc => ({ name: doc.id, ...doc.data() }));
          poolsData.push({
            id: poolKey,
            name: `Pool ${poolKey}`,
            teams: teams
          });
        }
        setWaterPoloPoints(poolsData);
      } catch (error) {
        console.error("Error fetching water polo points:", error);
      }
    };
    fetchWaterPolo();
  }, []);

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
        <title>Schedule & Live Matches | 58th Inter IIT Sports Meet 2025 | 39th Aquatics Meet</title>
      </Head>

      <div className="pt-24 px-4 md:px-6 lg:px-8 pb-16 bg-gray-50 min-h-screen font-nunito text-gray-800">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 md:gap-0">
          <h1 className="text-3xl md:text-4xl font-bold text-center font-playfair text-[#800000] tracking-wide">
            Inter IIT 2025 Schedule
          </h1>
          <div className="flex gap-2 md:gap-3 bg-white rounded-full shadow-md px-2 py-1">
            {["Aquatics", "Main Meet"].map(meet => (
              <button
                key={meet}
                onClick={() => setSelectedMeet(meet)}
                className={`px-4 py-1 rounded-full font-medium text-sm md:text-base font-poppins transition-all duration-200
                  ${selectedMeet === meet ? "bg-[#800000] text-white shadow-lg" : "text-gray-600 hover:bg-gray-100"}`}
              >
                {meet}
              </button>
            ))}
          </div>
        </div>

        {selectedMeet === "Main Meet" ? (
          <p className="text-center text-gray-500 text-lg md:text-xl mt-20">
            Main Meet schedule is not available yet. Please check back later.
          </p>
        ) : (
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-52 md:w-56 bg-white rounded-xl shadow-lg p-4 max-h-[calc(100vh-8rem)] overflow-y-auto sticky top-24">
              <h3 className="text-gray-700 font-semibold mb-4 text-lg font-poppins tracking-wide">Aquatic Days</h3>
              <div className="flex flex-col gap-2">
                {schedule.map(day => {
                  const isActive = activeDay === day.id;
                  return (
                    <div
                      key={day.id}
                      onClick={() => setActiveDay(day.id)}
                      className={`flex items-center cursor-pointer px-3 py-2 rounded-lg transition-all duration-300
                        ${isActive ? "bg-[#800000]/10 border-l-4 border-[#800000] shadow-sm" : "hover:bg-gray-100"}`}
                    >
                      <span className={`w-3 h-3 rounded-full mr-2 ${isActive ? "bg-[#800000]" : "bg-gray-300"}`}></span>
                      <div className="flex flex-col">
                        <span className={`${isActive ? "text-[#800000] font-semibold" : "text-gray-800"} text-sm font-poppins`}>
                          Day {day.id.replace("day", "")}
                        </span>
                        <span className="text-xs text-gray-500 font-nunito">{day.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Schedule + Right Panel */}
            <div className="flex-1 flex gap-6 relative">
              {/* Vertical Divider */}
              <div className="absolute left-[calc(100%-24rem)] top-0 h-full border-l border-gray-200 hidden md:block"></div>

              {/* Schedule */}
              <div className="flex-1 flex flex-col gap-6">
                {displayedDay && ["forenoon", "afternoon"].map(sessionKey => (
                  <div key={sessionKey} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                    <h3 className="text-xl md:text-2xl font-semibold text-[#800000] mb-4 font-poppins capitalize border-b border-gray-200 pb-2 tracking-wide">
                      {sessionKey} Session
                    </h3>
                    {Object.keys(displayedDay.sessions[sessionKey]).length === 0 ? (
                      <p className="text-gray-500 text-sm md:text-base mb-4">No events scheduled.</p>
                    ) : (
                      Object.keys(displayedDay.sessions[sessionKey])
                        .sort()
                        .map(sport => {
                          const events = displayedDay.sessions[sessionKey][sport].slice();
                          events.sort((a, b) => (a.eventNo || a.matchNo || 0) - (b.eventNo || b.matchNo || 0));
                          return (
                            <div key={sport} className="mb-6">
                              <h4 className="text-sky-600 font-semibold text-lg md:text-xl mb-2 font-poppins tracking-wide">{sport}</h4>
                              <div className="flex flex-col gap-3">
                                {events.map(event => (
                                  <div key={event.eventNo || event.matchNo} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                                    <div className="flex flex-col gap-1">
                                      <span className="font-bold text-gray-800 text-sm md:text-base">{event.event || event.teams.join(" 🆚 ")}</span>
                                      <p className="text-gray-600 text-xs md:text-sm">{event.type} | Venue: {event.venue}</p>
                                      {(event.eventNo || event.matchNo) && (
                                        <span className="text-gray-500 text-xs md:text-sm">{event.eventNo ? `Event ${event.eventNo}` : `Match ${event.matchNo}`}</span>
                                      )}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold
                                      ${event.status === "Live" ? "bg-red-100 text-red-700 animate-pulse" : "bg-green-100 text-green-700"}`}>
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

              {/* Right Panels */}
              <div className="w-96 flex-shrink-0 flex flex-col gap-6">
                {/* IIT Points */}
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#800000] mb-4 font-poppins tracking-wide">Overall IIT Points</h3>
                  <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full border border-gray-200 text-left divide-y divide-gray-200 text-sm">
                      <thead className="bg-[#800000]/10 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 font-medium text-gray-700">Rank</th>
                          <th className="px-3 py-2 font-medium text-gray-700">IIT</th>
                          <th className="px-3 py-2 font-medium text-gray-700">G</th>
                          <th className="px-3 py-2 font-medium text-gray-700">S</th>
                          <th className="px-3 py-2 font-medium text-gray-700">B</th>
                          <th className="px-3 py-2 font-medium text-gray-700">F</th>
                          <th className="px-3 py-2 font-medium text-gray-700">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {iitPoints.map((iit, index) => (
                          <tr key={iit.name} className="hover:bg-gray-50">
                            <td className="px-3 py-2">{index + 1}</td>
                            <td className="px-3 py-2 font-medium">{iit.name}</td>
                            <td className="px-3 py-2">{iit.g}</td>
                            <td className="px-3 py-2">{iit.s}</td>
                            <td className="px-3 py-2">{iit.b}</td>
                            <td className="px-3 py-2">{iit.f}</td>
                            <td className="px-3 py-2 font-semibold">{iit.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Water Polo Pools */}
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#800000] mb-4 font-poppins tracking-wide">Water Polo Pools</h3>
                  {waterPoloPoints.map(pool => (
                    <div key={pool.id} className="mb-6">
                      <h4 className="font-semibold text-sky-600 mb-3 font-poppins tracking-wide">{pool.name}</h4>
                      <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full border border-gray-200 text-left divide-y divide-gray-200 text-sm">
                          <thead className="bg-[#800000]/10 sticky top-0">
                            <tr>
                              <th className="px-3 py-2 font-medium text-gray-700">Team</th>
                              <th className="px-3 py-2 font-medium text-gray-700">P</th>
                              <th className="px-3 py-2 font-medium text-gray-700">W</th>
                              <th className="px-3 py-2 font-medium text-gray-700">L</th>
                              <th className="px-3 py-2 font-medium text-gray-700">T</th>
                              <th className="px-3 py-2 font-medium text-gray-700">Points</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {pool.teams.map(team => (
                              <tr key={team.name} className="hover:bg-gray-50">
                                <td className="px-3 py-2 font-medium text-gray-800">{team.name}</td>
                                <td className="px-3 py-2">{team.P || 0}</td>
                                <td className="px-3 py-2">{team.W || 0}</td>
                                <td className="px-3 py-2">{team.L || 0}</td>
                                <td className="px-3 py-2">{team.T || 0}</td>
                                <td className="px-3 py-2 font-semibold">{team.points || 0}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
