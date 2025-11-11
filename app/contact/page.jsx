"use client";
import React, { useState, useMemo, useCallback } from "react";
import Head from "next/head";

// MODIFIED: All 'members' arrays are now empty as requested.
const DATA = [
  {
    id: "iitm",
    title: "IIT Madras",
    subtitle: "Host Institution",
    tabs: [
      {
        id: "faculty",
        label: "Gymkhana Team",
        icon: "👥",
        members: [], // Emptied
      },
      {
        id: "student",
        label: "Student Team",
        icon: "🎓",
        members: [], // Emptied
      },
    ],
  },
  {
    id: "iith",
    title: "IIT Hyderabad",
    subtitle: "Participating Institute",
    tabs: [
      {
        id: "faculty",
        label: "Gymkhana Team",
        icon: "👥",
        members: [], // Emptied
      },
      {
        id: "student",
        label: "Student Team",
        icon: "🎓",
        members: [], // Emptied
      },
    ],
  },
  {
    id: "iitt",
    title: "IIT Tirupati",
    subtitle: "Participating Institute",
    tabs: [
      {
        id: "faculty",
        label: "Gymkhana Team",
        icon: "👥",
        members: [], // Emptied
      },
      {
        id: "student",
        label: "Student Team",
        icon: "🎓",
        members: [], // Emptied
      },
    ],
  },
];

// Enhanced Profile Card Component with better error handling
// This component is kept for future use but won't be rendered.
const ProfileCard = ({ m }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getColorFromName = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="group relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 transform">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 text-center">
        <div className="relative inline-block mb-4">
          {/* Loading placeholder */}
          {imageLoading && (
            <div className="w-[180px] h-[180px] rounded-full mx-auto bg-gray-200 animate-pulse flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}

          {/* Actual image */}
          {!imageError && (
            <img
              src={m.img}
              alt={m.name}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`w-[180px] h-[180px] object-cover rounded-full mx-auto ring-4 ring-white/50 group-hover:ring-blue-400/50 transition-all duration-300 group-hover:scale-105 transform ${
                imageLoading ? "hidden" : "block"
              }`}
            />
          )}

          {/* Fallback avatar */}
          {imageError && (
            <div
              className={`w-[180px] h-[180px] rounded-full mx-auto ring-4 ring-white/50 group-hover:ring-blue-400/50 transition-all duration-300 group-hover:scale-105 transform flex items-center justify-center text-white font-bold text-4xl ${getColorFromName(
                m.name,
              )}`}
            >
              {getInitials(m.name)}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <h5 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">
          {m.name}
        </h5>
        <p className="text-sm text-gray-600 font-medium mb-2">{m.role}</p>
        <p className="text-sm text-blue-600 font-mono">{m.phone}</p>
      </div>
    </div>
  );
};

// Toast Notification Component
const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-xl backdrop-blur-sm border transform transition-all duration-300 ${
      type === "success"
        ? "bg-green-500/90 border-green-400/50 text-white translate-x-0"
        : "bg-red-500/90 border-red-400/50 text-white translate-x-0"
    }`}
  >
    <div className="flex items-center gap-3">
      <span className="text-xl">{type === "success" ? "✅" : "❌"}</span>
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:opacity-75 transition-opacity duration-200"
      >
        <span className="text-xl">×</span>
      </button>
    </div>
  </div>
);

const Contact = () => {
  const [openId, setOpenId] = useState("iitm");
  const [activeTab, setActiveTab] = useState({
    iitm: "faculty",
    iith: "faculty",
    iitt: "faculty",
  });
  const [toast, setToast] = useState(null);

  // Enhanced form state with better validation
  const [form, setForm] = useState({
    dzName: "",
    dzEmail: "",
    dzPhoneNumber: "",
    subject: "",
    dzMessage: "",
    inquiryType: "",
  });
  const [status, setStatus] = useState({ loading: false, success: "", error: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  // Smooth accordion toggle
  const toggleAccordion = useCallback(
    (id) => {
      setOpenId((prev) => (prev === id ? null : id));
      if (id && openId !== id) {
        setActiveTab((prev) => ({ ...prev, [id]: "faculty" }));
      }
    },
    [openId],
  );

  const switchTab = useCallback((instId, tabId) => {
    setActiveTab((prev) => ({ ...prev, [instId]: tabId }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Enhanced validation
  const validate = () => {
    const errors = {};
    if (!form.dzName.trim()) errors.dzName = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.dzEmail))
      errors.dzEmail = "Valid email is required";
    if (!/^[0-9+\-\s()]{7,}$/.test(form.dzPhoneNumber))
      errors.dzPhoneNumber = "Valid phone is required";
    if (!form.subject.trim()) errors.subject = "Subject is required";
    if (form.dzMessage.trim().length < 10)
      errors.dzMessage = "Message must be at least 10 characters";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setStatus({ loading: true, success: "", error: "" });
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1500));

      showToast("Message sent successfully! We'll get back to you soon.", "success");
      setForm({
        dzName: "",
        dzEmail: "",
        dzPhoneNumber: "",
        subject: "",
        dzMessage: "",
        inquiryType: "",
      });
      setStatus({ loading: false, success: "", error: "" });
    } catch {
      showToast("Failed to send message. Please try again.", "error");
      setStatus({ loading: false, success: "", error: "" });
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Inter IIT Sports Meet 2025</title>
        <meta
          name="description"
          content="Connect with the organizers of Inter IIT Sports Meet 2025. Get support for registration, partnerships, and event information."
        />
        <meta
          name="keywords"
          content="Inter IIT Sports Meet contact, IIT sports registration, Inter IIT queries, sports meet support"
        />
        <meta property="og:title" content="Contact Us | Inter IIT Sports Meet 2025" />
        <meta
          property="og:description"
          content="Connect with Inter IIT Sports Meet 2025 organizers for registration support and event information."
        />
        <meta property="og:url" content="https://interiitsports.in/contact" />
        <meta property="og:image" content="https://interiitsports.in/logo_2.png" />
        <link rel="canonical" href="https://interiitsports.in/contact" />
      </Head>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pt-20">
        {/* Modern Hero Section - Limited to 40% height */}
        {/* <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 h-[40vh] min-h-[400px]"> */}
        {/* <div className="absolute inset-0 bg-black/20"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-blend-multiply" 
            style={{ backgroundImage: "url(/images/contact.png)" }}
          ></div> */}

        {/* Animated background elements */}
        {/* <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
Â         </div> */}

        {/* <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
Â           <div className="opacity-0 translate-y-8 animate-pulse" style={{ animationDelay: '0.2s', animation: 'fadeInUp 0.8s ease-out 0.2s forwards' }}>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                Get in <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 font-light max-w-2xl mx-auto leading-relaxed">
                Ready to be part of India's premier inter-collegiate sports championship? 
                <br />We're here to help you every step of the way.
              </p>
            </div>
          </div> */}

        {/* Breadcrumb */}
        {/* <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/30 backdrop-blur-sm py-4">
            <div className="container mx-auto px-4">
              <nav className="flex items-center gap-2 text-blue-200">
                <a href="/" className="hover:text-white transition-colors duration-200">Home</a>
                <span>/</span>
                <span className="text-white">Contact</span>
              </nav>
            </div>
          </div> */}
        {/* </div> */}

        {/* Large Gap before Contact Info Cards */}
        <div className="py-16"></div>

        {/* Modern Contact Info Cards */}
        <div className="relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {[
                {
                  icon: "📍",
                  title: "Visit Us",
                  content: "X6PM+P65, Hostel Ave\nIIT Madras Campus\nChennai, Tamil Nadu 600036",
                  gradient: "from-blue-500 to-blue-600",
                },
                {
                  icon: "✉️",
                  title: "Email Us",
                  content: "interiitsportsmeet2025@smail.iitm.ac.in",
                  subtitle: "Response within 24 hours",
                  gradient: "from-purple-500 to-purple-600",
                },
                {
                  icon: "📱",
                  title: "Call Us",
                  content: "(+91) 44 2257 8520",
                  subtitle: "Mon-Fri, 9:00 AM - 6:00 PM",
                  gradient: "from-indigo-500 to-indigo-600",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 transform"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                  ></div>
                  <div className="relative z-10 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 transform`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {item.content}
                    </p>
                    {item.subtitle && (
                      <p className="text-sm text-gray-500 mt-2 font-medium">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modern Team Directory Section */}
        <div className="py-24 pt-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
                Meet Our{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Team
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connect directly with our organizing committee members across
                participating IIT institutes
              </p>
            </div>

            <div className="space-y-8">
              {DATA.map((inst) => {
                const isOpen = openId === inst.id;
                return (
                  <div
                    key={inst.id}
                    className="group relative bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30"
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => toggleAccordion(inst.id)}
                      className={`w-full text-left p-8 transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-white/50 text-gray-800 hover:bg-white/70"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold mb-2">
                            {inst.title}
                          </h3>
                          <p
                            className={`text-lg ${
                              isOpen ? "text-blue-100" : "text-gray-600"
                            }`}
                          >
                            {inst.subtitle}
                          </p>
                        </div>
                        <div
                          className={`transform transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Accordion Content */}
                    {isOpen && (
                      <div
                        className="p-8 pt-0 opacity-0 animate-pulse"
                        style={{ animation: "fadeIn 0.5s ease-out forwards" }}
                      >
                        {/* Modern Tab Navigation */}
                        <div className="flex flex-wrap gap-3 mb-8">
                          {inst.tabs.map((tab) => {
                            const isActive = activeTab[inst.id] === tab.id;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => switchTab(inst.id, tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                                  isActive
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                <span>{tab.icon}</span>
                                {tab.label}
                              </button>
                            );
                          })}
                        </div>

                        {/* Team Members Grid */}
                        {inst.tabs.map((tab) => {
                          const isActive = activeTab[inst.id] === tab.id;
                          if (!isActive) return null;

                          return (
                            <div
                              key={tab.id}
                              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 opacity-0 animate-pulse"
                              style={{
                                animation: "fadeIn 0.5s ease-out forwards",
                              }}
                            >
                              {/* This map is now over an empty array, so no ProfileCards will be rendered */}
                              {tab.members.map((member) => (
                                <ProfileCard key={member.id} m={member} />
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modern Contact Form Section */}
        <div className="py-24 pt-16 bg-gradient-to-br from-gray-50 to-blue-50/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
                Send us a{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Message
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Have questions? We'd love to hear from you. Send us a message and
                we'll respond within 24 hours.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Inquiry Type Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    What can we help you with?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Registration", "Sponsorship", "Media", "General"].map(
                      (type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({ ...prev, inquiryType: type }))
                          }
                          className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                            form.inquiryType === type
                              ? "border-blue-500 bg-blue-50 text-blue-600 font-semibold scale-105"
                              : "border-gray-200 hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          {type}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      name="dzName"
                      value={form.dzName}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm transform focus:scale-105 ${
                        fieldErrors.dzName
                          ? "border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                      placeholder="Enter your full name"
                    />
                    {fieldErrors.dzName && (
                      <p className="text-red-500 text-sm mt-1 animate-pulse">
                        {fieldErrors.dzName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      name="dzEmail"
                      type="email"
                      value={form.dzEmail}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm transform focus:scale-105 ${
                        fieldErrors.dzEmail
                          ? "border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                      placeholder="your.email@example.com"
                    />
                    {fieldErrors.dzEmail && (
                      <p className="text-red-500 text-sm mt-1 animate-pulse">
                        {fieldErrors.dzEmail}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      name="dzPhoneNumber"
                      value={form.dzPhoneNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm transform focus:scale-105 ${
                        fieldErrors.dzPhoneNumber
                          ? "border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                      placeholder="+91 98765 43210"
                    />
                    {fieldErrors.dzPhoneNumber && (
                      <p className="text-red-500 text-sm mt-1 animate-pulse">
                        {fieldErrors.dzPhoneNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm transform focus:scale-105 ${
                        fieldErrors.subject
                          ? "border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                      placeholder="Brief subject of your inquiry"
                    />
                    {fieldErrors.subject && (
                      <p className="text-red-500 text-sm mt-1 animate-pulse">
                        {fieldErrors.subject}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="dzMessage"
                    rows={6}
                    value={form.dzMessage}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none transform focus:scale-105 ${
                      fieldErrors.dzMessage
                        ? "border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                    placeholder="Tell us more about your inquiry. The more details you provide, the better we can help you."
                  />
                  {fieldErrors.dzMessage && (
                    <p className="text-red-500 text-sm mt-1 animate-pulse">
                      {fieldErrors.dzMessage}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    {form.dzMessage.length} characters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-3"
                >
                  {status.loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Response Time Indicator */}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-blue-800 font-medium">
                    We typically respond within 24 hours during business days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;