"use client";
import React, { useState } from "react";

const committees = {
  "IIT Madras": [
    { role: "Chairperson", name: "Prof. V. Kamakoti", designation: "Director" },
    { role: "Members", name: "Prof. Sathyanarayana N. Gummadi", designation: "Dean Students" },
    { role: "Members", name: "Prof. Arul Prakash K", designation: "Advisor Sports" },
    { role: "Members", name: "Prof. Shruti Dubey", designation: "Co Advisor Sports" },
    { role: "Members", name: "Prof. Sudakar Chandran", designation: "Co Advisor Sports" },
    { role: "Secretary", name: "Dr. Edinbrow Pakiaraj", designation: "Sports Officer" },
  ],
  "IIT Hyderabad": [
    { role: "Chairperson", name: "Prof. B. S. Murty", designation: "Director" },
    { role: "Members", name: "Prof. R Prasanth Kumar", designation: "Dean Students" },
    // { role: "Members", name: "", designation: "Advisor Sports" },
    { role: "Secretary", name: "Md. Akbar", designation: "Sports Officer" },
  ],
  "IIT Tirupati": [
    { role: "Chairperson", name: "K. N. Satyanarayana", designation: "Director" },
    { role: "Members", name: "Prof. N. N. Murty", designation: "Dean Students" },
    // { role: "Secretary", name: "Dr. Anil K", designation: "Sports Officer" },
  ],
};

export default function CommitteesSection() {
  const [selectedIIT, setSelectedIIT] = useState("IIT Madras");

  // Group members by role
  const groupedMembers = committees[selectedIIT].reduce((acc, member) => {
    if (!acc[member.role]) acc[member.role] = [];
    acc[member.role].push(member);
    return acc;
  }, {});

  return (
    <section className="py-16 bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Section Intro */}
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Montserrat',sans-serif" }}>
          Committees And Coordination
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
          The Inter IIT Sports Meet 2025 is powered by the collective efforts of numerous dedicated committees.
          The Executive Committee provides overall direction, while teams across logistics, hospitality,
          sports management, and student engagement ensure smooth execution. The hard work, dedication, and expertise
          of every member in various committees play a vital role in making this event successful.
        </p>
      </div>

      {/* IIT Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12 px-4">
        {Object.keys(committees).map((iit) => (
          <button
            key={iit}
            onClick={() => setSelectedIIT(iit)}
            className={`px-5 py-2 font-semibold rounded-lg transition-all duration-300 ${selectedIIT === iit
                ? "bg-[#7b1e1e] text-white shadow-lg"
                : "bg-white text-gray-700 cursor-pointer hover:bg-sky-300 shadow"
              }`}
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            {iit}
          </button>
        ))}
      </div>

      {/* Modern Table */}
      <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
          <thead>
            {/* <tr className="bg-gray-200">
              <th className="py-2 px-4 border-r border-gray-300 text-left">#</th>
              <th className="py-2 px-4 border-r border-gray-300 text-left">Name</th>
              <th className="py-2 px-4 text-left">Designation</th>
            </tr> */}
          </thead>
          <tbody>
            {Object.entries(groupedMembers).map(([role, members]) => (
              <React.Fragment key={role}>
                {/* Role header row */}
                <tr className="bg-gray-100">
                  <td
                    className="py-2 px-4 font-semibold text-sky-500 border-t border-b border-gray-300"
                    colSpan={3}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {role}
                  </td>
                </tr>

                {/* Member rows */}
                {members.map((member, idx) => (
                  <tr key={member.name} className="hover:bg-gray-50 transition">
                    {/* <td className="py-2 px-4 border-r border-gray-300">{idx + 1}</td> */}
                    <td className="py-2 px-4 border-r border-gray-300">{member.name}</td>
                    <td className="py-2 px-4">{member.designation}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
