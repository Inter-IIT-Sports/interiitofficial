export default function Footer() {

    return(

        <>
        
        
        <footer className="bg-[#481311] text-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            {/* 1 row on mobile, 3 columns from md up */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left column */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-4">IIT Madras Important Contacts</h4>
                <div className="w-16 h-1 bg-white mb-4" />
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <PhoneIcon className="h-5 w-5 text-white" />
                    <span><strong>Security:</strong> +91 44 2257 9999 / 8280</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <PhoneIcon className="h-5 w-5 text-white" />
                    <span><strong>Hospital:</strong> +91 44 2257 8330</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <PhoneIcon className="h-5 w-5 text-white" />
                    <span><strong>Ambulance:</strong> +91 44 2257 8333/8888</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <PhoneIcon className="h-5 w-5 text-white" />
                    <span><strong>Counselling:</strong> +91 44 2257 5555</span>
                  </li>
                </ul>
              </div>

              {/* Middle column */}
              <div className="md:justify-self-center mt-17">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <PhoneIcon className="h-5 w-5 text-white" />
                    <span><strong>Computer Centre:</strong> +91 44 2257 5999</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <PhoneIcon className="h-5 w-5 text-white" />
                    <span><strong>Taramani Guest House:</strong> +91 44 2257 8470</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <PhoneIcon className="h-5 w-5 text-white" />
                    <span>
                      <strong>Wellness Centre:</strong> +91 44 2257 8521<br />9498665101
                    </span>
                  </li>
                </ul>
              </div>

              {/* Right column */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-4">Contact us</h4>
                <div className="w-16 h-1 bg-white mb-4" />
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <PinIcon className="h-5 w-5 text-white" />
                    <span>X6PM+P65, Hostel Ave, Indian Institute Of Technology, Chennai, Tamil Nadu 600036</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <PhoneIcon className="h-5 w-5 text-white" />
                    <span><strong>Phone:</strong> (+91) 44 2257 8520</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MailIcon className="h-5 w-5 text-white" />
                    <span><strong>Email:</strong> interiitsportsmeet2025@smail.iitm.ac.in</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#3a0f0d] py-4">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <p>All rights reserved, Copyright © {new Date().getFullYear()}, IIT Madras.</p>
            </div>
          </div>
        </footer>
    </>
    );
}


function PhoneIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.77.68 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.25a2 2 0 0 1 2.11-.45c.83.33 1.7.56 2.6.68A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function PinIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-6.5-4.33-6.5-10A6.5 6.5 0 1 1 18.5 11c0 5.67-6.5 10-6.5 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function MailIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
