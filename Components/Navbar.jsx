"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Schedule", href: "/schedule" },
    { name: "Legacy", href: "/legacy" },
    { name: "Gallery", href: "/gallery" },
    { name: "Team", href: "/team" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 h-16 md:h-20 bg-white shadow-md"
    >
      <div className="px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo + Title */}
          <Link href="/" className="flex items-center h-full space-x-2">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16">
              <Image
                src="/logo_2.png"
                alt="InterIIT Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col  leading-tight" style={{ fontFamily: "'Mukta', sans-serif" }}>
              <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-2xl tracking-wide text-black">
                Inter IIT
              </span>
              <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-2xl tracking-wide">
                <span className="text-sky-600">Sports</span>
                <span className="text-[#800000]">Meet</span>
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="cursor-pointer hidden md:flex items-center space-x-8 lg:space-x-8"
          style={{ fontFamily: "'Mukta',sans-serif" }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative inline-block text-base md:text-lg lg:text-xl  text-black transition-colors duration-300 group"
                >
                  <span className="relative z-10">{item.name}</span>

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-sky-600 via-black to-red-600 transition-all duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  />

                  <span
                    className={`absolute inset-0 bg-gradient-to-r from-sky-600 via-black to-red-[#800000]  bg-clip-text text-transparent transition-opacity duration-300
                      ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen((s) => !s)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-md transition-colors"
            >
              {!isOpen ? (
                <svg
                  className="h-6 w-6 text-black cursor-pointer font-bold"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-[#800000] cursor-pointer font-bold"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          bg-white/40 backdrop-blur-lg border-r border-sky-600/40 shadow-xl`} style={{ fontFamily: "'Mukta', sans-serif" }}
      >
        <div className="flex flex-col items-start px-6 pt-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative cursor-pointer block px-4 py-2 font-medium transition-colors duration-300
                  ${isActive ? "border-l-4 border-[#800000] font-semibold" : "text-black"}
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
