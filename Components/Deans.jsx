"use client";
import { useState } from "react";

const deans = [
  {
    name: "Prof. Sathyanarayana N Gummadi",
    position: "Dean, IIT Madras",
    image: "/images/our-team/team-2.png",
    message: `As IIT Madras leads this edition of Inter IIT Sports in collaboration with IIT Hyderabad and IIT Tirupati, this meet stands as a testament to the IIT fraternity’s shared commitment to sports, health, leadership, and holistic student growth. The Inter IIT Sports Meet 2025 is a celebration of youthful spirit, resilience, and unity.

This Meet is not only about winning medals but about building character, forging friendships, and nurturing values that last a lifetime. Sports have the power to unite people. Sports are not only about competition; it is a medium to bring society together and inspire youth towards a healthier life.

I take pride in the athletes who compete with passion, the volunteers who serve with dedication, and the spectators who cheer with heart. Behind this grand event are the tireless efforts of many committees, volunteers, steered by the Executive Committee, ensuring smooth execution and a memorable experience for all.

My heartfelt wish is that every participant carries from this Meet not just achievements, but memories of camaraderie, lessons of discipline, and the inspiration to lead a healthier, fuller life.`,
  },
  {
    name: "Prof. R Prasanth Kumar",
    position: "Dean, IIT Hyderabad",
    image: "/images/our-team/team-5.png",
    message: "It gives me immense pride to welcome you all to the Inter IIT Sports Meet, jointly hosted this year by IIT Hyderabad, IIT Madras, and IIT Tirupati. This edition holds special significance for IIT Hyderabad, as we are taking up the responsibility of hosting the Inter IIT Sports Meet for the very first time since our inception. The Meet has always been a celebration of athletic spirit, camaraderie, and the shared values that unite the IIT community.\n\n           \t I encourage all participants to play with passion, fairness, and respect — for the game, for your opponents, and for yourselves. May this meet not only bring out the best in your sporting abilities but also forge friendships and memories that last a lifetime. On behalf of IIT Hyderabad, I extend a warm welcome and wish every athlete, staff member, and supporter a truly enriching and inspiring experience.",
   },
  {

  name: "Prof. N. N. Murty",
  position: "Dean, IIT Tirupati",
  image: "/images/dean_iit_tirupathi.jpg",
  message: `Welcome to the 58th Inter IIT Sports Meet! This annual celebration showcases the spirit of teamwork, discipline, and resilience across IITs. IIT Tirupati is honoured to co-host this prestigious event alongside IIT Madras and IIT Hyderabad.

Our organizing committee and dedicated volunteers have worked tirelessly to ensure a professional and enriching experience for every participant. We wish all teams success and encourage you to compete with integrity, respect, and true sportsmanship. May this tournament strengthen bonds among IITs and inspire the pursuit of excellence.

We look forward to hosting you on our campus and witnessing outstanding performances at the highest level.`,
}

];

export default function DeansSection() {
  const [modalDean, setModalDean] = useState(null);

  return (
    <section className="py-16 bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Intro text */}
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Leadership And Guidance Of The Deans
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          The Deans of IIT Madras, IIT Hyderabad, and IIT Tirupati provide guidance and
          mentorship across academic, research, and student life initiatives. Their
          collaborative vision ensures that students excel in both academics and
          extracurricular activities, fostering excellence, leadership, and teamwork.
        </p>
      </div>

      {/* Deans row */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 justify-items-center">
        {deans.map((dean, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg flex flex-col w-full max-w-sm transition hover:shadow-xl"
          >
            {/* Full image */}
            <img
              src={dean.image}
              alt={dean.name}
              className="w-full object-contain mb-4 rounded-t-xl"
            />

            {/* Card content */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <h3 className="text-lg font-bold mb-1">{dean.name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-base">{dean.position}</p>
                <button
                  onClick={() => setModalDean(dean)}
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
      {modalDean && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setModalDean(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-2">{modalDean.name}</h3>
            <p className="text-gray-700 mb-4">{modalDean.position}</p>
            <p className="text-gray-700 whitespace-pre-line">{modalDean.message}</p>
          </div>
        </div>
      )}
    </section>
  );
}
