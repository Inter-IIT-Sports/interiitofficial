// app/components/Header.tsx
import Link from "next/link";
export default function Header() {
  return (
    <nav className="bg-[#6C291F] text-white sticky top-0 z-50 shadow-sm">
          <div className="mx-auto w-full max-w-9xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-18 items-center justify-between">
              {/* Brand */}
              <a href="/" className="flex items-center gap-3">
                {/* Logo: keeps aspect, caps height, prevents distortion */}
                <img
                  src="/images/lo.png"   /* replace with actual path */
                  alt="Inter IIT Sports Meet"
                  className="h-15 w-auto object-contain rounded"
                />
              </a>

              {/* Desktop nav */}
              <ul className="hidden md:flex items-center gap-6">
                <li><Link href="/" className="hover:text-gray-200 transition-colors">Home</Link></li>
                <li><Link href="/schedule" className="hover:text-gray-200 transition-colors">Schedule</Link></li>
                <li><Link href="legacy" className="hover:text-gray-200 transition-colors">Legacy</Link></li>
                <li><Link href="gallery" className="hover:text-gray-200 transition-colors">Gallery</Link></li>
                <li><Link href="team" className="hover:text-gray-200 transition-colors">Team</Link></li>
                <li><Link href="contactus" className="hover:text-gray-200 transition-colors">Contact us</Link></li>
              </ul>

              {/* Mobile toggle (controlled via checkbox hack or JS) */}
              <input id="nav-toggle" type="checkbox" className="peer hidden" />
              <label
                htmlFor="nav-toggle"
                className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded hover:bg-white/10 transition"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </label>
            </div>
          </div>

          {/* Mobile panel */}
          <div className="md:hidden peer-checked:max-h-80 max-h-0 overflow-hidden transition-[max-height] duration-300 ease-out">
            <div className="px-4 pb-4 space-y-2">
              <a href="index-3copy.html" className="block py-2 hover:text-gray-200">Home</a>
              <a href="schedule-final.html" className="block py-2 hover:text-gray-200">Schedule</a>
              <a href="Legacy.html" className="block py-2 font-semibold">Legacy</a>
              <a href="gallery.html" className="block py-2 hover:text-gray-200">Gallery</a>
              <a href="team.html" className="block py-2 hover:text-gray-200">Team</a>
              <a href="contact-4.html" className="block py-2 hover:text-gray-200">Contact us</a>
            </div>
          </div>
        </nav>
  );
}
