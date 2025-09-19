"use client";
import React, { useState, useMemo, useCallback } from "react";
import Head from "next/head";

// Data


const DATA = [
  {
    id: "iitm",
    title: "IIT Madras",
    tabs: [
      {
        id: "faculty",
        label: "Gymkhana Team",
        members: [
          { id: "iitm-f-1", name: "Dr. H.Edinbrow Pakiaraj", role: "Sports Officer (SS)", phone: "+91 9976357555", img: "/images/sample.png" },
          { id: "iitm-f-2", name: "Dr. Vasudeva Rao V", role: "Sports Officer", phone: "+91 9976357555", img: "/images/sample.png" },
          { id: "iitm-f-3", name: "Mr. G.Jayavel", role: "P.T.I.Gr I", phone: "+91 9976357555", img: "/images/sample.png" },
          { id: "iitm-f-4", name: "Mr. Rajendran G", role: "P.T.I", phone: "+91 9976357555", img: "/images/sample.png" },
          { id: "iitm-f-5", name: "Mr. Ashok Samrat Yadav", role: "P.T.I", phone: "+91 9976357555", img: "/images/sample.png" },
          { id: "iitm-f-6", name: "Mr. Ashok M", role: "P.T.I", phone: "+91 9976357555", img: "/images/sample.png" },
          { id: "iitm-f-7", name: "Mr.C.Dhanasekaran", role: "Sports Instructor", phone: "+91 9976357555", img: "/images/sample.png" },
          { id: "iitm-f-8", name: "Mr. Vedan Shatish Raj K", role: "Sports Instructor", phone: "+91 9976357555", img: "/images/sample.png" },
          { id: "iitm-f-9", name: "Mr. M.Saravanan", role: "Jr. Supereintendent", phone: "+91 9976357555", img: "/images/sample.png" },
          { id: "iitm-f-10", name: "Mr. A. Sethuraman", role: "Sr. Assistant", phone: "+91 9976357555", img: "/images/sample.png" },
          { id: "iitm-f-11", name: "Mr. J.Karthikeyan", role: "Executive Associate", phone: "+91 9976357555", img: "/images/sample.png" },
          { id: "iitm-f-12", name: "Ms.S.S. Thanushree", role: "Jr. Executive", phone: "+91 9976357555", img: "/images/sample.png" },
        ],
      },
      {
        id: "student",
        label: "Student Team",
        members: [
          { id: "iitm-s-1", name: "Ms. D Prabhanjana", role: "Institute Sports Secretary", phone: "+91 9976357555", img: "/images/sample.png" },
        ],
      },
    ],
  },
  {
    id: "iith",
    title: "IIT Hyderabad",
    tabs: [
      {
        id: "faculty",
        label: "Gymkhana Team",
        members: [
          { id: "iith-f-1", name: "Dr. H.Edinbrow Pakiaraj", role: "Sports Officer (SS)", phone: "+91 9976357555", img: "/images/sample.png" },
        ],
      },
      {
        id: "student",
        label: "Student Team",
        members: [
          { id: "iith-s-1", name: "Arjun Verma", role: "Student Sports Secretary", phone: "+91 9976357555", img: "/images/sample.png" },
        ],
      },
    ],
  },
  {
    id: "iitt",
    title: "IIT Tirupati",
    tabs: [
      {
        id: "faculty",
        label: "Gymkhana Team",
        members: [
          { id: "iitt-f-1", name: "Dr. H.Edinbrow Pakiaraj", role: "Sports Officer (SS)", phone: "+91 9976357555", img: "/images/sample.png" },
        ],
      },
      {
        id: "student",
        label: "Student Team",
        members: [
          { id: "iitt-s-1", name: "Meera Nair", role: "Student Sports Secretary", phone: "+91 9976357555", img: "/images/sample.png" },
        ],
      },
    ],
  },
];

const ProfileCard = ({ m }) => (
  <div className="profile-card text-center p-5 border border-gray-200 rounded-2xl m-2 bg-white shadow-sm">
    <img
      src={m.img}
      alt={m.name}
      className="w-[180px] h-[180px] object-cover rounded-full mb-4 mx-auto"
    />
    <h5 className="mt-1 mb-1 text-[16px] font-semibold">{m.name}</h5>
    <p className="m-0 text-[14px] text-gray-700">{m.role}</p>
    <p className="m-0 text-[14px] text-gray-600">{m.phone}</p>
  </div>
);

const Contact = () => {
  // Default: IIT Madras open and Gymkhana tab
  const [openId, setOpenId] = useState("iitm");
  const initialTabs = useMemo(() => {
    const map = {};
    DATA.forEach((inst) => {
      map[inst.id] = inst.id === "iitm" ? "faculty" : inst.tabs[0]?.id || null;
    });
    return map;
  }, []);
  const [activeTab, setActiveTab] = useState(initialTabs);

  // On header click, open panel and force Gymkhana Team to be selected
  const toggleAccordion = useCallback((id) => {
    setOpenId((prev) => {
      const next = prev === id ? null : id;
      if (next) {
        setActiveTab((tabs) => ({ ...tabs, [id]: "faculty" }));
      }
      return next;
    });
  }, []);

  const switchTab = useCallback((instId, tabId) => {
    setActiveTab((prev) => ({ ...prev, [instId]: tabId }));
  }, []);

  // Contact form state
  const [form, setForm] = useState({
    dzName: "",
    dzEmail: "",
    dzPhoneNumber: "",
    subject: "",
    dzMessage: "",
  });
  const [status, setStatus] = useState({ loading: false, success: "", error: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.dzName.trim()) return "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.dzEmail)) return "Valid email is required";
    if (!/^[0-9+\-\s()]{7,}$/.test(form.dzPhoneNumber)) return "Valid phone is required";
    if (!form.subject.trim()) return "Subject is required";
    if (form.dzMessage.trim().length < 10) return "Message must be at least 10 characters";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setStatus({ loading: false, success: "", error: err });
    try {
      setStatus({ loading: true, success: "", error: "" });
      // Replace this mock with your API call
      await new Promise((r) => setTimeout(r, 1000));
      setStatus({ loading: false, success: "Message sent successfully!", error: "" });
      setForm({ dzName: "", dzEmail: "", dzPhoneNumber: "", subject: "", dzMessage: "" });
    } catch {
      setStatus({ loading: false, success: "", error: "Failed to send. Please try again." });
    }
  };

  return (
    <>
      <Head>
        {/* Title */}
        <title>Contact Us | Inter IIT Sports Meet 2025</title>

        {/* Meta Description & Keywords */}
        <meta
          name="description"
          content="Get in touch with the organizers of the Inter IIT Sports Meet 2025. Reach out for registration, queries, sponsorships, and general information."
        />
        <meta
          name="keywords"
          content="Inter IIT Sports Meet contact, Inter IIT registration help, IIT sports meet queries, Contact organizers IIT sports"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Us | Inter IIT Sports Meet 2025" />
        <meta
          property="og:description"
          content="Reach out to the Inter IIT Sports Meet 2025 organizers for registration, queries, or sponsorship opportunities."
        />
        <meta property="og:url" content="https://interiitsports.in/contact" />
        <meta property="og:site_name" content="Inter IIT Sports Meet 2025" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image" content="https://interiitsports.in/logo_2.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Inter IIT Sports Meet 2025" />
        <meta
          name="twitter:description"
          content="Get in touch with the organizers of the Inter IIT Sports Meet 2025 for registration and other queries."
        />
        <meta name="twitter:image" content="https://interiitsports.in/logo_2.png" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://interiitsports.in/contact" />
      </Head>

      <section className="page-content">
        {/* Larger Hero Banner */}
        <div
          className="dez-bnr-inr overlay-black-middle w-full bg-cover bg-center relative"
          style={{ backgroundImage: "url(/images/contact.png)" }}
        >
          <div className="container mx-auto px-4">
            <div className="dez-bnr-inr-entry py-28 md:py-40 lg:py-48 min-h-[55vh] flex items-end">
              <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow">
                Contact Us
              </h1>
            </div>
          </div>
          <div className="breadcrumb-row bg-black/50 py-4 relative z-[1]">
            <div className="container mx-auto px-4">
              <ul className="list-inline m-0 flex gap-2 text-white text-sm">
                <li><a href="#" className="text-white">Home</a></li>
                <li>/</li>
                <li>Contact us</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accordion area at 90vw with sleek spacing */}
        <div className="w-full py-12 md:py-16 lg:py-20">
          <div className="mx-auto px-4" style={{ width: "90vw", maxWidth: "1280px" }}>
            <div className="accordion" id="instituteAccordion" role="presentation">
              <div className="space-y-6">
                {DATA.map((inst) => {
                  const isOpen = openId === inst.id;
                  const headingId = `heading-${inst.id}`;
                  const regionId = `region-${inst.id}`;

                  return (
                    <div className="accordion-item rounded-xl overflow-hidden border border-gray-200 shadow-sm" key={inst.id}>
                      <h2 className="accordion-header" id={headingId}>
                        <button
                          type="button"
                          className={`accordion-button w-full text-left font-semibold relative pr-12 py-4 md:py-5 px-5 ${isOpen ? "" : "collapsed"}`}
                          aria-expanded={isOpen ? "true" : "false"}
                          aria-controls={regionId}
                          onClick={() => toggleAccordion(inst.id)}
                          style={{
                            backgroundColor: isOpen ? "#f9f5f0" : "white",
                            color: isOpen ? "#a3782c" : "#1f2937",
                          }}
                        >
                          <span className="text-lg md:text-xl">{inst.title}</span>
                          <span
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a3782c] font-bold transition-transform"
                            style={{ transform: isOpen ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)" }}
                          >
                            ▼
                          </span>
                        </button>
                      </h2>

                      <div
                        id={regionId}
                        className={`accordion-collapse border-t border-gray-200 ${isOpen ? "block" : "hidden"}`}
                        role="region"
                        aria-labelledby={headingId}
                      >
                        {isOpen && (
                          <div className="accordion-body p-5 md:p-6 lg:p-8 bg-white">
                            {/* Tabs header */}
                            <ul className="nav nav-pills mb-6 flex flex-wrap gap-3" role="tablist" aria-label={`${inst.title} tabs`}>
                              {inst.tabs.map((tab) => {
                                const isActive = activeTab[inst.id] === tab.id;
                                return (
                                  <li className="nav-item" key={`${inst.id}-${tab.id}`} role="presentation">
                                    <button
                                      type="button"
                                      className={`nav-link px-5 py-2.5 rounded-md border text-[14px] font-medium transition ${isActive
                                        ? "bg-[#6c291f] text-white border-[#6c291f] shadow"
                                        : "bg-transparent text-[#6c291f] border-[#6c291f] hover:bg-[#6c291f]/10"
                                        }`}
                                      aria-selected={isActive ? "true" : "false"}
                                      aria-controls={`${inst.id}-pane-${tab.id}`}
                                      onClick={() => switchTab(inst.id, tab.id)}
                                      role="tab"
                                    >
                                      {tab.label}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>

                            {/* Tabs content */}
                            <div className="tab-content">
                              {inst.tabs.map((tab) => {
                                const isActive = activeTab[inst.id] === tab.id;
                                return (
                                  <div
                                    key={`${inst.id}-pane-${tab.id}`}
                                    id={`${inst.id}-pane-${tab.id}`}
                                    className={`tab-pane fade ${isActive ? "show active" : ""}`}
                                    role="tabpanel"
                                    aria-labelledby={`${inst.id}-tab-${tab.id}`}
                                    hidden={!isActive}
                                  >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                      {tab.members.map((m) => (
                                        <ProfileCard key={m.id} m={m} />
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Info + functional form + map */}
        <div className="section-full content-inner contact-style-1 bg-gray-50 py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              <div className="icon-bx-wraper bx-style-1 p-a30 center p-6 md:p-8 text-center border border-gray-200 rounded-xl bg-white shadow-sm">
                <div className="icon-xl text-primary m-b20 mb-5">
                  <span className="icon-cell inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">📍</span>
                </div>
                <div className="icon-content">
                  <h5 className="dlab-tilte text-uppercase font-semibold mb-2">Address</h5>
                  <p className="text-sm text-gray-700">X6PM+P65, Hostel Ave, Indian Institute Of Technology, Chennai, Tamil Nadu 600036</p>
                </div>
              </div>
              <div className="icon-bx-wraper bx-style-1 p-a30 center p-6 md:p-8 text-center border border-gray-200 rounded-xl bg-white shadow-sm">
                <div className="icon-xl text-primary m-b20 mb-5">
                  <span className="icon-cell inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">✉️</span>
                </div>
                <div className="icon-content">
                  <h5 className="dlab-tilte text-uppercase font-semibold mb-2">Email</h5>
                  <p className="text-sm text-gray-700">interiitsportsmeet2025@smail.iitm.ac.in<br /><br /></p>
                </div>
              </div>
              <div className="icon-bx-wraper bx-style-1 p-a30 center p-6 md:p-8 text-center border border-gray-200 rounded-xl bg-white shadow-sm">
                <div className="icon-xl text-primary m-b20 mb-5">
                  <span className="icon-cell inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">📱</span>
                </div>
                <div className="icon-content">
                  <h5 className="dlab-tilte text-uppercase font-semibold mb-2">Phone</h5>
                  <p className="text-sm text-gray-700">(+91) 44 2257 8520<br /><br /></p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="p-a30 bg-gray clearfix p-6 md:p-8 bg-white rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">Send Message Us</h2>

                {status.success && (
                  <div className="mb-4 rounded border border-green-300 bg-green-50 text-green-800 px-3 py-2">
                    {status.success}
                  </div>
                )}
                {status.error && (
                  <div className="mb-4 rounded border border-red-300 bg-red-50 text-red-800 px-3 py-2">
                    {status.error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      name="dzName"
                      value={form.dzName}
                      onChange={handleChange}
                      required
                      className="form-control border px-4 py-3 rounded-lg"
                      placeholder="Your Name"
                    />
                    <input
                      name="dzEmail"
                      type="email"
                      value={form.dzEmail}
                      onChange={handleChange}
                      required
                      className="form-control border px-4 py-3 rounded-lg"
                      placeholder="Your Email Id"
                    />
                    <input
                      name="dzPhoneNumber"
                      value={form.dzPhoneNumber}
                      onChange={handleChange}
                      required
                      className="form-control border px-4 py-3 rounded-lg"
                      placeholder="Phone"
                    />
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="form-control border px-4 py-3 rounded-lg"
                      placeholder="Subject"
                    />
                  </div>
                  <textarea
                    name="dzMessage"
                    rows={5}
                    value={form.dzMessage}
                    onChange={handleChange}
                    required
                    className="form-control border px-4 py-3 rounded-lg w-full"
                    placeholder="Your Message..."
                  />
                  <button
                    type="submit"
                    disabled={status.loading}
                    className={`site-button bg-[#d8a409] hover:bg-[#c49708] transition text-white font-bold text-lg px-8 py-3 rounded-lg ${status.loading ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {status.loading ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>

              {/* <div className="min-h-[420px] rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.2074110045324!2d80.23124631536031!3d12.986750892169483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d7f76034f05%3A0x65e224c367abb86!2sIIT%20Gymkhana!5e0!3m2!1sen!2sin!4v1692900000000!5m2!1sen!2sin"
                className="w-full h-full min-h-[420px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
