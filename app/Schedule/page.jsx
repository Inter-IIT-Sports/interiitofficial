"use client";
import { useState } from "react";

export default function Schedules() {
  const schedules = {
    aquatics: [
      {
        sport: "100m Freestyle",
        stage: "Finals",
        date: "2025-09-24",
        time: "10:00 AM",
        venue: "IIT Madras Aquatics Center",
        host: "IIT Madras",
        teams: ["IIT Madras", "IIT Hyderabad"],
        status: "Scheduled"
      },
      {
        sport: "200m Butterfly",
        stage: "Semi Finals",
        date: "2025-09-25",
        time: "11:00 AM",
        venue: "IIT Madras Aquatics Center",
        host: "IIT Madras",
        teams: ["IIT Madras", "IIT Tirupati"],
        status: "Scheduled"
      },
    ],
    mainMeet: [
      {
        sport: "Basketball",
        stage: "Quarter Finals",
        date: "2025-09-24",
        time: "4:30 PM",
        venue: "IIT Hyderabad Main Court",
        host: "IIT Hyderabad",
        teams: ["IIT Madras", "IIT Hyderabad"],
        status: "Scheduled"
      },
      {
        sport: "Football",
        stage: "Group Match",
        date: "2025-09-24",
        time: "6:00 PM",
        venue: "IIT Tirupati Stadium",
        host: "IIT Tirupati",
        teams: ["IIT Madras", "IIT Tirupati"],
        status: "Scheduled"
      },
      {
        sport: "Volleyball",
        stage: "Semi Finals",
        date: "2025-09-25",
        time: "3:00 PM",
        venue: "IIT Madras Indoor Stadium",
        host: "IIT Madras",
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
  const filteredMatches = currentData.filter(m =>
    (selectedDate ? m.date === selectedDate : true) &&
    (selectedHost !== "All" ? m.host === selectedHost : true)
  );

  const hostColors = {
    "IIT Madras": "bg-blue-200 text-blue-800",
    "IIT Hyderabad": "bg-green-200 text-green-800",
    "IIT Tirupati": "bg-orange-200 text-orange-800",
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-4 pt-20">
        {/* Top Tabs + Filters Container */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          {/* Tabs */}
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
            {/* Date Filter */}
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
            {/* Host Filter */}
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

        {/* Event Cards */}
        <div className="space-y-4">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match, idx) => (
              <div key={idx} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{match.sport} | {match.stage}</h3>
                  <span className={`px-2 py-1 text-sm rounded ${hostColors[match.host]}`}>{match.host}</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <p>📅 {match.date} | ⏰ {match.time}</p>
                  <p>📍 {match.venue}</p>
                </div>
                <div className="font-medium text-gray-800 mb-1">
                  {match.teams[0]} 🆚 {match.teams[1]}
                </div>
                <div className="text-sm text-gray-500">{match.status}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No matches found for selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
