"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Schedule", href: "/Schedule" },
        { name: "Legacy", href: "/Legacy" },
        { name: "Gallery", href: "/Gallery" },
        { name: "Team", href: "/Team" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 h-16 transition-colors duration-300 border-b ${scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-200"
                    : "bg-transparent border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center h-full">
                        <div className="relative h-12 sm:h-14 md:h-16 w-auto">
                            <Image
                                src="/images/interiitlogo.webp"
                                alt="InterIIT Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>


                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative inline-block text-base font-medium transition-colors duration-200 ${scrolled ? "text-gray-800 hover:text-sky-600" : "text-black hover:text-sky-600"
                                    } group`}
                            >
                                {item.name}
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-sky-600 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen((s) => !s)}
                            aria-expanded={isOpen}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            className={`p-2 rounded-md focus:outline-none transition-colors duration-200 ${scrolled ? "text-gray-800 hover:bg-gray-100" : "text-black hover:bg-black/10"
                                }`}
                        >
                            {!isOpen ? (
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile panel (absolute overlay below navbar) */}
            <div
                className={`md:hidden absolute top-full left-0 w-full z-40 transform origin-top transition-all duration-200 ${isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"
                    }`}
            >
                <div className={`w-full ${scrolled ? "bg-white/95 border-t border-gray-200 shadow-md" : "bg-white/95 border-t border-gray-200"}`}>
                    <div className="px-4 pt-3 pb-5 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
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
