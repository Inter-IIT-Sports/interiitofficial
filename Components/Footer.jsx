export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-500 via-black to-red-800 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* 3 columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left column */}
          <div>
            <h4 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>IIT Madras Important Contacts</h4>
            <div className="w-20 h-1 bg-sky-300 rounded mb-5"></div>
            <ul className="space-y-3 text-sm leading-relaxed" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-sky-300" />
                <span><strong>Security:</strong> +91 44 2257 9999 / 8280</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-sky-300" />
                <span><strong>Hospital:</strong> +91 44 2257 8330</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-sky-300" />
                <span><strong>Ambulance:</strong> +91 44 2257 8333 / 8888</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon className="h-5 w-5 text-sky-300" />
                <span><strong>Counselling:</strong> +91 44 2257 5555</span>
              </li>
            </ul>
          </div>

          {/* Middle column */}
          <div className="md:justify-self-center">
            <h4 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Additional Contacts</h4>
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
          </div>

          {/* Right column */}
          <div>
            <h4 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Contact Us</h4>
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
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-black/70 border-t border-white/10 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
          <p className="text-gray-400 text-sm md:text-base">
            © Official Website of INTER IIT Sports Meet 2025 · Copyright © {new Date().getFullYear()}, IIT Madras · All rights reserved
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
