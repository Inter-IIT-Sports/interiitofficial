"use client";

import { useState } from "react";

const AddMatchForm = () => {
  const [formData, setFormData] = useState({
    category: "mainMeet", // aquatics or mainMeet
    sport: "",
    stage: "",
    date: "",
    time: "",
    venue: "",
    host: "",
    team1: "",
    team2: "",
    status: "Scheduled",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Predefined options
  const categories = [
    { value: "mainMeet", label: "Main Meet" },
    { value: "aquatics", label: "Aquatics" },
  ];

  const aquaticsSports = [
    "100m Freestyle", "200m Freestyle", "400m Freestyle", "800m Freestyle",
    "100m Backstroke", "200m Backstroke", "100m Breaststroke", "200m Breaststroke",
    "100m Butterfly", "200m Butterfly", "200m IM", "400m IM",
    "4x100m Freestyle Relay", "4x100m Medley Relay", "400m Medley Relay",
  ];

  const mainMeetSports = [
    "Athletics", "Badminton", "Basketball", "Cricket", "Football", "Hockey",
    "Kabaddi", "Lawn Tennis", "Squash", "Table Tennis", "Volleyball", "Weightlifting",
  ];

  const stages = [
    "Heats", "Quarter Finals", "Semi Finals", "Finals", "Group Match", "League Match", "Knockout",
  ];

  const hosts = ["IIT Madras", "IIT Hyderabad", "IIT Tirupati"];

  const teams = [
    "IIT Madras", "IIT Hyderabad", "IIT Tirupati", "IIT Bombay", "IIT Delhi",
    "IIT Kanpur", "IIT Kharagpur", "IIT Roorkee", "IIT Guwahati", "IIT BHU",
  ];

  const statuses = ["Scheduled", "Live", "Completed", "Cancelled", "Postponed"];

  const currentSports = formData.category === "aquatics" ? aquaticsSports : mainMeetSports;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.sport) newErrors.sport = "Sport is required";
    if (!formData.stage) newErrors.stage = "Stage is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.venue) newErrors.venue = "Venue is required";
    if (!formData.host) newErrors.host = "Host is required";
    if (!formData.team1) newErrors.team1 = "Team 1 is required";
    if (!formData.team2) newErrors.team2 = "Team 2 is required";
    if (formData.team1 && formData.team1 === formData.team2)
      newErrors.team2 = "Team 2 must be different from Team 1";

    // Date cannot be past
    if (formData.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.date);
      if (selectedDate < today) newErrors.date = "Date cannot be in the past";
    }

    // Time format HH:MM AM/PM
    if (formData.time && !/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i.test(formData.time))
      newErrors.time = "Time must be in format HH:MM AM/PM";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      console.log("Match Added:", formData);
      alert("Match added successfully!");
      setFormData({
        category: "mainMeet",
        sport: "",
        stage: "",
        date: "",
        time: "",
        venue: "",
        host: "",
        team1: "",
        team2: "",
        status: "Scheduled",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel?")) {
      setFormData({
        category: "mainMeet",
        sport: "",
        stage: "",
        date: "",
        time: "",
        venue: "",
        host: "",
        team1: "",
        team2: "",
        status: "Scheduled",
      });
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Match</h2>

        {/* Category Buttons */}
        <div className="flex gap-4 mb-6 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, category: cat.value, sport: "" }))
              }
              className={`px-4 py-2 rounded-xl border-2 font-semibold transition ${
                formData.category === cat.value
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sport */}
          <div>
            <label className="block text-sm font-semibold mb-1">Sport</label>
            <select
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-xl border-2 ${
                errors.sport ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Sport</option>
              {currentSports.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
            {errors.sport && <p className="text-red-500 text-sm">{errors.sport}</p>}
          </div>

          {/* Stage */}
          <div>
            <label className="block text-sm font-semibold mb-1">Stage</label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-xl border-2 ${
                errors.stage ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Stage</option>
              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
            {errors.stage && <p className="text-red-500 text-sm">{errors.stage}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-xl border-2 ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-semibold mb-1">Time</label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="2:30 PM"
              className={`w-full px-3 py-2 rounded-xl border-2 ${
                errors.time ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
          </div>

          {/* Host */}
          <div>
            <label className="block text-sm font-semibold mb-1">Host Institute</label>
            <select
              name="host"
              value={formData.host}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-xl border-2 ${
                errors.host ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Host</option>
              {hosts.map((host) => (
                <option key={host} value={host}>
                  {host}
                </option>
              ))}
            </select>
            {errors.host && <p className="text-red-500 text-sm">{errors.host}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border-2 border-gray-300"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Team 1 */}
          <div>
            <label className="block text-sm font-semibold mb-1">Team 1</label>
            <select
              name="team1"
              value={formData.team1}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-xl border-2 ${
                errors.team1 ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Team 1</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
            {errors.team1 && <p className="text-red-500 text-sm">{errors.team1}</p>}
          </div>

          {/* Team 2 */}
          <div>
            <label className="block text-sm font-semibold mb-1">Team 2</label>
            <select
              name="team2"
              value={formData.team2}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-xl border-2 ${
                errors.team2 ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Team 2</option>
              {teams.filter((team) => team !== formData.team1).map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
            {errors.team2 && <p className="text-red-500 text-sm">{errors.team2}</p>}
          </div>

          {/* Venue */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="e.g., IIT Madras Sports Complex"
              className={`w-full px-3 py-2 rounded-xl border-2 ${
                errors.venue ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.venue && <p className="text-red-500 text-sm">{errors.venue}</p>}
          </div>
        </form>

        {/* Actions */}
        <div className="flex gap-4 mt-6 justify-end">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold disabled:opacity-50"
          >
            {isSubmitting ? "Adding..." : "Add Match"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMatchForm;
