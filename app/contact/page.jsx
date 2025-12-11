import React from "react";
// Assuming you have the lucide-react icons installed
import { Mail, Phone, User, MapPin } from "lucide-react";

// --- CUSTOM COLORS BASED ON IMAGE ---
// Dark Teal/Cyan for Phone
const PHONE_BG_COLOR = "bg-[#2d7f8a]";
const PHONE_TEXT_COLOR = "text-white";
// Light Teal/Aqua for Email
const EMAIL_BG_COLOR = "bg-[#a6e0e9]";
const EMAIL_TEXT_COLOR = "text-[#2d7f8a]";

// People to Add Heads: Priyasha, Core: Nagul(Design), Aparna(Hospitality), Piyush(Events)
// ----------------------------------------
// STAFF DATA (Keeping your original data)
// ----------------------------------------

const staffCategories = [
  {
    title: "Head Team",
    members: [
      [
        {
          name: "Ankit Raj",
          designation: "Head",
          image: "/images/our-team/Ankit Raj_Head.jpg",
        },
        {
          name: "Priyasha",
          designation: "Head",
          image: "/images/our-team/dummy.png",
        },
      ],
    ],
  },
  {
    title: "Core Team",
    members: [
      [
        {
          name: "Imran",
          designation: "Devops Core",
          image: "/images/our-team/dummy.png",
        },
        {
          name: "Hitesh Singh",
          designation: "Spons & Finance Core",
          image: "/images/our-team/Hitesh Singh_Spons&finance_Core.jpg",
        },
      ],
      [
        {
          name: "Aatman Vashi",
          designation: "Media Core",
          image: "/images/our-team/Aatman Vashi_Media_Core.jpg",
        },
        {
          name: "Kaarthik Ellappan",
          designation: "Media and Food Core",
          image: "/images/our-team/Kaarthi Ellapan media and food core_.jpg",
        },
        {
          name: "Neeraj",
          designation: "Media Core",
          image: "/images/our-team/Neeraj_Media_Core.jpg",
        },
      ],
      [
        {
          name: "Aryan",
          designation: "Hospitality Core",
          image: "/images/our-team/Aryan_Hospitality_Core.jpg",
        },
        {
          name: "Vikas M N",
          designation: "Hospitality Core",
          image: "/images/our-team/Vikas M N_Hospitality_Core.JPG",
        },
        {
          name: "Aparna",
          designation: "Hospitality Core",
          image: "/images/our-team/dummy.png"
        },
      ],
      [
        {
          name: "Kartik Warrier",
          designation: "Events Core",
          image: "/images/our-team/Karthik Warrier_Events_core.jpg",
        },
        {
          name: "Aakash",
          designation: "Events Core",
          image: "/images/our-team/Aakash_Events_core.jpg",
        },
        {
          name: "Piyush",
          designation: "Events Core",
          image: "/images/our-team/dummy.png"
        },
      ],
      [
        {
          name: "Nagul",
          designation: "Design Core",
          image: "/images/our-team/dummy.png"
        },
        {
          name: "Rushwith",
          designation: "Food Core",
          image: "/images/our-team/dummy.png"
        },
      ],
    ],
  },
  {
    title: "Sports Officers",
    members: [
      [
        {
          name: "Dr. EDINBROW PAKIARAJ",
          designation: "Sports Officer",
          email: "ebrow@zmail.iitm.ac.in",
          phone: "9840077074",
          image: "/images/staff/edinbrow.jpg",
        },
        {
          name: "Dr. VASUDEVA RAO V",
          designation: "Sports Officer",
          email: "vvrao@iitm.ac.ac",
          phone: "7978240032",
          image: "/images/staff/vasudeva-rao.jpg",
        },
      ],
    ],
  },
  {
    title: "Physical Training Instructors (PTIs)",
    members: [
      [
        {
          name: "Mr. G JAYAVEL",
          designation: "PTI Gr - I",
          email: "gjayavel@zmail.iitm.ac.in",
          phone: "9626064769",
          image: "/images/staff/jayavel.jpg",
        },
        {
          name: "Mr. RAJENDRAN G",
          designation: "PTI",
          email: "rajendrang03@gmail.com",
          phone: "9790972294",
          image: "/images/staff/rajendran.jpg",
        },
        {
          name: "Mr. ASHOK SAMRAT YADHAV",
          designation: "PTI",
          email: "ashoksamrat222@gmail.com",
          phone: "9810967049",
          image: "/images/staff/ashok-samrat.jpg",
        },
        {
          name: "Mr. ASHOK M",
          designation: "PTI",
          email: "ashokhoc07@gmail.com",
          phone: "8754286553",
          image: "/images/staff/ashok-m.jpg",
        },
      ],
    ],
  },
  {
    title: "Instructors & Coaches",
    members: [
      [
        {
          name: "Mr. DHANASEKARAN C",
          designation: "Sports Instructor",
          email: "dsdhana21@gmail.com",
          phone: "8608539828",
          image: "/images/staff/dhanasekaran.jpg",
        },
        {
          name: "Mr. VEDAN SHATISH RAJ K",
          designation: "Sports Instructor",
          email: "soccervedan17@gmail.com",
          phone: "8220324557",
          image: "/images/staff/vedan.jpg",
        },
      ],
    ],
  },
  {
    title: "Office Administration",
    members: [
      [
        {
          name: "Mr. M SARAVANAN",
          designation: "Junior Superintendent",
          email: "msaravanan@iitm.ac.in",
          phone: "9566120443",
          image: "/images/staff/saravanan.jpg",
        },
        {
          name: "Mr. SETHURAMAN",
          designation: "Senior Assistant",
          email: "sethuiit@iitm.ac.in",
          phone: "6380397094",
          image: "/images/staff/sethuraman.jpg",
        },
        {
          name: "Mr. KARTHIKEYAN",
          designation: "Secretary",
          email: "karthik.j.king@gmail.com",
          phone: "9791042980",
          image: "/images/staff/karthikeyan.jpg",
        },
        {
          name: "Ms. THANU SHREE SS",
          designation: "Junior Executive",
          email: "thanusrinivasan22@gmail.com",
          phone: "8682084700",
          image: "/images/staff/thanu-shree.jpg",
        },
      ],
    ],
  },
];

// ----------------------------------------
// STAFF CARD COMPONENT (REVISED)
// ----------------------------------------

function StaffCard({ member }) {
    // Fallback URL for the avatar if image path is missing
    const avatar = member.image
        ? member.image
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
            member.name
        )}&background=random&color=fff&size=200`;

    return (
        // Main container is relative for absolute children
        <div className="relative h-70 w-60 rounded-2xl item-center overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.03]">
            {/* 1. Background Image */}
            <img
                src={avatar}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* 3. Text Content (Bottom Aligned and CENTERED) */}
            <div className="absolute bottom-0 p-6 w-full text-center">
                <h3 className="text-xl font-extrabold text-white leading-tight">
                    {member.name}
                </h3>
                <p className="text-sm font-semibold text-white/90 tracking-wide mt-1 uppercase">
                    {member.designation}
                </p>

                {/* Contact Icons (Centered) */}
                <div className="mt-4 flex items-center justify-center gap-3">
                    {member.phone && (
                        <a
                            href={`tel:${member.phone}`}
                            title={`Call ${member.name}`}
                            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
                        >
                            <Phone className="w-4 h-4" />
                        </a>
                    )}
                    {member.email && (
                        <a
                            href={`mailto:${member.email}`}
                            title={`Email ${member.name}`}
                            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------
// MAIN PAGE
// ----------------------------------------
export default function ContactPage() {
  // Utility class for the repeating blue/teal bar design
  const TitleBar = ({ title }) => (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-2 h-8 bg-[#2d7f8a] rounded-full"></div>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f6f7f9] pt-30 relative">
      <div
        className="absolute right-0 top-0 w-[40%] h-full bg-no-repeat bg-right opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/athlete-pattern.png')" }}
      />

      {/* Main Heading Section */}
      <section className="relative text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#aa0e0e]">
          Contact Our Team
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-lg">
          Reach out to the Sports Officers and Gymkhana Staff of Inter IIT Sports
          Meet 2025.
        </p>
      </section>

      {/* Gymkhana Office Info Block */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-lg border border-gray-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-[#aa0e0e] text-white shadow-md">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Office of the Gymkhana
              </h3>
              <p className="text-gray-600 text-sm">
                Indian Institute of Technology Madras, Chennai - 600036
              </p>
            </div>
          </div>

          <a
            target="_blank"
            href="https://maps.app.goo.gl/W3GciRchrTKCYrA99"
            className="px-6 py-3 rounded-xl bg-red-800 hover:bg-red-800 transition text-white font-medium shadow-md flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            View Location
          </a>
        </div>
      </div>

      {/* Staff Categories Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20 space-y-16">
        {staffCategories.map((category, index) => (
          <section key={index}>
            <TitleBar title={category.title} />

            {/* Adjusted grid for better use of space */}
            <div className="flex flex-col items-center gap-10">
              {category.members.map((group, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="flex flex-wrap justify-center gap-8"
                  >
                    {(Array.isArray(group) ? group : [group])
                      .filter(m => m && m.name)
                      .map((member, i) => (
                        <StaffCard key={i} member={member} />
                      ))}
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}