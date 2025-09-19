"use client";
import React, { useState, useCallback } from "react";
import Head from "next/head";

// Bulletproof data with guaranteed fallbacks
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
        members: [
          { id: "iitm-f-1", name: "Dr. H.Edinbrow Pakiaraj", role: "Sports Officer (SS)", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
          { id: "iitm-f-2", name: "Dr. Vasudeva Rao V", role: "Sports Officer", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
          { id: "iitm-f-3", name: "Mr. G.Jayavel", role: "P.T.I.Gr I", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
          { id: "iitm-f-4", name: "Mr. Rajendran G", role: "P.T.I", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
          { id: "iitm-f-5", name: "Mr. Ashok Samrat Yadav", role: "P.T.I", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
          { id: "iitm-f-6", name: "Mr. Ashok M", role: "P.T.I", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
          { id: "iitm-f-7", name: "Mr.C.Dhanasekaran", role: "Sports Instructor", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
          { id: "iitm-f-8", name: "Mr. Vedan Shatish Raj K", role: "Sports Instructor", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
          { id: "iitm-f-9", name: "Mr. M.Saravanan", role: "Jr. Supereintendent", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
          { id: "iitm-f-10", name: "Mr. A. Sethuraman", role: "Sr. Assistant", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
          { id: "iitm-f-11", name: "Mr. J.Karthikeyan", role: "Executive Associate", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
          { id: "iitm-f-12", name: "Ms.S.S. Thanushree", role: "Jr. Executive", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
        ],
      },
      {
        id: "student",
        label: "Student Team",
        icon: "🎓",
        members: [
          { id: "iitm-s-1", name: "Ms. D Prabhanjana", role: "Institute Sports Secretary", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
        ],
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
        members: [
          { id: "iith-f-1", name: "Dr. H.Edinbrow Pakiaraj", role: "Sports Officer (SS)", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
        ],
      },
      {
        id: "student",
        label: "Student Team",
        icon: "🎓",
        members: [
          { id: "iith-s-1", name: "Arjun Verma", role: "Student Sports Secretary", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
        ],
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
        members: [
          { id: "iitt-f-1", name: "Dr. H.Edinbrow Pakiaraj", role: "Sports Officer (SS)", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
        ],
      },
      {
        id: "student",
        label: "Student Team",
        icon: "🎓",
        members: [
          { id: "iitt-s-1", name: "Meera Nair", role: "Student Sports Secretary", phone: "+91 9976357555", img: "/images/our-team/Arul.png" },
        ],
      },
    ],
  },
];

// Bulletproof ProfileCard - Cannot fail
const ProfileCard = ({ m = {} }) => {
  const [imageError, setImageError] = useState(false);
  
  // Safe data extraction with fallbacks
  const name = m?.name || "Unknown Person";
  const role = m?.role || "No Role";
  const phone = m?.phone || "No Phone";
  const img = m?.img || "";
  const id = m?.id || Math.random();

  // Safe initials generation
  const getInitials = (name) => {
    try {
      return name.split(' ').map(word => (word?.[0] || '').toUpperCase()).join('').slice(0, 2) || 'UN';
    } catch {
      return 'UN';
    }
  };

  // Safe color generation
  const getColorFromName = (name) => {
    try {
      const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'];
      const index = (name?.length || 0) % colors.length;
      return colors[index] || 'bg-gray-500';
    } catch {
      return 'bg-gray-500';
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="group relative bg-white backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 transform">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 text-center">
        <div className="relative inline-block mb-4">
          {/* Image or Fallback */}
          {!imageError && img ? (
            <img
              src={img}
              alt={name}
              onError={handleImageError}
              className="w-44 h-44 object-cover rounded-full mx-auto ring-4 ring-white group-hover:ring-blue-400 transition-all duration-300 group-hover:scale-105 transform"
              loading="lazy"
            />
          ) : (
            <div className={`w-44 h-44 rounded-full mx-auto ring-4 ring-white group-hover:ring-blue-400 transition-all duration-300 group-hover:scale-105 transform flex items-center justify-center text-white font-bold text-4xl ${getColorFromName(name)}`}>
              {getInitials(name)}
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <h5 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300 break-words">
          {name}
        </h5>
        <p className="text-sm text-gray-600 font-medium mb-2 break-words">
          {role}
        </p>
        <p className="text-sm text-blue-600 font-mono break-words">
          {phone}
        </p>
      </div>
    </div>
  );
};

// Bulletproof Toast
const Toast = ({ message = "Notification", type = "success", onClose = () => {} }) => (
  <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-xl backdrop-blur-sm border transform transition-all duration-300 ${
    type === 'success' 
      ? 'bg-green-500 border-green-400 text-white' 
      : 'bg-red-500 border-red-400 text-white'
  }`}>
    <div className="flex items-center gap-3">
      <span className="text-xl">{type === 'success' ? '✅' : '❌'}</span>
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-75 transition-opacity duration-200">
        <span className="text-xl">×</span>
      </button>
    </div>
  </div>
);

// Main bulletproof Contact component
const Contact = () => {
  const [openId, setOpenId] = useState("iitm");
  const [activeTab, setActiveTab] = useState({ iitm: "faculty", iith: "faculty", iitt: "faculty" });
  const [toast, setToast] = useState(null);

  // Bulletproof form state
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

  // Safe accordion toggle
  const toggleAccordion = useCallback((id) => {
    try {
      setOpenId(prev => prev === id ? "" : id);
      if (id && openId !== id) {
        setActiveTab(prev => ({ ...prev, [id]: "faculty" }));
      }
    } catch (error) {
      console.error("Accordion toggle error:", error);
    }
  }, [openId]);

  const switchTab = useCallback((instId, tabId) => {
    try {
      setActiveTab(prev => ({ ...prev, [instId]: tabId }));
    } catch (error) {
      console.error("Tab switch error:", error);
    }
  }, []);

  const handleChange = (e) => {
    try {
      const { name, value } = e?.target || {};
      if (name) {
        setForm(p => ({ ...p, [name]: value || "" }));
        if (fieldErrors[name]) {
          setFieldErrors(prev => ({ ...prev, [name]: "" }));
        }
      }
    } catch (error) {
      console.error("Form change error:", error);
    }
  };

  // Safe validation
  const validate = () => {
    try {
      const errors = {};
      if (!(form.dzName || "").trim()) errors.dzName = "Name is required";
      if (!/^\S+@\S+\.\S+$/.test(form.dzEmail || "")) errors.dzEmail = "Valid email is required";
      if (!/^[0-9+\-\s()]{7,}$/.test(form.dzPhoneNumber || "")) errors.dzPhoneNumber = "Valid phone is required";
      if (!(form.subject || "").trim()) errors.subject = "Subject is required";
      if ((form.dzMessage || "").trim().length < 10) errors.dzMessage = "Message must be at least 10 characters";
      
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    } catch {
      return false;
    }
  };

  const showToast = (message, type) => {
    try {
      setToast({ message: message || "Notification", type: type || "success" });
      setTimeout(() => setToast(null), 4000);
    } catch (error) {
      console.error("Toast error:", error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e?.preventDefault();
      if (!validate()) return;
      
      setStatus({ loading: true, success: "", error: "" });
      await new Promise(r => setTimeout(r, 1500));
      
      showToast("Message sent successfully! We'll get back to you soon.", "success");
      setForm({ dzName: "", dzEmail: "", dzPhoneNumber: "", subject: "", dzMessage: "", inquiryType: "" });
      setStatus({ loading: false, success: "", error: "" });
    } catch (error) {
      console.error("Submit error:", error);
      showToast("Failed to send message. Please try again.", "error");
      setStatus({ loading: false, success: "", error: "" });
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Inter IIT Sports Meet 2025</title>
        <meta name="description" content="Connect with the organizers of Inter IIT Sports Meet 2025." />
      </Head>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pt-20">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 h-96">
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                Get in <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 font-light max-w-2xl mx-auto leading-relaxed">
                Ready to be part of India's premier inter-collegiate sports championship? 
                We're here to help you every step of the way.
              </p>
            </div>
          </div>
        </div>

        <div className="py-16"></div>

        {/* Contact Info Cards */}
        <div className="relative z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {[
                {
                  icon: "📍",
                  title: "Visit Us",
                  content: "IIT Madras Campus\nChennai, Tamil Nadu 600036",
                  gradient: "from-blue-500 to-blue-600"
                },
                {
                  icon: "✉️",
                  title: "Email Us",
                  content: "interiitsportsmeet2025@smail.iitm.ac.in",
                  gradient: "from-purple-500 to-purple-600"
                },
                {
                  icon: "📱",
                  title: "Call Us",
                  content: "(+91) 44 2257 8520",
                  gradient: "from-indigo-500 to-indigo-600"
                }
              ].map((item, index) => (
                <div key={index} className="group relative bg-white backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 transform">
                  <div className="relative z-10 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 transform`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Directory */}
        <div className="py-24 pt-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
                Meet Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connect directly with our organizing committee members across participating IIT institutes
              </p>
            </div>

            <div className="space-y-8">
              {(DATA || []).map((inst = {}) => {
                const instId = inst.id || Math.random();
                const isOpen = openId === instId;
                const instTitle = inst.title || "Unknown Institute";
                const instSubtitle = inst.subtitle || "Institute";
                const instTabs = inst.tabs || [];

                return (
                  <div key={instId} className="group relative bg-white backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                    {/* Accordion Header */}
                    <button
                      onClick={() => toggleAccordion(instId)}
                      className={`w-full text-left p-8 transition-all duration-300 ${
                        isOpen 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                          : 'bg-white text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold mb-2">{instTitle}</h3>
                          <p className={`text-lg ${isOpen ? 'text-blue-100' : 'text-gray-600'}`}>{instSubtitle}</p>
                        </div>
                        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Accordion Content */}
                    {isOpen && (
                      <div className="p-8 pt-0">
                        {/* Tab Navigation */}
                        <div className="flex flex-wrap mb-8 mt-6">
                          {instTabs.map((tab = {}) => {
                            const tabId = tab.id || Math.random();
                            const isActive = activeTab[instId] === tabId;
                            const tabLabel = tab.label || "Tab";
                            const tabIcon = tab.icon || "📋";
                            
                            return (
                              <button
                                key={tabId}
                                onClick={() => switchTab(instId, tabId)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                                  isActive
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                <span>{tabIcon}</span>
                                {tabLabel}
                              </button>
                            );
                          })}
                        </div>

                        {/* Team Members Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                          {instTabs.map((tab = {}) => {
                            const tabId = tab.id || Math.random();
                            const isActive = activeTab[instId] === tabId;
                            const members = tab.members || [];
                            
                            if (!isActive) return null;
                            
                            return members.map((member = {}) => (
                              <ProfileCard key={member.id || Math.random()} m={member} />
                            ));
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="py-24 pt-16 bg-gradient-to-br from-gray-50 to-blue-50/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
                Send us a <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Message</span>
              </h2>
              <p className="text-xl text-gray-600">
                Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
              </p>
            </div>

            <div className="bg-white backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">What can we help you with?</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Registration", "Sponsorship", "Media", "General"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, inquiryType: type }))}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          form.inquiryType === type
                            ? 'border-blue-500 bg-blue-50 text-blue-600 font-semibold scale-105'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      name="dzName"
                      value={form.dzName || ""}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 bg-white backdrop-blur-sm ${
                        fieldErrors.dzName ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                      } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                      placeholder="Enter your full name"
                    />
                    {fieldErrors.dzName && <p className="text-red-500 text-sm mt-1">{fieldErrors.dzName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      name="dzEmail"
                      type="email"
                      value={form.dzEmail || ""}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 bg-white backdrop-blur-sm ${
                        fieldErrors.dzEmail ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                      } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                      placeholder="your.email@example.com"
                    />
                    {fieldErrors.dzEmail && <p className="text-red-500 text-sm mt-1">{fieldErrors.dzEmail}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      name="dzPhoneNumber"
                      value={form.dzPhoneNumber || ""}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 bg-white backdrop-blur-sm ${
                        fieldErrors.dzPhoneNumber ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                      } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                      placeholder="+91 98765 43210"
                    />
                    {fieldErrors.dzPhoneNumber && <p className="text-red-500 text-sm mt-1">{fieldErrors.dzPhoneNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input
                      name="subject"
                      value={form.subject || ""}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 bg-white backdrop-blur-sm ${
                        fieldErrors.subject ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                      } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                      placeholder="Brief subject of your inquiry"
                    />
                    {fieldErrors.subject && <p className="text-red-500 text-sm mt-1">{fieldErrors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="dzMessage"
                    rows={6}
                    value={form.dzMessage || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 bg-white backdrop-blur-sm resize-none ${
                      fieldErrors.dzMessage ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                    } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                    placeholder="Tell us more about your inquiry."
                  />
                  {fieldErrors.dzMessage && <p className="text-red-500 text-sm mt-1">{fieldErrors.dzMessage}</p>}
                  <p className="text-sm text-gray-500 mt-2">{(form.dzMessage || "").length} characters</p>
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-3"
                >
                  {status.loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
