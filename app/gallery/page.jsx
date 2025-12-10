// app/gallery/page.jsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Head from "next/head";

// Data (extend later for other IITs)
const GALLERY_DATA = [
  {
    src: "/images/gallery/pic1.jpg",
    full: "/images/gallery/pic1.jpg",
    alt: "Athletics team of IIT Madras during Inter IIT Sports Meet 2025",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/pic2.jpg",
    full: "/images/gallery/pic2.jpg",
    alt: "Cricket match highlights from IIT Madras",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/pic3.jpg",
    full: "/images/gallery/pic3.jpg",
    alt: "Football players in action at IIT Madras",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/win1.png",
    full: "/images/gallery/pic4.jpg",
    alt: "Winning moment of IIT Madras athletes",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/pic5.jpg",
    full: "/images/gallery/pic5.jpg",
    alt: "Team huddle before match at Inter IIT Sports Meet",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/pic6.jpg",
    full: "/images/gallery/pic6.jpg",
    alt: "Volleyball highlights from IIT Madras",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/outdoor1.png",
    full: "/images/gallery/outdoor1.png",
    alt: "Outdoor practice session at Inter IIT Sports Meet",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/win2.png",
    full: "/images/gallery/win2.png",
    alt: "Victory celebration of IIT Madras players",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/pic9.jpg",
    full: "/images/gallery/pic9.jpg",
    alt: "Track and field athletes competing",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/pic8.jpg",
    full: "/images/gallery/pic8.jpg",
    alt: "Group photo of IIT Madras sports team",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/outdoor2.png",
    full: "/images/gallery/outdoor2.png",
    alt: "Spectators cheering during outdoor sports",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/win3.png",
    full: "/images/gallery/win3.png",
    alt: "Medal ceremony for winners",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/win4.png",
    full: "/images/gallery/win4.png",
    alt: "Championship trophy being lifted",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/aqua1.JPG",
    full: "/images/gallery/aqua1.JPG",
    alt: "players playing water pollo with attacker trying to shoot past a defender",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/aqua2.JPG",
    full: "/images/gallery/aqua2.JPG",
    alt: "two players face to face each other in water pollo",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/aqua3.JPG",
    full: "/images/gallery/aqua3.JPG",
    alt: "team celebrating in a circle after win",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/aqua4.JPG",
    full: "/images/gallery/aqua4.JPG",
    alt: "swimmers doing backstroke in the backstroke swimming competition",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/aqua5.JPG",
    full: "/images/gallery/aqua5.JPG",
    alt: "player diving in the water",
    tags: ["madras"],
  },
];

export default function Page() {
  const [active, setActive] = useState("all");

  const filters = [
    { value: "all", label: "Show All" },
    { value: "madras", label: "IIT Madras" },
    { value: "hyderabad", label: "IIT Hyderabad" },
    { value: "tirupati", label: "IIT Tirupati" },
  ];

  const filteredItems = useMemo(() => {
    if (active === "all") return GALLERY_DATA;
    return GALLERY_DATA.filter((it) => it.tags.includes(active));
  }, [active]);

  const nothingToShow = filteredItems.length === 0;

  return (
    <>
      <Head>
        <title>Gallery | Inter IIT Sports Meet 2025</title>
        <meta
          name="description"
          content="Explore the official gallery of Inter IIT Sports Meet 2025. See highlights, team celebrations, and sports action across IIT Madras, IIT Hyderabad, and IIT Tirupati."
        />
        <meta
          name="keywords"
          content="Inter IIT Sports Meet 2025 gallery, IIT Madras sports photos, IIT Hyderabad, IIT Tirupati, athletics, cricket, football, volleyball, intercollegiate sports"
        />
        <link rel="canonical" href="https://interiitsports.in/gallery" />
      </Head>

      {/* Banner */}
      <section
        className="dez-bnr-inr overlay-black-middle h-64 sm:h-80 lg:h-[26rem] bg-center bg-cover"
        style={{ backgroundImage: "url(/images/gallery/gallerybanner.png)", fontFamily: "'Nunito Sans', sans-serif" }}
        aria-label="Gallery banner"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="dez-bnr-inr-entry h-full flex items-end sm:items-center py-8 sm:py-10">
            <h1 className="text-white text-3xl sm:text-4xl font-extrabold">Gallery</h1>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="list-inline flex items-center gap-2 text-white/90">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li className="opacity-80">/</li>
              <li>Gallery</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Intro text (SEO friendly) */}
      <section className="content-area py-6 sm:py-8 lg:py-8" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <p className="text-gray-700 text-lg">
            The Inter IIT Sports Meet 2025 gallery showcases unforgettable
            highlights from athletics, cricket, football, volleyball, and more.
            Explore moments of determination, celebration, and sportsmanship
            captured across IIT Madras, IIT Hyderabad, and IIT Tirupati.
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="content-area py-10 sm:py-12 lg:py-10" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="site-filters clearfix center m-b40 mb-10">
            <ul className="filters filters1 flex flex-wrap items-center justify-center gap-3">
              {filters.map((f) => {
                const isActive = active === f.value;
                return (
                  <li key={f.value} className={`btn ${isActive ? "active" : ""}`}>
                    <button
                      type="button"
                      onClick={() => setActive(f.value)}
                      className={[
                        "site-button-secondry px-4 py-2 rounded transition-colors",
                        isActive
                          ? "bg-[#6C291F] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100",
                      ].join(" ")}
                      aria-pressed={isActive}
                    >
                      {f.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Grid */}
          <div className="clearfix">
            <ul className="dez-gallery-listing grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, idx) => (
                <li key={idx} className={["card-container", ...item.tags].join(" ")}>
                  <figure className="dez-box dez-gallery-box bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="dez-thum dez-img-overlay1 dez-img-effect zoom-slow">
                      <a href={item.full ?? item.src}>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={800}
                          height={600}
                          className="w-full h-64 sm:h-72 lg:h-80 object-cover"
                        />
                      </a>
                    </div>
                  </figure>
                </li>
              ))}
            </ul>

            {nothingToShow && (
              <div className="text-center py-16">
                <p className="text-gray-600">
                  No photos yet for this IIT. Check back soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
