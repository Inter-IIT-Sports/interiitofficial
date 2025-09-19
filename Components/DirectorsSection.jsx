"use client";
import { useState } from "react";

const directors = [
  {
    name: "Prof. V. Kamakoti",
    position: "Director, IIT Madras",
    image: "/images/our-team/director1.png",
    message: `The IITs were established with a national vision — to nurture leaders, innovators, and nation-builders. Alongside academics and research, sports are integral to this mission, for they foster resilience, discipline, teamwork, and leadership.

The Inter IIT Sports Meet 2025, hosted by IIT Madras with IIT Hyderabad and IIT Tirupati, is not just a competition but a celebration of unity, friendship, and holistic student growth. It embodies the spirit of Ek Bharat Shreshtha Bharat and strengthens our collective journey towards Viksit Bharat.

In line with the NEP 2020 and the National Sports Policy 2025, IIT Madras has expanded its sporting ecosystem. The recently established SITARA Centre, made possible through the generosity of its benefactor, stands as a beacon of sporting excellence. Together with Sports Admissions through JEE Advanced, it reflects our commitment to integrating education and sports for holistic development.

This Sports Meet, therefore, is more than medals and trophies. It represents the IIT fraternity’s belief in sports as a pathway to character-building, national integration, and preparing youth to serve India on the global stage.

I extend my best wishes to every athlete, volunteer, supporter, and stakeholder.`,
  },
  {
    name: "Prof. B. S. Murty",
    position: "Director, IIT Hyderabad",
    image: "/images/our-team/director2.png",
    message: `The IITs were established with a national vision — to nurture leaders, innovators, and nation-builders. Alongside academics and research, sports are integral to this mission, for they foster resilience, discipline, teamwork, and leadership.

The Inter IIT Sports Meet 2025, hosted by IIT Madras with IIT Hyderabad and IIT Tirupati, is not just a competition but a celebration of unity, friendship, and holistic student growth. It embodies the spirit of Ek Bharat Shreshtha Bharat and strengthens our collective journey towards Viksit Bharat.

In line with the NEP 2020 and the National Sports Policy 2025, IIT Madras has expanded its sporting ecosystem. The recently established SITARA Centre, made possible through the generosity of its benefactor, stands as a beacon of sporting excellence. Together with Sports Admissions through JEE Advanced, it reflects our commitment to integrating education and sports for holistic development.

This Sports Meet, therefore, is more than medals and trophies. It represents the IIT fraternity’s belief in sports as a pathway to character-building, national integration, and preparing youth to serve India on the global stage.

I extend my best wishes to every athlete, volunteer, supporter, and stakeholder..`,
  },
  {
    name: "Prof. G. Prasad",
    position: "Director, IIT Tirupati",
    image: "/images/our-team/director3.png",
    message: `The IITs were established with a national vision — to nurture leaders, innovators, and nation-builders. Alongside academics and research, sports are integral to this mission, for they foster resilience, discipline, teamwork, and leadership.

The Inter IIT Sports Meet 2025, hosted by IIT Madras with IIT Hyderabad and IIT Tirupati, is not just a competition but a celebration of unity, friendship, and holistic student growth. It embodies the spirit of Ek Bharat Shreshtha Bharat and strengthens our collective journey towards Viksit Bharat.

In line with the NEP 2020 and the National Sports Policy 2025, IIT Madras has expanded its sporting ecosystem. The recently established SITARA Centre, made possible through the generosity of its benefactor, stands as a beacon of sporting excellence. Together with Sports Admissions through JEE Advanced, it reflects our commitment to integrating education and sports for holistic development.

This Sports Meet, therefore, is more than medals and trophies. It represents the IIT fraternity’s belief in sports as a pathway to character-building, national integration, and preparing youth to serve India on the global stage.

I extend my best wishes to every athlete, volunteer, supporter, and stakeholder.`,
  },
];

export default function DirectorsSection() {
  const [modalDirector, setModalDirector] = useState(null);

  return (
    <section className="py-16 bg-gray-50">
      {/* Intro text */}
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          JOINT LEADERSHIP AND PRIDE OF THE IITS
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          IITs are delighted that IIT Madras, IIT Hyderabad, and IIT Tirupathi are
          jointly hosting the Inter IIT Sport Meet 2025. This collaboration reflects
          the unity of the IIT fraternity and our shared commitment to nurturing
          sports, health, leadership, and team spirit. We warmly welcome participants,
          guests, officials, well-wishers, and all stakeholders to this celebration
          of talent and fostering excellence.
        </p>
      </div>

      {/* Directors row */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 justify-items-center">
        {directors.map((director, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg flex flex-col w-full max-w-sm transition hover:shadow-xl"
          >
            {/* Full image with original height */}
            <img
              src={director.image}
              alt={director.name}
              className="w-full object-contain mb-4 rounded-t-xl"
            />

            {/* Card content */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <h3 className="text-lg font-bold mb-1">{director.name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-base">{director.position}</p>
                <button
                  onClick={() => setModalDirector(director)}
                  className="relative cursor-pointer text-[#7b1e1e] hover:text-sky-400 text-base font-medium transition-colors duration-300 after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-sky-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Read Message →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalDirector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setModalDirector(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-2">{modalDirector.name}</h3>
            <p className="text-gray-700 mb-4">{modalDirector.position}</p>
            <p className="text-gray-700 whitespace-pre-line">{modalDirector.message}</p>
          </div>
        </div>
      )}
    </section>
  );
}
