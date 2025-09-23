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

// app/layout.js
export const metadata = {
  title: "Inter IIT Sports Meet 2025",
  description:
    "The Inter IIT Sports Meet is the premier annual sporting event of all Indian Institutes of Technology, uniting athletes across IITs in a celebration of competition, teamwork, and excellence.",
  keywords: [
    "Inter IIT Sports Meet 2025",
    "Inter IIT Sports Meet host By IIT Madras IIT Hyderabad IIT Tirupati", 
    "Inter IIT official website",
    "58th Inter IIT Sports Meet",
    "39th Aquatics Meet",
    "IIT sports events 2025",
    "IIT sports registration",
    "Inter IIT updates",
    "Inter IIT registration",
    "IIT athletics, cricket, football, volleyball",
    "IIT sports events",
    "All IITs sports meet 2025",
  ],
  metadataBase: new URL("https://interiitsports.in"),

  authors: [{ name: "Inter IIT Sports 2025 Web Team" }],

  openGraph: {
    title: "Inter IIT Sports Meet 2025",
    description:
      "The annual Inter IIT Sports Meet – premier sporting championship uniting all IITs with competition, sportsmanship, and excellence.",
    url: "https://interiitsports.in",
    siteName: "Inter IIT Sports Meet",
    images: [
      {
        url: "/images/interiitlog.webp",
        width: 1200,
        height: 630,
        alt: "Inter IIT Sports Meet 2025 Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Inter IIT Sports Meet 2025",
    description:
      "The largest inter-collegiate sports event among IITs – fostering sportsmanship, excellence, and unity.",
    images: ["/favicon.ico"],
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

  formatDetection: {
    telephone: false,
  },

  icons: {
    icon: "/images/interiitlog.webp",
    shortcut: "/images/interiitlog.webp",
  },
};




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {/* <Header /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
