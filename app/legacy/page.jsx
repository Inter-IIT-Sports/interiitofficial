
import Image from 'next/image';

export const metadata = {
  title: "Legacy | Inter IIT Sports Meet 2025",
  description:
    "Explore the rich legacy of the Inter IIT Sports Meet, showcasing historic moments, past champions, and milestones from previous editions of this prestigious IIT sports event.",
  keywords: [
    "Inter IIT Sports Meet legacy",
    "IIT sports history",
    "Inter IIT past champions",
    "IIT sports milestones",
    "Historic IIT sports events"
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
  return (
    <>


      <div className="min-h-screen flex flex-col">
        {/* Hero Section with Responsive Image */}
        <div className="relative h-[50vh] w-full flex items-center justify-center">
          <Image
            src="/images/legacy.png"
            alt="Legacy Banner"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Breadcrumb */}
        <div className="bg-black/50 py-2">
          <div className="container mx-auto px-4">
            <ul className="flex flex-wrap items-center text-sm text-white">
              <li className="truncate">
                A Legacy Through Time: Inter IIT Sports Meet Over the Years
              </li>
            </ul>
          </div>
        </div>


        {/* Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          {/* Introduction */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold uppercase mb-4">
              A Legacy Through Time: Inter IIT Sports Meet Over the Years
            </h2>
            <div className="w-20 h-1 bg-[#481311] mx-auto mb-6"></div>
            <div className="max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-gray-700 text-justify space-y-4">
              <p>
                The Inter IIT Sports Meet, first held in 1961 at IIT Bombay, is one of
                the oldest and proudest traditions of the IIT system. More than a
                tournament, it has become a platform for nurturing resilience,
                leadership, discipline, and camaraderie across the IITs.
              </p>
              <p>
                Despite occasional interruptions due to unavoidable circumstances,
                the spirit of the Meet has endured, making it a symbol of youthful
                energy, excellence, and the shared vision of nation-building.
              </p>
              <p>
                Over the years, the Meet has also expanded in scope. At its heart, it
                remains the flagship sporting event for students across all IITs,
                while the Aquatics Meet serves as its opening phase and the Staff
                Sports Meet provides a parallel platform for faculty and staff.
              </p>
              <p>
                Together, these events uphold the values of fitness, friendship, and
                unity, strengthening the bonds within the IIT community while
                celebrating sports in its fullest spirit.
              </p>
            </div>
          </div>



          {/* Content */}
          {/* <main className="flex-grow container mx-auto px-4 py-8"> */}
          {/* Introduction */}
          {/* <div className="text-center mb-12">
            <h2 className="text-3xl font-bold uppercase mb-4">A Legacy Through Time: Inter IIT Sports Meet Over the Years</h2>
            <div className="w-24 h-1 bg-[#481311] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg">
              The Inter IIT Sports Meet, first held in 1961 at IIT Bombay, is one of
              the oldest and proudest traditions of the IIT system. More than a tournament, it has
              become a platform for nurturing resilience, leadership, discipline, and camaraderie
              across the IITs. Despite occasional interruptions due to unavoidable circumstances,
              the spirit of the Meet has endured, making it a symbol of youthful energy,
              excellence, and the shared vision of nation-building.
              Over the years, the Meet has also expanded in scope. At its heart, it remains the
              flagship sporting event for students across all IITs, while the Aquatics Meet serves
              as its opening phase and the Staff Sports Meet provides a parallel platform for
              faculty and staff. Together, these events uphold the values of fitness, friendship,
              and unity, strengthening the bonds within the IIT community while celebrating sports
              in its fullest spirit.
            </p>
          </div> */}

          {/* Main Championship Table */}
          <div className="overflow-x-auto mb-12">
            <h3 className="text-2xl font-bold text-center mb-6">Inter IIT Sports Meet Champions</h3>
            <table className="w-[70vw] mx-auto min-w-[320px] border-collapse">
              <thead>
                <tr>
                  <th className="bg-[#481311] text-white font-bold p-3 border border-[#481311] text-lg">Year</th>
                  <th className="bg-[#481311] text-white font-bold p-3 border border-[#481311] text-lg">Edition</th>
                  <th className="bg-[#481311] text-white font-bold p-3 border border-[#481311] text-lg">Held at</th>
                  <th className="bg-[#481311] text-white font-bold p-3 border border-[#481311] text-lg">Overall Championship</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { year: "1961", edition: "1", heldAt: "Bombay", champion: "IIT Kharagpur" },
                  { year: "1963", edition: "2", heldAt: "Kharagpur", champion: "IIT Kharagpur" },
                  { year: "1964", edition: "3", heldAt: "Madras", champion: "IIT Kharagpur" },
                  { year: "1966", edition: "4", heldAt: "Bombay", champion: "IIT Bombay" },
                  { year: "1967", edition: "5", heldAt: "Delhi", champion: "IIT Kharagpur" },
                  { year: "1968", edition: "6", heldAt: "Kanpur", champion: "IIT Kharagpur" },
                  { year: "1969", edition: "7", heldAt: "Kharagpur", champion: "IIT Kharagpur" },
                  { year: "1970", edition: "8", heldAt: "Madras", champion: "IIT Madras" },
                  { year: "1972", edition: "9", heldAt: "Kharagpur", champion: "IIT Madras" },
                  { year: "1973", edition: "10", heldAt: "Bombay", champion: "IIT Madras" },
                  { year: "1974", edition: "11", heldAt: "Delhi", champion: "IIT Madras" },
                  { year: "1975", edition: "12", heldAt: "Kharagpur", champion: "IIT Madras" },
                  { year: "1976", edition: "13", heldAt: "Kanpur", champion: "IIT Madras" },
                  { year: "1977", edition: "14", heldAt: "Madras", champion: "IIT Madras" },
                  { year: "1978", edition: "15", heldAt: "Bombay", champion: "IIT Madras" },
                  { year: "1979", edition: "16", heldAt: "Delhi", champion: "IIT Madras" },
                  { year: "1980", edition: "17", heldAt: "Kanpur", champion: "IIT Madras" },
                  { year: "1981", edition: "18", heldAt: "Kharagpur", champion: "IIT Bombay" },
                  { year: "1982", edition: "19", heldAt: "Bombay", champion: "IIT Madras" },
                  { year: "1983", edition: "20", heldAt: "Madras", champion: "IIT None - last 2 days rained out (Bombay was ahead)" },
                  { year: "1984", edition: "21", heldAt: "Kanpur", champion: "IIT Bombay" },
                  { year: "1985", edition: "22", heldAt: "Delhi", champion: "IIT Bombay" },
                  { year: "1986", edition: "23", heldAt: "Kharagpur", champion: "IIT Kharagpur" },
                  { year: "1987", edition: "24", heldAt: "Bombay", champion: "IIT Bombay" },
                  { year: "1988", edition: "25", heldAt: "Madras", champion: "IIT Madras" },
                  { year: "1989", edition: "26", heldAt: "Kanpur", champion: "IIT Kharagpur" },
                  { year: "1990", edition: "27", heldAt: "Delhi", champion: "IIT Delhi" },
                  { year: "1991", edition: "28", heldAt: "Kharagpur", champion: "IIT Kharagpur" },
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
                  { year: "2015", edition: "51", heldAt: "Madras", champion: "Cancelled due to flooding in Chennai" },
                  { year: "2016", edition: "51", heldAt: "Kanpur", champion: "IIT Kanpur" },
                  { year: "2017", edition: "52", heldAt: "Madras", champion: "IIT Bombay" },
                  { year: "2018", edition: "53", heldAt: "Guwahati", champion: "IIT Delhi" },
                  { year: "2019", edition: "54", heldAt: "Kharagpur and Bhubaneswar", champion: "IIT Kharagpur" },
                  { year: "2020", edition: "55", heldAt: "Delhi and Roorkee", champion: "Cancelled due to COVID-19 Pandemic" },
                  { year: "2021", edition: "55", heldAt: "Delhi and Roorkee", champion: "Cancelled due to COVID-19 Pandemic" },
                  { year: "2022", edition: "55", heldAt: "Delhi and Roorkee", champion: "IIT Roorkee" },
                  { year: "2023", edition: "56", heldAt: "Bombay and Gandhinagar", champion: "IIT Madras" },
                  { year: "2024", edition: "57", heldAt: "Kanpur and Indore", champion: "IIT Bombay" },
                ].map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-[#F4F0EA] text-center" : "bg-white text-center"}>
                    <td className="p-3 border border-[#ce9252]">{item.year}</td>
                    <td className="p-3 border border-[#ce9252]">{item.edition}</td>
                    <td className="p-3 border border-[#ce9252]">{item.heldAt}</td>
                    <td className="p-3 border border-[#ce9252]">{item.champion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Women's Championship Table */}
          <div className="overflow-x-auto mb-12">
            <h3 className="text-2xl font-bold text-center mb-6">Women's Championship</h3>
            <table className="w-[70vw] mx-auto min-w-[320px] border-collapse">
              <thead>
                <tr>
                  <th className="bg-[#481311] text-white font-bold p-3 border border-[#481311] text-lg">Year</th>
                  <th className="bg-[#481311] text-white font-bold p-3 border border-[#481311] text-lg">Edition</th>
                  <th className="bg-[#481311] text-white font-bold p-3 border border-[#481311] text-lg">Held at</th>
                  <th className="bg-[#481311] text-white font-bold p-3 border border-[#481311] text-lg">Women's Championship</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { year: "2022", edition: "1", heldAt: "Delhi and Roorkee", champion: "IIT Delhi" },
                  { year: "2023", edition: "2", heldAt: "Bombay and Gandhinagar", champion: "IIT Madras" },
                  { year: "2024", edition: "3", heldAt: "Kanpur and Indore", champion: "IIT Madras" },
                ].map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-[#F4F0EA] text-center" : "bg-white text-center"}>
                    <td className="p-3 border border-[#ce9252]">{item.year}</td>
                    <td className="p-3 border border-[#ce9252]">{item.edition}</td>
                    <td className="p-3 border border-[#ce9252]">{item.heldAt}</td>
                    <td className="p-3 border border-[#ce9252]">{item.champion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

      </div>
    </>
  );
}
