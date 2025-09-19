"use client";
import { useState } from "react";

const AddMatchForm = ({ onSubmit, onCancel }) => {
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
    status: "Scheduled"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Predefined options for dropdowns
  const categories = [
    { value: "mainMeet", label: "Main Meet" },
    { value: "aquatics", label: "Aquatics" }
  ];

  const aquaticsSports = [
    "100m Freestyle", "200m Freestyle", "400m Freestyle", "800m Freestyle",
    "100m Backstroke", "200m Backstroke", "100m Breaststroke", "200m Breaststroke",
    "100m Butterfly", "200m Butterfly", "200m IM", "400m IM",
    "4x100m Freestyle Relay", "4x100m Medley Relay", "400m Medley Relay"
  ];

  const mainMeetSports = [
    "Athletics", "Badminton", "Basketball", "Cricket", "Football", "Hockey",
    "Kabaddi", "Lawn Tennis", "Squash", "Table Tennis", "Volleyball", "Weightlifting"
  ];

  const stages = [
    "Heats", "Quarter Finals", "Semi Finals", "Finals", "Group Match", "League Match", "Knockout"
  ];

  const hosts = [
    "IIT Madras", "IIT Hyderabad", "IIT Tirupati"
  ];

  const teams = [
    "IIT Madras", "IIT Hyderabad", "IIT Tirupati", "IIT Bombay", "IIT Delhi", 
    "IIT Kanpur", "IIT Kharagpur", "IIT Roorkee", "IIT Guwahati", "IIT BHU"
  ];

  const statuses = [
    "Scheduled", "Live", "Completed", "Cancelled", "Postponed"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.sport.trim()) newErrors.sport = "Sport is required";
    if (!formData.stage.trim()) newErrors.stage = "Stage is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time.trim()) newErrors.time = "Time is required";
    if (!formData.venue.trim()) newErrors.venue = "Venue is required";
    if (!formData.host) newErrors.host = "Host is required";
    if (!formData.team1) newErrors.team1 = "Team 1 is required";
    if (!formData.team2) newErrors.team2 = "Team 2 is required";
    if (formData.team1 === formData.team2) {
      newErrors.team2 = "Team 2 must be different from Team 1";
    }

    // Date validation - should not be in the past
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }

    // Time validation - basic format check
    if (formData.time && !/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i.test(formData.time)) {
      newErrors.time = "Time must be in format HH:MM AM/PM (e.g., 2:30 PM)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Transform form data to match your schedule structure
      const matchData = {
        sport: formData.sport,
        stage: formData.stage,
        date: formData.date,
        time: formData.time,
        venue: formData.venue,
        host: formData.host,
        teams: [formData.team1, formData.team2],
        status: formData.status,
        category: formData.category
      };

      await onSubmit(matchData);
      
      // Reset form on successful submission
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
        status: "Scheduled"
      });

    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSports = formData.category === "aquatics" ? aquaticsSports : mainMeetSports;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold mb-2">Add New Match</h2>
          <p className="text-blue-100">Enter match details for the schedule database</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Competition Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    category: cat.value, 
                    sport: "" // Reset sport when category changes
                  }))}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 font-semibold ${
                    formData.category === cat.value
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sport */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sport
              </label>
              <select
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                  errors.sport ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
              >
                <option value="">Select Sport</option>
                {currentSports.map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
              {errors.sport && <p className="text-red-500 text-sm mt-1">{errors.sport}</p>}
            </div>

            {/* Stage */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stage
              </label>
              <select
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                  errors.stage ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
              >
                <option value="">Select Stage</option>
                {stages.map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
              {errors.stage && <p className="text-red-500 text-sm mt-1">{errors.stage}</p>}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                  errors.date ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Time
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="2:30 PM"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                  errors.time ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
              />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>

            {/* Host */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Host Institute
              </label>
              <select
                name="host"
                value={formData.host}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                  errors.host ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
              >
                <option value="">Select Host</option>
                {hosts.map((host) => (
                  <option key={host} value={host}>{host}</option>
                ))}
              </select>
              {errors.host && <p className="text-red-500 text-sm mt-1">{errors.host}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Team 1 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Team 1
              </label>
              <select
                name="team1"
                value={formData.team1}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                  errors.team1 ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
              >
                <option value="">Select Team 1</option>
                {teams.map((team) => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
              {errors.team1 && <p className="text-red-500 text-sm mt-1">{errors.team1}</p>}
            </div>

            {/* Team 2 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Team 2
              </label>
              <select
                name="team2"
                value={formData.team2}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                  errors.team2 ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
              >
                <option value="">Select Team 2</option>
                {teams.filter(team => team !== formData.team1).map((team) => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
              {errors.team2 && <p className="text-red-500 text-sm mt-1">{errors.team2}</p>}
            </div>
          </div>

          {/* Venue - Full Width */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Venue
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="e.g., IIT Madras Sports Complex"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                errors.venue ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
              }`}
            />
            {errors.venue && <p className="text-red-500 text-sm mt-1">{errors.venue}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Match...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Match
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMatchForm;
