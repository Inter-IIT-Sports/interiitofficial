"use client";
import { useState, useEffect } from "react";
import VideoCarousel from "./VideoCarousel";
import DirectorsSection from "./DirectorsSection";
import DeansSection from "./Deans";
import CommitteesSection from "./CommitteesSection";
import ParticipatingIITs from "./ParticipatingIITs";


export default function HeroWithText() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/background/slider1.png"
          alt="Hero Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </section>

      {/* Video Carousel */}
      <section className="w-full px-4 md:px-8 overflow-hidden">
        <VideoCarousel />
      </section>
      <section className="w-full px-4 md:px-8 overflow-hidden">
        <DirectorsSection />
      </section>
      <section className="w-full px-4 md:px-8 overflow-hidden">
        <DeansSection />
      </section>
      <section className="w-full px-4 md:px-8 overflow-hidden">
        <CommitteesSection />
      </section>
      <section className="w-full px-4 md:px-8 overflow-hidden">
        <ParticipatingIITs />
      </section>
    </>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import TextType from "./TextType";
// import VideoCarousel from "./VideoCarousel";
// import DirectorsSection from "./DirectorsSection";


// export default function Home() {
//     const [timeLeft, setTimeLeft] = useState({
//         days: 0,
//         hours: 0,
//         minutes: 0,
//         seconds: 0,
//     });

//     useEffect(() => {
//         const calculateTimeLeft = () => {
//             const eventDate = new Date("December 14, 2025 00:00:00").getTime();
//             const now = new Date().getTime();
//             const difference = eventDate - now;

//             if (difference > 0) {
//                 setTimeLeft({
//                     days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//                     hours: Math.floor(
//                         (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//                     ),
//                     minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
//                     seconds: Math.floor((difference % (1000 * 60)) / 1000),
//                 });
//             }
//         };

//         calculateTimeLeft();
//         const timer = setInterval(calculateTimeLeft, 1000);
//         return () => clearInterval(timer);
//     }, []);

//     return (
//         <>
//         <section className="relative w-full bg-[#f8f4ee] my-0 py-10 md:py-16 overflow-hidden">
//             {/* Background texture */}
//             {/* <div className="absolute inset-0 opacity-15">
//                 <Image
//                     src="/bg-pattern.png"
//                     alt="background texture"
//                     fill
//                     className="object-cover"
//                 />
//             </div> */}

//             <div className="relative z-10  mx-auto px-4 md:px-8 text-center">
//                 {/* Top Logo */}
//                 <div className="flex justify-center mb-4 md:mb-6">
//                     <Image
//                         src="/logo_2.png"
//                         alt="Inter IIT Logo"
//                         width={170}
//                         height={150}
//                         priority
//                     />
//                 </div>

//                 {/* Title */}
//                 <h2 className="text-base md:text-[28px] font-semibold tracking-wide mb-1 text-gray-800">
//                     WELCOME TO THE
//                 </h2>
//                 <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-[#7b1e1e] mb-2">
//                     <TextType
//                         text={["58TH INTER IIT SPORTS MEET 2025", ""]}
//                         typingSpeed={75}
//                         pauseDuration={1500}
//                         showCursor={true}
//                         cursorCharacter="|"
//                     />
//                 </h1>
//                 <p className="italic text-sm md:text-[26px] text-gray-500 mb-8 md:mb-10">
//                     Co-hosted by
//                 </p>


//                 {/* Co-host logos */}
//                 <div className="mt-10 px-4">
//                     <div className="flex flex-col md:flex-row justify-evenly items-center space-y-3 md:space-y-0 md:space-x-6">
//                         {/* IIT Madras */}
//                         <div className="flex flex-col items-center flex-shrink-0 w-28 sm:w-32 md:w-36">
//                             <Image
//                                 src="/images/alliits/IIT Madras.webp"
//                                 alt="IIT Madras Logo"
//                                 width={150}
//                                 height={150}
//                                 className="object-contain"
//                             />
//                             <p className="mt-2 font-semibold text-sm md:text-base text-gray-800">
//                                 IIT MADRAS
//                             </p>
//                         </div>

//                         {/* IIT Hyderabad */}
//                         <div className="flex flex-col items-center flex-shrink-0 w-32 sm:w-36 md:w-40">
//                             <Image
//                                 src="/images/alliits/IIT Hyderabad.webp"
//                                 alt="IIT Hyderabad Logo"
//                                 width={190}
//                                 height={190}
//                                 className="object-contain"
//                             />
//                             {/* <p className="mt-2 font-semibold text-sm md:text-base text-gray-800">
//                                 IIT HYDERABAD
//                             </p> */}
//                         </div>

//                         {/* IIT Tirupati */}
//                         <div className="flex flex-col items-center flex-shrink-0 w-28 sm:w-32 md:w-36">
//                             <Image
//                                 src="/images/alliits/IIT TIRUPATI.webp"
//                                 alt="IIT Tirupati Logo"
//                                 width={200}
//                                 height={190}
//                                 className="object-contain"
//                             />
//                             <p className="mt-2 font-semibold text-sm md:text-base text-gray-800">
//                                 IIT TIRUPATHI
//                             </p>
//                         </div>
//                     </div>
//                 </div>



//                 {/* Countdown Timer */}
//                 {/* <div className="mt-10">
//                     <h3 className="text-base md:text-xl text-gray-800 mb-4 font-semibold">
//                         Main Meet Starts In
//                     </h3>
//                     <div className="flex gap-3 md:gap-5 justify-center flex-wrap">
//                         {Object.entries(timeLeft).map(([unit, value]) => (
//                             <div
//                                 key={unit}
//                                 className="w-20 h-20 md:w-24 md:h-24 bg-white shadow-md rounded-xl flex flex-col items-center justify-center"
//                             >
//                                 <span className="text-lg md:text-2xl font-bold text-[#7b1e1e]">
//                                     {value}
//                                 </span>
//                                 <span className="text-xs md:text-sm font-medium capitalize text-gray-600">
//                                     {unit}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                 </div> */}

                
//             </div>
//         </section>
//         <section>
//             <VideoCarousel/>
//         </section>
//         <section>
//             {/* <DirectorsSection/> */}
//         </section>
//         </>
//     );
// }


