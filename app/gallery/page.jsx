// app/gallery/page.jsx (App Router) — JS version without TypeScript types
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

// Data (extend later for other IITs)
const GALLERY_DATA = [
  {
    src: "/images/gallery/pic1.jpg",
    full: "/images/gallery/pic1.jpg",
    alt: "",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/pic2.jpg",
    full: "/images/gallery/pic2.jpg",
    alt: "",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/pic3.jpg",
    full: "/images/gallery/pic3.jpg",
    alt: "",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/win1.png",
    full: "/images/gallery/pic4.jpg",
    alt: "",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/pic5.jpg",
    full: "/images/gallery/pic5.jpg",
    alt: "",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/pic6.jpg",
    full: "/images/gallery/pic6.jpg",
    alt: "",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/outdoor1.png",
    full: "/images/gallery/outdoor1.png",
    alt: "",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/win2.png",
    full: "/images/gallery/win2.png",
    alt: "",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/pic9.jpg",
    full: "/images/gallery/pic9.jpg",
    alt: "",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/pic8.jpg",
    full: "/images/gallery/pic8.jpg",
    alt: "",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/outdoor2.png",
    full: "/images/gallery/outdoor2.png",
    alt: "",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/win3.png",
    full: "/images/gallery/win3.png",
    alt: "",
    tags: ["madras"],
  },
  {
    src: "/images/gallery/win4.png",
    full: "/images/gallery/win4.png",
    alt: "",
    tags: ["madras"],
  },
  // Add future items with tags: ["hyderabad"] or ["tirupati"]
];

export default function Page() {
  const [active, setActive] = useState("all"); // 'all' | 'madras' | 'hyderabad' | 'tirupati'

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
    <div>
      <section
  className="dez-bnr-inr overlay-black-middle h-64 sm:h-80 lg:h-[26rem] bg-center bg-cover"
  style={{ backgroundImage: "url(/images/gallery/gallerybanner.png)" }}
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


      {/* Content */}
      <section className="content-area py-10 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="site-filters clearfix center m-b40 mb-10">
            <ul
              className="filters filters1 flex flex-wrap items-center justify-center gap-3"
              data-bs-toggle="buttons"
            >
              {filters.map((f) => {
                const isActive = active === f.value;
                return (
                  <li
                    key={f.value}
                    data-filter={f.value === "all" ? "" : `.${f.value}`}
                    className={`btn ${isActive ? "active" : ""}`}
                  >
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
            <ul
              id="masonry1"
              className="dez-gallery-listing gallery-grid-4 m-b0 mfp-gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredItems.map((item, idx) => (
                <li
                  key={idx}
                  className={["card-container", ...item.tags].join(" ")}
                >
                  <figure className="dez-box dez-gallery-box bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="dez-thum dez-img-overlay1 dez-img-effect zoom-slow">
                      <a href="javascript:void(0);">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={800}
                          height={600}
                          className="w-full h-64 sm:h-72 lg:h-80 object-cover"
                        />
                      </a>
                      <div className="overlay-bx">
                        <div className="overlay-icon">
                          <a
                            href={item.full ?? item.src}
                            className="mfp-link"
                            title="."
                          >
                            <i className="fa fa-picture-o icon-bx-xs" />
                          </a>
                        </div>
                      </div>
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
    </div>
  );
}
