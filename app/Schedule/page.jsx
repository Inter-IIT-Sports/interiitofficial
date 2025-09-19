"use client";
import { useState } from "react";

export default function Schedules() {
  const schedules = {
    aquatics: [
      {
        sport: "100m Freestyle",
        stage: "Finals",
        date: "2025-09-30",
        time: "10:00 AM",
        venue: "IIT Madras Aquatics Center",
        host: "IIT Madras",
        teams: ["IIT Madras", "IIT Hyderabad"],
        status: "Scheduled"
      },
      {
        sport: "200m Butterfly",
        stage: "Semi Finals",
        date: "2025-10-01",
        time: "11:00 AM",
        venue: "IIT Madras Aquatics Center",
        host: "IIT Madras",
        teams: ["IIT Madras", "IIT Tirupati"],
        status: "Scheduled"
      },
      {
        sport: "400m Medley Relay",
        stage: "Heats",
        date: "2025-10-02",
        time: "09:00 AM",
        venue: "IIT Madras Aquatics Center",
        host: "IIT Madras",
        teams: ["IIT Hyderabad", "IIT Tirupati"],
        status: "Live"
      },
      {
        sport: "200m IM",
        stage: "Finals",
        date: "2025-10-03",
        time: "01:00 PM",
        venue: "IIT Madras Aquatics Center",
        host: "IIT Madras",
        teams: ["IIT Madras", "IIT Hyderabad"],
        status: "Scheduled"
      },
      {
        sport: "100m Butterfly",
        stage: "Heats",
        date: "2025-10-04",
        time: "12:00 PM",
        venue: "IIT Madras Aquatics Center",
        host: "IIT Madras",
        teams: ["IIT Tirupati", "IIT Hyderabad"],
        status: "Scheduled"
      },
      {
        sport: "4x100m Freestyle Relay",
        stage: "Finals",
        date: "2025-10-05",
        time: "03:00 PM",
        venue: "IIT Madras Aquatics Center",
        host: "IIT Madras",
        teams: ["IIT Madras", "IIT Tirupati"],
        status: "Scheduled"
      }
    ],
    mainMeet: [
      {
        sport: "Basketball",
        stage: "Quarter Finals",
        date: "2025-12-17",
        time: "4:30 PM",
        venue: "IIT Hyderabad Main Court",
        host: "IIT Hyderabad",
        teams: ["IIT Madras", "IIT Hyderabad"],
        status: "Scheduled"
      },
      {
        sport: "Football",
        stage: "Group Match",
        date: "2025-12-18",
        time: "6:00 PM",
        venue: "IIT Tirupati Stadium",
        host: "IIT Tirupati",
        teams: ["IIT Madras", "IIT Tirupati"],
        status: "Live"
      },
      {
        sport: "Volleyball",
        stage: "Semi Finals",
        date: "2025-12-19",
        time: "3:00 PM",
        venue: "IIT Madras Indoor Stadium",
        host: "IIT Madras",
        teams: ["IIT Hyderabad", "IIT Tirupati"],
        status: "Scheduled"
      },
      {
        sport: "Table Tennis",
        stage: "Finals",
        date: "2025-12-20",
        time: "5:30 PM",
        venue: "IIT Madras Sports Complex",
        host: "IIT Madras",
        teams: ["IIT Madras", "IIT Hyderabad"],
        status: "Scheduled"
      },
      {
        sport: "Cricket",
        stage: "Heats",
        date: "2025-12-21",
        time: "9:00 AM",
        venue: "IIT Tirupati Grounds",
        host: "IIT Tirupati",
        teams: ["IIT Madras", "IIT Tirupati"],
        status: "Scheduled"
      },
      {
        sport: "Hockey",
        stage: "Finals",
        date: "2025-12-22",
        time: "7:00 PM",
        venue: "IIT Hyderabad Hockey Field",
        host: "IIT Hyderabad",
        teams: ["IIT Hyderabad", "IIT Tirupati"],
        status: "Scheduled"
      }
    ]
  };

  const [activeTab, setActiveTab] = useState("mainMeet");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHost, setSelectedHost] = useState("All");

  const currentData = schedules[activeTab];
  const dates = [...new Set(currentData.map(m => m.date))];
  const hosts = ["All", ...new Set(currentData.map(m => m.host))];

  let filteredMatches = currentData.filter(m =>
    (selectedDate ? m.date === selectedDate : true) &&
    (selectedHost !== "All" ? m.host === selectedHost : true)
  );

  const timeTo24 = (t) => {
  const [time, modifier] = t.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
  };


  filteredMatches = filteredMatches
    .slice()
    .sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return timeTo24(a.time) - timeTo24(b.time);
    });

  const hostColors = {
    "IIT Madras": "bg-blue-200 text-blue-800",
    "IIT Hyderabad": "bg-green-200 text-green-800",
    "IIT Tirupati": "bg-orange-200 text-orange-800",
  };

  // Find the first live match for the live panel
  const liveMatch = filteredMatches.find(m => m.status === "Live");

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-4 pt-20">
        {/* Top Tabs + Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex mb-4 border-b-2">
            <button
              className={`px-4 py-2 ${activeTab === "aquatics" ? "border-b-4 border-blue-500 font-semibold" : ""}`}
              onClick={() => { setActiveTab("aquatics"); setSelectedDate(""); setSelectedHost("All"); }}
            >
              Aquatics
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "mainMeet" ? "border-b-4 border-blue-500 font-semibold" : ""}`}
              onClick={() => { setActiveTab("mainMeet"); setSelectedDate(""); setSelectedHost("All"); }}
            >
              Main Meet
            </button>
          </div>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            {/* Date filter */}
            <div className="flex overflow-x-auto space-x-2 mb-2 sm:mb-0">
              {dates.map(date => (
                <button
                  key={date}
                  className={`px-3 py-1 rounded-full border ${
                    selectedDate === date ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
                </button>
              ))}
            </div>
            {/* Host filter */}
            <div className="flex space-x-2">
              {hosts.map(host => (
                <button
                  key={host}
                  className={`px-3 py-1 rounded-full border ${
                    selectedHost === host ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => setSelectedHost(host)}
                >
                  {host}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Matches grid: sorted with upcoming on top */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side: match cards */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-6 shadow-md hover:shadow-lg transition bg-white w-full"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-xl">
                        {match.sport} | {match.stage}
                      </h3>
                      <span className={`px-2 py-1 text-sm rounded ${hostColors[match.host]}`}>
                        {match.host}
                      </span>
                    </div>
                    <div className="text-base text-gray-600 mb-2">
                      <p>📅 {match.date} | ⏰ {match.time}</p>
                      <p>📍 {match.venue}</p>
                    </div>
                    {/* Show only teams here */}
                    <div className="font-medium text-gray-800 mb-1 text-base">
                      {match.teams[0]} 🆚 {match.teams[1]}
                    </div>
                    <div className="text-sm text-gray-500">
                      {match.status}
                      {match.status === "Live" && (
                        <span className="ml-2 text-red-600 font-bold flex items-center gap-1">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                          </span>
                          LIVE
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No matches found for selected filters.</p>
              )}
            </div>
          </div>
          {/* Right side: Live match panel */}
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                <div className="flex items-center gap-3 mb-5">
                  <span className="relative inline-flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
                  </span>
                  <span className="text-lg font-semibold text-red-600">Live Match</span>
                </div>
                {liveMatch ? (
                  <>
                    <div className="font-bold text-2xl mb-2">{liveMatch.sport}</div>
                    <div className="text-base text-gray-700 mb-2">{liveMatch.stage}</div>
                    <div className="text-base text-gray-700 mb-2">
                      {liveMatch.teams[0]} <span className="text-lg font-extrabold text-red-600">🆚</span> {liveMatch.teams[1]}
                    </div>
                    <div className="text-base text-gray-700 mb-2">Venue: {liveMatch.venue}</div>
                    <div className="flex justify-between text-base text-gray-700 mb-2">
                      <div>Host: <span className={hostColors[liveMatch.host]}>{liveMatch.host}</span></div>
                      <div>{liveMatch.date} | {liveMatch.time}</div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-lg bg-gray-50 p-4 text-gray-600 font-medium text-center">
                    No live matches at the moment.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
