"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";

// ---------------------------------------------------------
// 1. ASSETS & CONFIG
// ---------------------------------------------------------

const sportImages = {
  // 🏸 BADMINTON — CLOSE-UP shuttlecock + racket (bright white shuttle)
  "Badminton":
    "https://images.unsplash.com/photo-1708312604073-90639de903fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhZG1pbnRvbiUyMHJhY2tldHxlbnwwfHwwfHx8MA%3D%3D",

  // 🏑 HOCKEY — FIELD hockey stick + ball on green turf (very clear)
  "Hockey":
    "https://plus.unsplash.com/premium_photo-1719318342626-77aa2788b830?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3Jhc3MlMjBob2NrZXl8ZW58MHx8MHx8fDA%3D",

  // 🏓 TABLE TENNIS — red paddle + white ball on BLUE table (high contrast)
  "Table Tennis":
    "https://images.unsplash.com/photo-1646978567314-32cfd5a8854e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRhYmxlJTIwdGVubmlzfGVufDB8fDB8fHww",

  // ATHLETICS
  "Athletics":
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80",

  // BASKETBALL
  "Basketball":
    "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=1600&q=80",

  // CHESS
  "Chess":
    "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=1600&q=80",

  // CRICKET
  "Cricket":
    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1600&q=80",

  // FOOTBALL
  "Football":
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1600&q=80",

  // SQUASH
  "Squash":
    "https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?auto=format&fit=crop&w=1600&q=80",

  // TENNIS
  "Tennis":
    "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1600&q=80",

  // VOLLEYBALL
  "Volleyball":
    "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1600&q=80",

  // WEIGHTLIFTING
  "Weightlifting":
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80",

  // FALLBACK
  "default":
    "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1600&q=80",
};



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

  useEffect(() => {
    async function loadCSV() {
      setLoading(true);
      try {
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
      } catch (error) {
        console.error("Error loading CSV:", error);
        setLoading(false);
      }
    }
    loadCSV();
  }, []);

  const selectedIITConfig = allIITs.find((i) => i.name === selectedIIT);
  const csvKey = selectedIITConfig?.csvKey;
  const instituteTeams = csvKey ? teamsData[csvKey] || {} : {};

  const availableSports = [
    { id: "All", name: "All Sports" },
    ...sportsMaster.filter((sport) => {
      const s = instituteTeams[sport.name];
      return s && (s.M.length > 0 || s.F.length > 0);
    }),
  ];

  const getFilteredRoster = (sportName) => {
    const s = instituteTeams[sportName] || { M: [], F: [] };
    const men = genderFilter === "All" || genderFilter === "Men" ? s.M : [];
    const women = genderFilter === "All" || genderFilter === "Women" ? s.F : [];
    return { men, women, hasData: men.length > 0 || women.length > 0 };
  };

  const orderedSports = sportsMaster.filter((s) => {
    if (sportFilter !== "All" && String(s.id) !== String(sportFilter))
      return false;
    const { hasData } = getFilteredRoster(s.name);
    return hasData;
  });

  const filtersDisabled = !selectedIIT;

  return (
    <section className="w-full min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* HEADER */}
      <div className="bg-white border-b sticky top-0 z-30 shadow-sm/50 backdrop-blur-md bg-white/90">
        <div className="max-w-screen-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Participating <span className="text-red-600">Teams</span>
          </h1>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        
        {/* SIDEBAR */}
        <aside className="hidden lg:block w-72 bg-white border-r h-[calc(100vh-80px)] sticky top-[73px] overflow-y-auto custom-scrollbar">
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
              Institutes
            </h2>
            <div className="space-y-1">
              {allIITs.map((iit) => (
                <button
                  key={iit.csvKey}
                  onClick={() => {
                    setSelectedIIT(iit.name);
                    setSportFilter("All");
                    setGenderFilter("All");
                  }}
                  // ✨ ANIMATION: Added hover:translate-x-2 and transition classes
                  className={`w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-200 ease-in-out border-l-4 ${
                    selectedIIT === iit.name
                      ? "bg-red-50 text-red-700 border-red-600 shadow-sm translate-x-2" // Active state also indented slightly
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-2 hover:border-gray-300"
                  }`}
                >
                  {iit.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          
          {/* MOBILE FILTERS */}
          <div className="lg:hidden space-y-4 mb-8 bg-white p-4 rounded-xl border shadow-sm">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Select Institute</label>
              <div className="relative">
                <select
                  value={selectedIIT}
                  onChange={(e) => {
                    setSelectedIIT(e.target.value);
                    setSportFilter("All");
                    setGenderFilter("All");
                  }}
                  className="appearance-none w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 pr-8"
                >
                  <option value="">Choose an IIT...</option>
                  {allIITs.map((iit) => (
                    <option key={iit.csvKey} value={iit.name}>{iit.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="relative w-1/2">
                 <select
                  value={sportFilter}
                  disabled={filtersDisabled}
                  onChange={(e) => setSportFilter(e.target.value)}
                  className="appearance-none w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 pr-8 disabled:opacity-50"
                >
                  {availableSports.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="w-1/2 flex bg-gray-100 p-1 rounded-lg">
                {["All", "Men", "Women"].map((g) => (
                  <button
                    key={g}
                    disabled={filtersDisabled}
                    onClick={() => setGenderFilter(g)}
                    className={`flex-1 text-xs font-medium rounded-md py-1.5 transition-all ${
                      genderFilter === g ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {g === "All" ? "All" : g === "Men" ? "M" : "F"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DESKTOP FILTERS */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <select
                  disabled={filtersDisabled}
                  value={sportFilter}
                  onChange={(e) => setSportFilter(e.target.value)}
                  className="appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 pr-8 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {availableSports.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <div className="inline-flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                {["All", "Men", "Women"].map((g) => (
                  <button
                    key={g}
                    disabled={filtersDisabled}
                    onClick={() => setGenderFilter(g)}
                    className={`px-5 py-2 text-sm font-medium rounded-md transition-all ${
                      genderFilter === g
                        ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                    } ${filtersDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {g === "Men" ? "Men's" : g === "Women" ? "Women's" : "All"}
                  </button>
                ))}
              </div>
            </div>
            
            {selectedIIT && (
                <div className="text-sm text-gray-500 font-medium">
                    Showing <span className="text-gray-900">{orderedSports.length}</span> sports
                </div>
            )}
          </div>

          {loading && (
             <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-4"></div>
                <p>Loading rosters...</p>
             </div>
          )}

          {!loading && !selectedIIT && (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center p-8 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <span className="text-4xl mb-4">🏛️</span>
              <h3 className="text-lg font-semibold text-gray-900">No Institute Selected</h3>
              <p className="text-gray-500 mt-2 max-w-sm">Please select an IIT from the sidebar to view their participating teams.</p>
            </div>
          )}

          {!loading && selectedIIT && orderedSports.length === 0 && (
             <div className="text-center py-20 text-gray-500">
                <p>No teams found matching these filters.</p>
             </div>
          )}

          {/* MASONRY GRID */}
          {selectedIIT && !loading && (
            <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6 pb-20">
              {orderedSports.map((sport) => {
                const { men, women } = getFilteredRoster(sport.name);
                const bgImage = sportImages[sport.name] || sportImages["default"];
                
                return (
                  <div
                    key={sport.id}
                    className="break-inside-avoid bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* HERO HEADER */}
                    <div className="relative h-36 overflow-hidden bg-gray-100">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url('${bgImage}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-5 w-full">
                         <h3 className="font-bold text-white text-xl flex items-center gap-2">
                            <span className="text-2xl drop-shadow-md">{sport.icon}</span>
                            <span className="tracking-wide drop-shadow-md">{sport.name}</span>
                         </h3>
                      </div>
                    </div>

                    {/* BODY */}
                    <div className="p-5 space-y-6">
                      {men.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500 ring-2 ring-blue-100"></span>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Men's Team</h4>
                          </div>
                          <ul className="space-y-1">
                            {men.map((p, i) => (
                              <li key={i} className="text-sm text-gray-700 font-medium pl-4 border-l-2 border-gray-100 hover:border-blue-500 hover:bg-gray-50 transition-all rounded-r py-1.5 cursor-default">
                                {p.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {women.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                             <span className="w-2 h-2 rounded-full bg-pink-500 ring-2 ring-pink-100"></span>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Women's Team</h4>
                          </div>
                          <ul className="space-y-1">
                            {women.map((p, i) => (
                              <li key={i} className="text-sm text-gray-700 font-medium pl-4 border-l-2 border-gray-100 hover:border-pink-500 hover:bg-gray-50 transition-all rounded-r py-1.5 cursor-default">
                                {p.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
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