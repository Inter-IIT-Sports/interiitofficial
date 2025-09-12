"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Schedule", href: "/Schedule" },
    { name: "Legacy", href: "/legacy" },
    { name: "Gallery", href: "/gallery" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-16 bg-gradient-to-r from-sky-500 via-black to-red-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo + Title */}
          <Link href="/" className="flex items-center h-full space-x-2">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16">
              <Image
                src="/logo_2.png"
                alt="InterIIT Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight text-white">
              <span className="font-bold text-lg md:text-xl tracking-wide">
                Inter IIT
              </span>
              <span className="font-bold text-lg md:text-xl tracking-wide">
                <span className="text-sky-300">Sports</span>{" "}
                <span className="text-red-400">Meet</span>
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative inline-block text-base font-medium text-white transition-colors duration-300 group"
              >
                <span className="relative z-10">{item.name}</span>
                {/* Gradient underline */}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-black via-sky-500 to-red-600 transition-all duration-300 group-hover:w-full" />
                {/* Gradient text on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-black via-sky-500 to-red-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.name}
                </span>
              </Link>
            ))}
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
                // Hamburger Icon
                <svg
                  className="h-6 w-6 text-sky-300"
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
                // X Icon
                <svg
                  className="h-6 w-6 text-red-400"
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
        className={`md:hidden absolute top-full left-0 w-full z-40 transform origin-top transition-all duration-200 ${
          isOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div className="w-full bg-gradient-to-r from-sky-500 via-black to-red-800 shadow-md">
          <div className="px-4 pt-3 pb-5 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white transition-colors duration-200 hover:bg-gradient-to-r hover:from-black hover:via-sky-500 hover:to-red-700"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
