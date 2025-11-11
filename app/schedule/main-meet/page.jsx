// app/under-development/page.tsx (or pages/under-development.tsx if using Pages Router)

export default function UnderDevelopment() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full">
        {/* Logo / Branding */}
        

        {/* Main Message */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 shadow-xl">
          <div className="text-5xl mb-4">🚧</div>
          <h3 className="text-2xl font-bold text-white mb-2">Page Under Development</h3>
          <p className="text-gray-300 mb-6">
            We're working hard to bring you the full schedule and live updates for the 58th Inter IIT Sports Meet 2025.
          </p>
          <div className="inline-block px-4 py-2 bg-[#800000] text-white rounded-full text-sm font-medium">
            Coming Soon
          </div>
        </div>

        {/* Footer Nav (Optional) */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/schedule" className="hover:text-white transition">Schedule</a>
          <a href="/legacy" className="hover:text-white transition">Legacy</a>
          <a href="/gallery" className="hover:text-white transition">Gallery</a>
          <a href="/team" className="hover:text-white transition">Team</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </div>
  );
}