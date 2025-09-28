"use client";

import { useState } from "react";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { waterPoloPools, getPool } from "../lib/waterPoloPools";

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
      const dayIds = ["day1", "day2", "day3", "day4", "day5"];
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
              if (event.matchNo == eventNo) {
                foundEvent = { ...event, day: dayId, session, sport };
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
        alert("Event not found!");
        setEventData(null);
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching event.");
    } finally {
      setLoading(false);
    }
  };

  // Increment/decrement scores for water polo dynamically
  const incrementScore = (team, delta) => {
    if (!eventData) return;
    const newScore = Math.max(0, (scores[team] || 0) + delta);
    setScores(prev => ({ ...prev, [team]: newScore }));
  };

  // Update Results & Pool Points
  const updateResults = async () => {
    if (!eventData) return alert("No event loaded!");

    try {
      const dayRef = doc(db, "schedules", "aquatics", "days", eventData.day);
      const daySnap = await getDoc(dayRef);
      const dayData = daySnap.data();

      // Update match result
      const eventsArray = dayData.sessions[eventData.session][eventData.sport];
      const updatedEvents = eventsArray.map(ev => {
        if (ev.matchNo == eventNo) {
          return { ...ev, status: "completed", winner, notes, scores };
        }
        return ev;
      });

      await updateDoc(dayRef, {
        [`sessions.${eventData.session}.${eventData.sport}`]: updatedEvents
      });

      // Update points table in Firestore
      // inside updateResults
      for (const team of eventData.teams) {
        const pool = getPool(team);
        if (!pool) continue;

        const teamRef = doc(db, "pointsTable", "waterpolo", pool, team);
        const teamSnap = await getDoc(teamRef);

        let P = 0, W = 0, L = 0, T = 0, points = 0;
        if (teamSnap.exists()) {
          const data = teamSnap.data();
          P = data.P || 0;
          W = data.W || 0;
          L = data.L || 0;
          T = data.T || 0;
          points = data.points || 0;
        }

        let earned = 0;
        const normalizedWinner = winner.trim().toLowerCase();

        if (normalizedWinner === "draw") {
          T += 1;
          earned = 1;
        } else if (team.toLowerCase() === normalizedWinner) {
          W += 1;
          earned = 2;
        } else {
          L += 1;
          earned = 0;
        }

        P += 1;
        points += earned;

        await setDoc(teamRef, { P, W, L, T, points });
      }


      alert("Results updated and pool points table updated!");
      setEventData(null);
      setEventNo("");
      setScores({});
      setWinner("");
      setNotes("");
    } catch (err) {
      console.error(err);
      alert("Failed to update results.");
    }
  };


  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#800000]">Live Admin Panel</h1>

      {/* Fetch Event */}
      <div className="max-w-2xl mx-auto mb-8 flex flex-col md:flex-row gap-3">
        <input
          type="number"
          placeholder="Enter Match No"
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
            <p><strong>Match No:</strong> {eventData.matchNo}</p>
            <p><strong>Teams:</strong> {eventData.teams.join(" 🆚 ")}</p>
            <p><strong>Type:</strong> {eventData.type}</p>
            <p><strong>Venue:</strong> {eventData.venue}</p>
          </div>

          {/* Update Form */}
          <div className="flex flex-col gap-4">
            {/* Water Polo Dynamic Scoring */}
            {eventData.teams && (
              <div className="space-y-3">
                <p className="font-medium">Scores</p>
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
            <select
              value={winner}
              onChange={e => setWinner(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select Winner / Result</option>
              {eventData.teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
              <option value="Draw">Draw</option>
            </select>

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
          </div>
        </div>
      )}
    </div>
  );
}
