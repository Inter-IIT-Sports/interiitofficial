"use client";

import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; // Adjust the path if needed

export default function LiveAdminPanel() {
  const [eventNo, setEventNo] = useState("");
  const [eventData, setEventData] = useState(null);
  const [winner, setWinner] = useState("");
  const [notes, setNotes] = useState("");
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch event by eventNo / matchNo
  const fetchEvent = async () => {
    if (!eventNo) return alert("Enter Event No / Match No");
    setLoading(true);

    try {
      const dayIds = ["day1", "day2", "day3", "day4", "day5"]; // adjust according to your DB
      let foundEvent = null;

      for (const dayId of dayIds) {
        const dayRef = doc(db, "schedules", "aquatics", "days", dayId);
        const daySnap = await getDoc(dayRef);
        if (!daySnap.exists()) continue;

        const dayData = daySnap.data();
        ["forenoon", "afternoon"].forEach(session => {
          const sessionData = dayData.sessions[session] || {};
          Object.keys(sessionData).forEach(sport => {
            const eventsArray = sessionData[sport] || [];
            eventsArray.forEach(event => {
              if ((event.eventNo == eventNo || event.matchNo == eventNo) && event.status !== "completed") {
                foundEvent = {
                  ...event,
                  day: dayId,
                  session,
                  sport
                };
              }
            });
          });
        });

        if (foundEvent) break;
      }

      if (foundEvent) {
        setEventData(foundEvent);
        setWinner(foundEvent.winner || "");
        setNotes(foundEvent.notes || "");
        setScores(foundEvent.scores || {});
      } else {
        alert("Event not found or already completed!");
        setEventData(null);
      }

    } catch (err) {
      console.error(err);
      alert("Error fetching event.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Live Status
  const toggleLiveStatus = async () => {
    if (!eventData) return;
    try {
      const dayRef = doc(db, "schedules", "aquatics", "days", eventData.day);
      const daySnap = await getDoc(dayRef);
      const dayData = daySnap.data();

      const eventsArray = dayData.sessions[eventData.session][eventData.sport];
      const updatedEvents = eventsArray.map(ev => {
        if (ev.eventNo == eventNo || ev.matchNo == eventNo) {
          return { ...ev, status: "live" };
        }
        return ev;
      });

      await updateDoc(dayRef, {
        [`sessions.${eventData.session}.${eventData.sport}`]: updatedEvents
      });

      alert("Event is now LIVE!");
      fetchEvent();

    } catch (err) {
      console.error(err);
      alert("Failed to set live status.");
    }
  };

  // Update Results (marks completed automatically)
  const updateResults = async () => {
    if (!eventData) return alert("No event loaded!");
    try {
      const dayRef = doc(db, "schedules", "aquatics", "days", eventData.day);
      const daySnap = await getDoc(dayRef);
      const dayData = daySnap.data();

      const eventsArray = dayData.sessions[eventData.session][eventData.sport];
      const updatedEvents = eventsArray.map(ev => {
        if (ev.eventNo == eventNo || ev.matchNo == eventNo) {
          return { ...ev, status: "completed", winner, notes, scores };
        }
        return ev;
      });

      await updateDoc(dayRef, {
        [`sessions.${eventData.session}.${eventData.sport}`]: updatedEvents
      });

      alert("Results updated! Event marked as COMPLETED.");
      setEventData(null);
      setEventNo("");

    } catch (err) {
      console.error(err);
      alert("Failed to update results.");
    }
  };

  // Increment/decrement scores for water polo dynamically
  const incrementScore = async (team, delta) => {
    if (!eventData) return;
    const newScore = Math.max(0, (scores[team] || 0) + delta);
    setScores(prev => ({ ...prev, [team]: newScore }));

    // Update Firestore immediately
    try {
      const dayRef = doc(db, "schedules", "aquatics", "days", eventData.day);
      const daySnap = await getDoc(dayRef);
      const dayData = daySnap.data();

      const eventsArray = dayData.sessions[eventData.session][eventData.sport];
      const updatedEvents = eventsArray.map(ev => {
        if (ev.eventNo == eventNo || ev.matchNo == eventNo) {
          return { ...ev, scores: { ...ev.scores, [team]: newScore } };
        }
        return ev;
      });

      await updateDoc(dayRef, {
        [`sessions.${eventData.session}.${eventData.sport}`]: updatedEvents
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update score.");
    }
  };

  const statusColor = status => {
    if (status === "live") return "bg-red-100 text-red-700 animate-pulse";
    if (status === "completed") return "bg-gray-200 text-gray-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#800000]">Live Admin Panel</h1>

      {/* Fetch Event */}
      <div className="max-w-2xl mx-auto mb-8 flex flex-col md:flex-row gap-3">
        <input
          type="number"
          placeholder="Enter Event No / Match No"
          value={eventNo}
          onChange={e => setEventNo(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#800000] focus:outline-none shadow-sm"
        />
        <button
          className="bg-[#800000] text-white px-6 py-2 rounded-lg hover:bg-[#a00000] transition font-medium"
          onClick={fetchEvent}
        >
          Fetch Event
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {eventData && (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 grid md:grid-cols-2 gap-10">
          {/* Event Info */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#800000]">Event Info</h2>
            <p><strong>Event / Match:</strong> {eventData.event || eventData.teams?.join(" 🆚 ")}</p>
            <p><strong>Event No / Match No:</strong> {eventData.eventNo || eventData.matchNo}</p>
            <p><strong>Sport:</strong> {eventData.sport}</p>
            <p className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${statusColor(eventData.status)}`}>
              {eventData.status.toUpperCase()}
            </p>
          </div>

          {/* Update Form */}
          <div className="flex flex-col gap-4">
            {eventData.status === "upcoming" && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-[#800000]"
                  onChange={toggleLiveStatus}
                />
                <span className="font-medium">Mark Event as Live</span>
              </label>
            )}

            {eventData.status === "live" && (
              <>
                {/* Water Polo Dynamic Scoring */}
                {eventData.sport === "waterPolo" && eventData.teams && (
                  <div className="space-y-3">
                    <p className="font-medium">Live Scores</p>
                    {eventData.teams.map(team => (
                      <div key={team} className="flex items-center gap-3">
                        <span className="w-32">{team}</span>
                        <button
                          className="bg-red-500 text-white px-2 rounded"
                          onClick={() => incrementScore(team, -1)}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{scores[team] || 0}</span>
                        <button
                          className="bg-green-500 text-white px-2 rounded"
                          onClick={() => incrementScore(team, 1)}
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Winner & Notes */}
                <label className="font-medium">Winner / Result</label>
                <input
                  type="text"
                  placeholder="Winner / Result"
                  value={winner}
                  onChange={e => setWinner(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2"
                />

                <label className="font-medium">Notes</label>
                <textarea
                  placeholder="Notes"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2"
                />

                <button
                  className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition font-semibold mt-2"
                  onClick={updateResults}
                >
                  Update Results
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
