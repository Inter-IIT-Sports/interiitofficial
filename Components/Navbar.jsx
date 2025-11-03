"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// --- Schedule Dropdown (Desktop) ---



const DesktopScheduleDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-1/2 transform  mt-6 w-[280px] rounded-[20px] bg-black/50 border border-gray-200 z-50 shadow-lg"
      style={{ 
        // Safari-safe: prevent blurry text from transform
        WebkitTransform: 'translateX(-50%)',
        transform: 'translateX(-50%)',
        // Ensure sharp rendering
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      <div className="flex">
        <Link
          href="/schedule/aquatics"
          onClick={onClose}
          className="flex-1 flex items-center justify-center px-3 py-2.5 text-center text-sm md:text-base font-semibold text-gray-100
             transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] whitespace-nowrap"
        >
          🏊 Aquatics Meet
        </Link>
        <div className="w-px h-5 my-auto bg-gray-300" />
        <Link
          href="/schedule/main-meet"
          onClick={onClose}
          className="flex-1 flex items-center justify-center px-3 py-2.5 text-center text-sm md:text-base font-semibold text-gray-100
             transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] whitespace-nowrap"
        >
          🏅 Main Meet
        </Link>
      </div>
    </div>
  );
};
// --- Mobile Schedule Accordion ---
const MobileScheduleAccordion = ({ isOpen, onToggle, onLinkClick }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 font-medium text-black flex justify-between items-center rounded-lg hover:bg-gray-50 transition"
        aria-expanded={isOpen}
      >
        <span>Schedule</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        ref={contentRef}
        style={{ height }}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div className="flex flex-col space-y-1 pl-2 pt-1">
          <Link
            href="/schedule/aquatics"
            onClick={onLinkClick}
            className="block px-4 py-2.5 rounded-lg text-gray-600 font-medium   transition hover:scale-105"
          >
            🏊 Aquatics Meet
          </Link>
          <Link
            href="/schedule/main-meet"
            onClick={onLinkClick}
            className="block px-4 py-2.5 rounded-lg text-gray-600 font-medium  transition hover:scale-105"
          >
            🏅 Main Meet
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Main Navbar ---
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isMobileScheduleOpen, setIsMobileScheduleOpen] = useState(false);
  const pathname = usePathname();

  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const desktopScheduleRef = useRef(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Schedule", href: "/schedule" },
    { name: "Legacy", href: "/legacy" },
    { name: "Gallery", href: "/gallery" },
    { name: "Team", href: "/team" },
    { name: "Contact Us", href: "/contact" },
  ];

  const closeAll = useCallback(() => {
    setIsOpen(false);
    setIsScheduleOpen(false);
    setIsMobileScheduleOpen(false);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu if open and click is outside
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        closeAll();
      }

      // Close desktop schedule dropdown if open and click is outside
      if (
        isScheduleOpen &&
        desktopScheduleRef.current &&
        !desktopScheduleRef.current.contains(event.target)
      ) {
        setIsScheduleOpen(false);
      }
    };

    const handleScroll = () => {
      if (isScheduleOpen) {
        setIsScheduleOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, isScheduleOpen, closeAll]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "");
    }
  }, [isOpen]);

  // Auto-close mobile schedule when main menu closes
  useEffect(() => {
    if (!isOpen) setIsMobileScheduleOpen(false);
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-16 md:h-20 bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center h-full space-x-2" onClick={closeAll}>
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16">
              <Image
                src="/logo_2.png"
                alt="InterIIT Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight" style={{ fontFamily: "'Mukta', sans-serif" }}>
              <span className="font-bold text-lg sm:text-xl md:text-2xl tracking-wide text-black">
                Inter IIT
              </span>
              <span className="font-bold text-lg sm:text-xl md:text-2xl tracking-wide">
                <span className="text-sky-600">Sports</span>
                <span className="text-[#800000]">Meet</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div
            className="hidden md:flex items-center space-x-7"
            style={{ fontFamily: "'Mukta', sans-serif" }}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              if (item.name === "Schedule") {
                return (
                  <div key="Schedule" className="relative" ref={desktopScheduleRef}>
                    <button
                      onClick={() => setIsScheduleOpen((s) => !s)}
                      aria-expanded={isScheduleOpen}
                      className="relative inline-flex items-center gap-2 text-base md:text-lg lg:text-xl text-black px-2 py-1 rounded hover:text-sky-600 transition font-medium"
                    >
                      Schedule
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isScheduleOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <DesktopScheduleDropdown
                      isOpen={isScheduleOpen}
                      onClose={() => setIsScheduleOpen(false)}
                    />
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeAll}
                  className="relative inline-block text-base md:text-lg lg:text-xl text-black transition-colors duration-300 group px-1 py-1 font-medium"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-sky-600 via-black to-red-600 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center" ref={buttonRef}>
            <button
              onClick={() => setIsOpen((o) => !o)}
              className="p-2 rounded-md text-black hover:text-sky-600 transition"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <svg className="h-6 w-6 text-[#800000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Panel */}
      <div
        ref={menuRef}
        className={`md:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white/90 backdrop-blur-lg border-r border-sky-600/20 shadow-xl`}
      >
        <div className="flex flex-col items-start px-6 pt-6 pb-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            if (item.name === "Schedule") {
              return (
                <MobileScheduleAccordion
                  key="mobile-schedule"
                  isOpen={isMobileScheduleOpen}
                  onToggle={() => setIsMobileScheduleOpen((s) => !s)}
                  onLinkClick={closeAll}
                />
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeAll}
                className={`block w-full px-4 py-3 font-medium rounded-lg transition ${isActive
                  ? "bg-red-50 text-[#800000] font-semibold border-l-4 border-[#800000]"
                  : "text-gray-800 hover:bg-gray-50"
                  }`}
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