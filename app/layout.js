import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// import Header from "../Components/Header"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Inter IIT Sports Meet",
  description:
    "The Inter IIT Sports Meet is the premier annual sporting event of all Indian Institutes of Technology, uniting athletes across IITs in a celebration of competition, teamwork, and excellence.",
  keywords:
    "Inter IIT Sports Meet, IIT Sports, Inter IITM 2025, Indian Institute of Technology sports, IIT tournament, student athletics, sports championship",
  metadataBase: new URL("https://interiitsports.com"),
  openGraph: {
    title: "Inter IIT Sports Meet",
    description:
      "Annual Inter IIT Sports Meet – premier sporting championship uniting all IITs.",
    url: "https://interiitsports.com",
    siteName: "Inter IIT Sports Meet",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Inter IIT Sports Meet Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inter IIT Sports Meet",
    description:
      "The largest inter-collegiate sports event among IITs – fostering sportsmanship, excellence, and unity.",
    images: ["/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  icons: {
    icon: "/android-chrome-512x512.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {/* <Header /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
