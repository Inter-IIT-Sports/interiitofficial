import Image from "next/image";

export const metadata = {
  title: "Legacy | Inter IIT Sports Meet 2025",
  description:
    "Explore the rich legacy of the Inter IIT Sports Meet, showcasing historic moments, past champions, and milestones from previous editions of this prestigious IIT sports event.",
  keywords: [
    "Inter IIT Sports Meet legacy",
    "IIT sports history",
    "Inter IIT past champions",
    "IIT sports milestones",
    "Historic IIT sports events",
  ],
  openGraph: {
    title: "Legacy | Inter IIT Sports Meet 2025",
    description:
      "Discover the history and legacy of the Inter IIT Sports Meet, highlighting past champions, historic moments, and milestones across all IITs.",
    url: "https://interiitsports.in/legacy",
    siteName: "Inter IIT Sports Meet 2025",
    images: [
      {
        url: "https://interiitsports.in/favicon.ico",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legacy | Inter IIT Sports Meet 2025",
    description:
      "Explore the historic moments and champions of the Inter IIT Sports Meet over the years.",
    images: ["https://interiitsports.in/logo_2.png"],
  },
};

export default function Legacy() {
  const champions = [
    { year: "1961", edition: "1", heldAt: "Bombay", champion: "IIT Kharagpur" },
    { year: "1963", edition: "2", heldAt: "Kharagpur", champion: "IIT Kharagpur" },
    { year: "1964", edition: "3", heldAt: "Madras", champion: "IIT Kharagpur" },
    { year: "1966", edition: "4", heldAt: "Bombay", champion: "IIT Bombay" },
    { year: "1967", edition: "5", heldAt: "Delhi", champion: "IIT Kharagpur" },
    { year: "1968", edition: "6", heldAt: "Kanpur", champion: "IIT Kharagpur" },
    { year: "1969", edition: "7", heldAt: "Kharagpur", champion: "IIT Kharagpur" },
    { year: "1970", edition: "8", heldAt: "Madras", champion: "IIT Madras" },
    // {year: "1971", edition: "9", heldAt: "Madras", champion: "IIT Madras" },
    { year: "1972", edition: "10", heldAt: "Kharagpur", champion: "IIT Madras" },
    { year: "1973", edition: "11", heldAt: "Bombay", champion: "IIT Madras" },
    { year: "1974", edition: "12", heldAt: "Delhi", champion: "IIT Madras" },
    { year: "1975", edition: "13", heldAt: "Kharagpur", champion: "IIT Madras" },
    { year: "1976", edition: "14", heldAt: "Kanpur", champion: "IIT Madras" },
    { year: "1977", edition: "15", heldAt: "Madras", champion: "IIT Madras" },
    { year: "1978", edition: "16", heldAt: "Bombay", champion: "IIT Madras" },
    { year: "1979", edition: "17", heldAt: "Delhi", champion: "IIT Madras" },
    { year: "1980", edition: "18", heldAt: "Kanpur", champion: "IIT Madras" },
    { year: "1981", edition: "19", heldAt: "Kharagpur", champion: "IIT Bombay" },
    { year: "1982", edition: "20", heldAt: "Bombay", champion: "IIT Madras" },
    { year: "1983", edition: "20", heldAt: "Madras", champion: "last 2 days rained out" },
    { year: "1984", edition: "21", heldAt: "Kanpur", champion: "IIT Bombay" },
    { year: "1985", edition: "22", heldAt: "Delhi", champion: "IIT Bombay" },
    { year: "1986", edition: "23", heldAt: "Kharagpur", champion: "IIT Kharagpur" },
    { year: "1987", edition: "24", heldAt: "Bombay", champion: "IIT Bombay" },
    { year: "1988", edition: "25", heldAt: "Madras", champion: "IIT Madras" },
    { year: "1989", edition: "26", heldAt: "Kanpur", champion: "IIT Kharagpur" },
    { year: "1990", edition: "27", heldAt: "Delhi", champion: "IIT Delhi" },
    { year: "1991", edition: "28", heldAt: "Kharagpur", champion: "IIT Kharagpur" },
    { year: "1992", edition: "29", heldAt: "Bombay", champion: "Cancelled due to Bombay rights" },
    { year: "1993", edition: "29", heldAt: "Bombay", champion: "IIT Bombay" },
    { year: "1994", edition: "30", heldAt: "Washed out", champion: "Washed out" },
    { year: "1995", edition: "31", heldAt: "Kanpur", champion: "IIT Bombay" },
    { year: "1996", edition: "32", heldAt: "Delhi", champion: "IIT Madras" },
    { year: "1997", edition: "33", heldAt: "Kharagpur", champion: "IIT Kharagpur" },
    { year: "1998", edition: "34", heldAt: "Bombay", champion: "IIT Bombay" },
    { year: "1999", edition: "35", heldAt: "Madras", champion: "IIT Madras" },
    { year: "2000", edition: "36", heldAt: "Kanpur", champion: "IIT Madras" },
    { year: "2001", edition: "37", heldAt: "Kharagpur", champion: "IIT Madras" },
    { year: "2002", edition: "38", heldAt: "Delhi", champion: "IIT Madras" },
    { year: "2003", edition: "39", heldAt: "Bombay", champion: "IIT Madras" },
    { year: "2004", edition: "40", heldAt: "Madras", champion: "IIT Madras" },
    { year: "2005", edition: "41", heldAt: "Roorkee", champion: "IIT Kharagpur" },
    { year: "2006", edition: "42", heldAt: "Guwahati", champion: "IIT Madras" },
    { year: "2007", edition: "43", heldAt: "Bombay", champion: "IIT Bombay" },
    { year: "2008", edition: "44", heldAt: "Madras", champion: "IIT Bombay" },
    { year: "2009", edition: "45", heldAt: "Kanpur", champion: "IIT Madras" },
    { year: "2010", edition: "46", heldAt: "Delhi", champion: "IIT Madras" },
    { year: "2011", edition: "47", heldAt: "Kharagpur", champion: "IIT Madras" },
    { year: "2012", edition: "48", heldAt: "Roorkee", champion: "IIT Bombay" },
    { year: "2013", edition: "49", heldAt: "Guwahati", champion: "IIT Kanpur" },
    { year: "2014", edition: "50", heldAt: "Bombay", champion: "IIT Kanpur" },
    { year: "2015", edition: "51", heldAt: "Madras", champion: "Cancelled due to flooding" },
    { year: "2016", edition: "51", heldAt: "Kanpur", champion: "IIT Kanpur" },
    { year: "2017", edition: "52", heldAt: "Madras", champion: "IIT Bombay" },
    { year: "2018", edition: "53", heldAt: "Guwahati", champion: "IIT Delhi" },
    { year: "2019", edition: "54", heldAt: "Kharagpur and Bhubaneswar", champion: "IIT Kharagpur" },
    { year: "2020", edition: "55", heldAt: "Delhi and Roorkee", champion: "Cancelled due to COVID-19" },
    { year: "2021", edition: "55", heldAt: "Delhi and Roorkee", champion: "Cancelled due to COVID-19" },
    { year: "2022", edition: "55", heldAt: "Delhi and Roorkee", champion: "IIT Roorkee" },
    { year: "2023", edition: "56", heldAt: "Bombay and Gandhinagar", champion: "IIT Madras" },
    { year: "2024", edition: "57", heldAt: "Kanpur and Indore", champion: "IIT Bombay" },
    { year: "2025", edition: "58", heldAt: "Madras, Hyderabad and Tirupati", champion: "TBA" },
  ];

  const womenChampions = [
    { year: "2022", edition: "1", heldAt: "Delhi and Roorkee", champion: "IIT Delhi" },
    { year: "2023", edition: "2", heldAt: "Bombay and Gandhinagar", champion: "IIT Madras" },
    { year: "2024", edition: "3", heldAt: "Kanpur and Indore", champion: "IIT Madras" },
  ];

  return (
<main className="min-h-screen font-sans bg-gray-50 text-gray-800">

  {/* Hero Section */}
  <section
    className="container mx-auto px-4 pt-20 md:pt-28 pb-16 md:pb-24 flex flex-col md:flex-row items-center md:justify-between gap-8"
    style={{ fontFamily: "'Poppins', sans-serif" }}
  >
    {/* Left Content */}
    <div className="flex-1 md:pr-12">
      <h1
        className="text-3xl sm:text-3xl md:text-4xl font-extrabold text-[#481311] leading-snug mb-4"
        style={{ fontFamily: "'Montserrat', serif" }}
      >
        Legacy of the Inter IIT Sports Meet
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
        Celebrating decades of champions, milestones, and sporting excellence across all IITs. Explore the history, memorable moments, and the spirit of sportsmanship.
      </p>
    </div>

    {/* Right Quote Box */}
    <div className="flex-1 bg-gradient-to-br from-[#fde0dc] to-[#daf1fb] p-6 md:p-10 rounded-3xl shadow-lg flex items-center justify-center min-h-[300px] md:min-h-[380px] hover:shadow-xl transition duration-300">
      <blockquote
        className="text-[#481311] text-base sm:text-[20px] md:text-xl italic text-center max-w-md"
        style={{ fontFamily: "'Mukta', sans-serif", lineHeight: '1.5' }}
      >
        "Sports do not build character. They reveal it." – Heywood Broun
      </blockquote>
    </div>
  </section>






      {/* Introduction Section */}
      <section className="container mx-auto px-4 py-10 md:py-16 max-w-4xl text-gray-800 text-justify space-y-6 md:space-y-8" style={{ fontFamily: "'Poppins', sans-serif" }} >
        <p className="text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose tracking-wide">
          The Inter IIT Sports Meet, first held in 1961 at IIT Bombay, is one of the oldest and most prestigious traditions of the IIT system. It fosters resilience, leadership, discipline, and camaraderie among students across all IITs.
        </p>
        <p className="text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose tracking-wide">
          Over decades, the spirit of the Meet has endured, representing youthful energy, excellence, and the shared vision of nation-building.
        </p>
        <p className="text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose tracking-wide">
          These events uphold values of fitness, friendship, and unity, strengthening the IIT community and celebrating sportsmanship at its best.
        </p>
      </section>


      {/* Champions Table */}
      <section className="container mx-auto px-4 py-12" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#481311]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Inter IIT Sports Meet Champions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full md:w-[95%] mx-auto border-separate border-spacing-0 shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-[#481311] text-white">
              <tr>
                {["Year", "Edition", "Held at", "Overall Champion"].map((col) => (
                  <th key={col} className="p-3 md:p-4 text-left md:text-center">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {champions.map((item, idx) => (
                <tr key={idx} className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-[#fbe9e7] transition duration-300`}>
                  <td className="p-2 md:p-3 text-center">{item.year}</td>
                  <td className="p-2 md:p-3 text-center">{item.edition}</td>
                  <td className="p-2 md:p-3 text-center">{item.heldAt}</td>
                  <td className="p-2 md:p-3 text-center">{item.champion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Women's Championship Table */}
      <section className="container mx-auto px-4 py-12" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#481311]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Women's Championship
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full md:w-[95%] mx-auto border-separate border-spacing-0 shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-[#481311] text-white">
              <tr>
                {["Year", "Edition", "Held at", "Champion"].map((col) => (
                  <th key={col} className="p-3 md:p-4 text-left md:text-center">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {womenChampions.map((item, idx) => (
                <tr key={idx} className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-[#fbe9e7] transition duration-300`}>
                  <td className="p-2 md:p-3 text-center">{item.year}</td>
                  <td className="p-2 md:p-3 text-center">{item.edition}</td>
                  <td className="p-2 md:p-3 text-center">{item.heldAt}</td>
                  <td className="p-2 md:p-3 text-center">{item.champion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </main>
  );
}
