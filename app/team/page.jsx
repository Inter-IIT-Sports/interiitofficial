"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";

// IIT list (CSV key + display name)
const allIITs = [
  { csvKey: "(BHU) Varanasi", name: "IIT (BHU) Varanasi" },
  { csvKey: "Bhilai", name: "IIT Bhilai" },
  { csvKey: "Bhubaneswar", name: "IIT Bhubaneswar" },
  { csvKey: "Bombay", name: "IIT Bombay" },
  { csvKey: "Delhi", name: "IIT Delhi" },
  { csvKey: "Dhanbad", name: "IIT (ISM) Dhanbad" },
  { csvKey: "Dharwad", name: "IIT Dharwad" },
  { csvKey: "Gandhinagar", name: "IIT Gandhinagar" },
  { csvKey: "Goa", name: "IIT Goa" },
  { csvKey: "Guwahati", name: "IIT Guwahati" },
  { csvKey: "Hyderabad", name: "IIT Hyderabad" },
  { csvKey: "Indore", name: "IIT Indore" },
  { csvKey: "Jammu", name: "IIT Jammu" },
  { csvKey: "Jodhpur", name: "IIT Jodhpur" },
  { csvKey: "Kanpur", name: "IIT Kanpur" },
  { csvKey: "Kharagpur", name: "IIT Kharagpur" },
  { csvKey: "Madras", name: "IIT Madras" },
  { csvKey: "Mandi", name: "IIT Mandi" },
  { csvKey: "Palakkad", name: "IIT Palakkad" },
  { csvKey: "Patna", name: "IIT Patna" },
  { csvKey: "Roorkee", name: "IIT Roorkee" },
  { csvKey: "Ropar", name: "IIT Ropar" },
  { csvKey: "Tirupati", name: "IIT Tirupati" },
];

// Sports list
const sportsMaster = [
  { id: 0, name: "Athletics", icon: "🏃" },
  { id: 1, name: "Badminton", icon: "🏸" },
  { id: 2, name: "Basketball", icon: "🏀" },
  { id: 3, name: "Chess", icon: "♟️" },
  { id: 4, name: "Cricket", icon: "🏏" },
  { id: 5, name: "Football", icon: "⚽" },
  { id: 6, name: "Hockey", icon: "🏑" },
  { id: 7, name: "Squash", icon: "🎾" },
  { id: 8, name: "Table Tennis", icon: "🏓" },
  { id: 9, name: "Tennis", icon: "🎾" },
  { id: 10, name: "Volleyball", icon: "🏐" },
  { id: 11, name: "Weightlifting", icon: "🏋️" },
];

export default function TeamPage() {
  const [selectedIIT, setSelectedIIT] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [sportFilter, setSportFilter] = useState("All");
  const [teamsData, setTeamsData] = useState({});
  const [loading, setLoading] = useState(true);

  // Load CSV on mount
  useEffect(() => {
    async function loadCSV() {
      setLoading(true);
      const response = await fetch("/master_interiit_with_new_entries.csv");
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const map = {};
          results.data.forEach((row) => {
            const inst = (row.institute || "").trim();
            const sport = (row.sport_name || "").trim();
            const gender = (row.gender || "").trim();
            const name = (row.player_name || "").trim();
            if (!inst || !sport || !gender || !name) return;

            if (!map[inst]) map[inst] = {};
            if (!map[inst][sport]) map[inst][sport] = { M: [], F: [] };

            map[inst][sport][gender].push({ name });
          });

          setTeamsData(map);
          setLoading(false);
        },
      });
    }
    loadCSV();
  }, []);

  const selectedIITConfig = allIITs.find((i) => i.name === selectedIIT);
  const csvKey = selectedIITConfig?.csvKey;
  const instituteTeams = csvKey ? teamsData[csvKey] || {} : {};

  // 🔥 Only list sports IIT is participating in
  const availableSports = [
    { id: "All", name: "All Sports" },
    ...sportsMaster.filter((sport) => {
      const s = instituteTeams[sport.name];
      return s && (s.M.length > 0 || s.F.length > 0);
    }),
  ];

  // 🔥 Participants-first ordering
  const sportHasPlayers = (sportName) => {
    const s = instituteTeams[sportName];
    if (!s) return false;
    if (genderFilter === "Men") return s.M.length > 0;
    if (genderFilter === "Women") return s.F.length > 0;
    return s.M.length > 0 || s.F.length > 0;
  };

  let orderedSports = [
    ...availableSports.filter(
      (s) => s.id !== "All" && sportHasPlayers(s.name)
    ),
    ...sportsMaster.filter(
      (s) => !sportHasPlayers(s.name)
    ),
  ];

  if (sportFilter !== "All") {
    orderedSports = orderedSports.filter(
      (s) => String(s.id) === String(sportFilter)
    );
  }

  const filtersDisabled = !selectedIIT;

  return (
    <section className="w-full min-h-screen bg-gray-50 font-sans">

      {/* HEADER */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Participating <span className="text-red-700">Teams</span>
          </h1>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto flex">

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block w-1/5 bg-white border-r overflow-y-auto">
          <div className="p-4 space-y-1">
            {allIITs.map((iit) => (
              <button
                key={iit.csvKey}
                onClick={() => {
                  setSelectedIIT(iit.name);
                  setSportFilter("All");
                  setGenderFilter("All");
                }}
                className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${
                  selectedIIT === iit.name
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {iit.name}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="w-full p-4 md:p-6">

          {/* MOBILE FILTERS */}
          <div className="lg:hidden space-y-4 mb-6">

            {/* IIT DROPDOWN */}
            <div className="relative w-full max-w-full">
              <select
                value={selectedIIT}
                onChange={(e) => {
                  setSelectedIIT(e.target.value);
                  setSportFilter("All");
                  setGenderFilter("All");
                }}
                className="appearance-none border border-gray-300 bg-white rounded-full pl-4 pr-10 py-2 shadow-sm text-sm w-full max-w-full"
              >
                <option value="">Select IIT</option>
                {allIITs.map((iit) => (
                  <option key={iit.csvKey} value={iit.name}>
                    {iit.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                ▼
              </span>
            </div>

            {/* SPORTS DROPDOWN */}
            <div className="relative w-full max-w-full">
              <select
                value={sportFilter}
                disabled={filtersDisabled}
                onChange={(e) => setSportFilter(e.target.value)}
                className={`appearance-none border border-gray-300 bg-white rounded-full pl-4 pr-10 py-2 text-sm shadow-sm w-full max-w-full ${
                  filtersDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {availableSports.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                ▼
              </span>
            </div>

            {/* GENDER FILTER */}
            <div className="inline-flex bg-white border rounded-full shadow-sm overflow-hidden w-full">
              {["All", "Men", "Women"].map((g) => (
                <button
                  key={g}
                  disabled={filtersDisabled}
                  onClick={() => setGenderFilter(g)}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition ${
                    genderFilter === g
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {g === "Men" ? "Men's" : g === "Women" ? "Women's" : "All"}
                </button>
              ))}
            </div>
          </div>

          {/* DESKTOP FILTERS */}
          {selectedIIT && (
            <div className="hidden lg:flex items-center gap-4 mb-6">
              {/* Sport */}
              <div className="relative w-60">
                <select
                  disabled={filtersDisabled}
                  value={sportFilter}
                  onChange={(e) => setSportFilter(e.target.value)}
                  className="appearance-none border border-gray-300 bg-white rounded-full pl-4 pr-10 py-2 text-sm shadow-sm w-full"
                >
                  {availableSports.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
              </div>

              {/* Gender */}
              <div className="inline-flex bg-white border rounded-full shadow-sm overflow-hidden">
                {["All", "Men", "Women"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenderFilter(g)}
                    className={`px-4 py-2 text-sm font-medium transition ${
                      genderFilter === g
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {g === "Men" ? "Men's" : g === "Women" ? "Women's" : "All"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <p className="text-gray-500 text-center mt-6">Loading…</p>
          )}

          {!loading && !selectedIIT && (
            <p className="text-gray-500 text-center mt-6">
              Select an IIT to view teams.
            </p>
          )}

          {/* SPORTS GRID */}
          {selectedIIT && !loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 mt-4">
              {orderedSports.map((sport) => {
                const s = instituteTeams[sport.name] || { M: [], F: [] };
                const men = s.M;
                const women = s.F;

                const showMen =
                  genderFilter === "All" || genderFilter === "Men";
                const showWomen =
                  genderFilter === "All" || genderFilter === "Women";

                const hasMen = men.length > 0;
                const hasWomen = women.length > 0;

                return (
                  <div
                    key={sport.id}
                    className="bg-white rounded-xl shadow-sm border p-6"
                  >
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <span className="text-2xl">{sport.icon}</span>
                      {sport.name}
                    </h3>

                    {!hasMen && !hasWomen ? (
                      <p className="text-gray-400 mt-4 italic">
                        Roster not added yet.
                      </p>
                    ) : (
                      <div className="mt-4 space-y-4">

                        {showMen && hasMen && (
                          <div>
                            <h4 className="text-red-700 font-semibold text-sm mb-1">
                              Men's Team
                            </h4>
                            <ul className="ml-4 list-disc text-gray-800">
                              {men.map((p, i) => (
                                <li key={i}>{p.name}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {showWomen && hasWomen && (
                          <div>
                            <h4 className="text-red-700 font-semibold text-sm mb-1">
                              Women's Team
                            </h4>
                            <ul className="ml-4 list-disc text-gray-800">
                              {women.map((p, i) => (
                                <li key={i}>{p.name}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
