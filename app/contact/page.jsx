import React from "react";
import { Mail, Phone, User, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact Us | Inter IIT Sports Meet 2025",
  description:
    "Get in touch with the organizing team, sports officers, and staff of Inter IIT Sports Meet 2025.",
};

// ----------------------------------------
// STAFF DATA
// ----------------------------------------
const staffCategories = [
  {
    title: "Sports Officers",
    members: [
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
        email: "vvrao@iitm.ac.in",
        phone: "7978240032",
        image: "/images/staff/vasudeva-rao.jpg",
      },
    ],
  },

  {
    title: "Physical Training Instructors (PTIs)",
    members: [
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
  },

  {
    title: "Instructors & Coaches",
    members: [
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
  },

  {
    title: "Office Administration",
    members: [
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
  },
];

// ----------------------------------------
// STAFF CARD COMPONENT
// ----------------------------------------
function StaffCard({ member }) {
  const avatar = member.image
    ? member.image
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff&size=128`;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center min-h-[330px]">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-gray-50 shadow-inner">
        <img src={avatar} alt={member.name} className="w-full h-full object-cover" />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>

      <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-4">
        {member.designation}
      </p>

      <div className="w-full space-y-2 mt-auto">
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 py-2 rounded-lg"
          >
            <Mail className="w-4 h-4" />
            <span className="truncate max-w-[200px]">{member.email}</span>
          </a>
        )}

        {member.phone && (
          <a
            href={`tel:${member.phone}`}
            className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors bg-gray-50 py-2 rounded-lg"
          >
            <Phone className="w-4 h-4" />
            <span>{member.phone}</span>
          </a>
        )}

        {!member.email && !member.phone && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400 bg-gray-50 py-2 rounded-lg italic">
            <User className="w-4 h-4" />
            <span>Contact via Office</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------
// MAIN PAGE
// ----------------------------------------
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <section
        className="relative text-white py-16 px-6 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/Gymkhana-photo.jpg')" }}
      >
        <div className="absolute inset-0 bg-slate-900/70"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Contact Our Team</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Get in touch with the Institute Gymkhana staff and Sports Officers for queries related
            to Inter IIT Sports Meet 2025.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-8 mb-12 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100">

          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-full text-blue-700">
              <MapPin className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Office of the Gymkhana</h3>
              <p className="text-gray-600">Indian Institute of Technology Madras, Chennai - 600036</p>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/W3GciRchrTKCYrA99"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md flex items-center gap-2"
          >
            <MapPin className="w-5 h-5" />
            View Location
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 space-y-16">
        {staffCategories.map((category, index) => (
          <section key={index}>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-gray-800">{category.title}</h2>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {category.members.map((member, mIndex) => (
                <div key={mIndex} className="w-full sm:w-[320px]">
                  <StaffCard member={member} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
