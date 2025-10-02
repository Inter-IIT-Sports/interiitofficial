import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-500 via-black to-red-800 text-white" style={{ fontFamily: "'Mukta', sans-serif" }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* 3 columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left column */}
          <div>
            <h4 className="text-xl font-semibold mb-3">IIT Madras</h4>
            <div className="w-20 h-1 bg-sky-300 rounded mb-5"></div>

            {/* Contact List */}
            <ul
              className="space-y-3 text-sm leading-relaxed"
              style={{ fontFamily: "'Nunito Sans', sans-serif" }}
            >
              <li className="flex items-start gap-3">
                <PinIcon className="h-5 w-5 text-white" />
                <span>X6PM+P65, Hostel Ave, IIT Madras, Chennai, Tamil Nadu 600036</span>
              </li>

              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-white" />
                <span>
                  <strong>Security:</strong> +91 44 2257 9999 / 8280
                </span>
              </li>

              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-white" />
                <span>
                  <strong>Hospital:</strong> +91 44 2257 8330
                </span>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex items-center justify-start mx-6 gap-4 mt-6 cursor-pointer">
              {/* Instagram */}
              <Link
                href="https://www.instagram.com/interiit_sportsmeet_2025?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 text-white hover:text-pink-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.75-.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
                </svg>
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://www.linkedin.com/company/interiitsportsmeet/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 text-white hover:text-blue-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zm-11 19H5V9h3v10zm-1.5-11.3C5.7 7.7 5 7 5 6.2 5 5.4 5.7 4.7 6.5 4.7S8 5.4 8 6.2c0 .8-.7 1.5-1.5 1.5zM19 19h-3v-5.3c0-1.3 0-3-1.8-3s-2 1.4-2 2.9V19h-3V9h2.9v1.4h.1c.4-.8 1.4-1.8 3-1.8 3.3 0 3.9 2.2 3.9 5.1V19z" />
                </svg>
              </Link>

              {/* Email */}
              <Link
                href="mailto:interiitoc2025@smail.iitm.ac.in"
                className="hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 text-white hover:text-red-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 6.03A2 2 0 0 1 4 4h16a2 2 0 0 1 1.99 2.03L22 18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2L2.01 6.03zM20 6H4v.01L12 11l8-4.99V6z" />
                </svg>
              </Link>

              {/* YouTube */}
              <Link
                href="https://www.youtube.com/@58th_IISM_Madras"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 text-white hover:text-red-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.8-1.6-.8-2-.9C17.6 2.7 12 2.7 12 2.7h-.1s-5.6 0-8.6.3c-.5.1-1.2.1-2 .9-.6.6-.8 2.3-.8 2.3S0 8.2 0 10.2v1.7c0 2 .2 4 .2 4s.2 1.6.8 2.3c.8.8 1.8.8 2.2.9 1.6.2 8.8.3 8.8.3s5.6 0 8.6-.3c.5-.1 1.2-.1 2-.9.6-.6.8-2.3.8-2.3s.2-2 .2-4v-1.7c0-2-.2-4-.2-4zM9.8 14.8V8.7l5.8 3.1-5.8 3z" />
                </svg>
              </Link>

            </div>
          </div>


          {/* Middle column */}
          {/* <div className="md:justify-self-center">
            <h4 className="text-xl font-semibold mb-3" >Additional Contacts</h4>
            <div className="w-20 h-1 bg-sky-300 rounded mb-5"></div>
            <ul className="space-y-3 text-sm leading-relaxed" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-sky-300" />
                <span><strong>Computer Centre:</strong> +91 44 2257 5999</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-sky-300" />
                <span><strong>Taramani Guest House:</strong> +91 44 2257 8470</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-sky-300" />
                <span>
                  <strong>Wellness Centre:</strong> +91 44 2257 8521<br />9498665101
                </span>
              </li>
            </ul>
          </div> */}

          <div>
            <h4 className="text-xl font-semibold mb-3">IIT Hyderabad</h4>
            <div className="w-20 h-1 bg-sky-300 rounded mb-5"></div>

            {/* Contact List */}
            <ul
              className="space-y-3 text-sm leading-relaxed"
              style={{ fontFamily: "'Nunito Sans', sans-serif" }}
            >
              <li className="flex items-start gap-3">
                <PinIcon className="h-5 w-5 text-white" />
                <span>IITH Rd, near NH-65, Sangareddy, Kandi, Telangana 502285</span>
              </li>

              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-white" />
                <span>
                  <strong>Security:</strong>
                </span>
              </li>

              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-white" />
                <span>
                  <strong>Hospital:</strong>
                </span>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex items-center justify-start mx-6 gap-4 mt-6 cursor-pointer">
              {/* Instagram */}
              <Link
                href="https://www.instagram.com/interiit_sportsmeet?igsh=MTN6YWlpeGc4M3VpeQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 text-white hover:text-pink-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.75-.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
                </svg>
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://www.linkedin.com/company/107192725/admin/page-posts/published/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 text-white hover:text-blue-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zm-11 19H5V9h3v10zm-1.5-11.3C5.7 7.7 5 7 5 6.2 5 5.4 5.7 4.7 6.5 4.7S8 5.4 8 6.2c0 .8-.7 1.5-1.5 1.5zM19 19h-3v-5.3c0-1.3 0-3-1.8-3s-2 1.4-2 2.9V19h-3V9h2.9v1.4h.1c.4-.8 1.4-1.8 3-1.8 3.3 0 3.9 2.2 3.9 5.1V19z" />
                </svg>
              </Link>

              {/* Email */}
              <Link
                href="interiit.oc@iith.ac.in"
                className="hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 text-white hover:text-red-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 6.03A2 2 0 0 1 4 4h16a2 2 0 0 1 1.99 2.03L22 18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2L2.01 6.03zM20 6H4v.01L12 11l8-4.99V6z" />
                </svg>
              </Link>

              {/* YouTube */}
              <Link
                href="https://www.youtube.com/@interiit_sportsmeet"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 text-white hover:text-red-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.8-1.6-.8-2-.9C17.6 2.7 12 2.7 12 2.7h-.1s-5.6 0-8.6.3c-.5.1-1.2.1-2 .9-.6.6-.8 2.3-.8 2.3S0 8.2 0 10.2v1.7c0 2 .2 4 .2 4s.2 1.6.8 2.3c.8.8 1.8.8 2.2.9 1.6.2 8.8.3 8.8.3s5.6 0 8.6-.3c.5-.1 1.2-.1 2-.9.6-.6.8-2.3.8-2.3s.2-2 .2-4v-1.7c0-2-.2-4-.2-4zM9.8 14.8V8.7l5.8 3.1-5.8 3z" />
                </svg>
              </Link>

            </div>
          </div>


          {/* Right column */}
          {/* <div>
            <h4 className="text-xl font-semibold mb-3">Contact Us</h4>
            <div className="w-20 h-1 bg-red-400 rounded mb-5"></div>
            <ul className="space-y-3 text-sm leading-relaxed" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              <li className="flex items-start gap-3">
                <PinIcon className="h-5 w-5 text-red-400" />
                <span>X6PM+P65, Hostel Ave, IIT Madras, Chennai, Tamil Nadu 600036</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-red-400" />
                <span><strong>Phone:</strong> (+91) 44 2257 8520</span>
              </li>
              <li className="flex items-start gap-3">
                <MailIcon className="h-5 w-5 text-red-400" />
                <span><strong>Email:</strong> interiitoc2025@smail.iitm.ac.in</span>
              </li>
            </ul>
          </div> */}
          <div >
            <h4 className="text-xl font-semibold mb-3">IIT Tirupati</h4>
            <div className="w-20 h-1 bg-sky-300 rounded mb-5"></div>

            {/* Contact List */}
            <ul
              className="space-y-3 text-sm leading-relaxed"
              style={{ fontFamily: "'Nunito Sans', sans-serif" }}
            >
              <li className="flex items-start gap-3">
                <PinIcon className="h-5 w-5 text-white" />
                <span>PH5V+W5F, Chindepalle, Andhra Pradesh 517619</span>
              </li>

              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-white" />
                <span>
                  <strong>Security:</strong>
                </span>
              </li>

              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-white" />
                <span>
                  <strong>Hospital:</strong>
                </span>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex items-center justify-start mx-6 gap-4 mt-8 cursor-pointer">
              {/* Instagram */}
              <Link
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 text-white hover:text-pink-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.75-.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
                </svg>
              </Link>

              {/* LinkedIn */}
              <Link
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 text-white hover:text-blue-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zm-11 19H5V9h3v10zm-1.5-11.3C5.7 7.7 5 7 5 6.2 5 5.4 5.7 4.7 6.5 4.7S8 5.4 8 6.2c0 .8-.7 1.5-1.5 1.5zM19 19h-3v-5.3c0-1.3 0-3-1.8-3s-2 1.4-2 2.9V19h-3V9h2.9v1.4h.1c.4-.8 1.4-1.8 3-1.8 3.3 0 3.9 2.2 3.9 5.1V19z" />
                </svg>
              </Link>

              {/* Email */}
              <Link
                href="mailto:"
                className="hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 text-white hover:text-red-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 6.03A2 2 0 0 1 4 4h16a2 2 0 0 1 1.99 2.03L22 18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2L2.01 6.03zM20 6H4v.01L12 11l8-4.99V6z" />
                </svg>
              </Link>

              {/* YouTube */}
              <Link
                href="https://www.youtube.com/@58th_IISM_Madras"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 text-white hover:text-red-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.8-1.6-.8-2-.9C17.6 2.7 12 2.7 12 2.7h-.1s-5.6 0-8.6.3c-.5.1-1.2.1-2 .9-.6.6-.8 2.3-.8 2.3S0 8.2 0 10.2v1.7c0 2 .2 4 .2 4s.2 1.6.8 2.3c.8.8 1.8.8 2.2.9 1.6.2 8.8.3 8.8.3s5.6 0 8.6-.3c.5-.1 1.2-.1 2-.9.6-.6.8-2.3.8-2.3s.2-2 .2-4v-1.7c0-2-.2-4-.2-4zM9.8 14.8V8.7l5.8 3.1-5.8 3z" />
                </svg>
              </Link>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-black/70 border-t border-white/10 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm" >
          <p className="text-gray-400 text-[12px] md:text-base">
            Official Website of Inter IIT Sports Meet · Copyright © {new Date().getFullYear()}, IIT Madras · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Icons */
function PhoneIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 
        19.8 19.8 0 0 1-8.63-3.07 
        19.5 19.5 0 0 1-6-6 
        A19.8 19.8 0 0 1 2.09 4.18 
        2 2 0 0 1 4.11 2h3a2 2 0 0 1 
        2 1.72c.12.9.35 1.77.68 2.6
        a2 2 0 0 1-.45 2.11L8.09 9.91
        a16 16 0 0 0 6 6l1.48-1.25
        a2 2 0 0 1 2.11-.45c.83.33 
        1.7.56 2.6.68A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function PinIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-6.5-4.33-6.5-10A6.5 6.5 0 1 1 
        18.5 11c0 5.67-6.5 10-6.5 10z"/>
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function MailIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
