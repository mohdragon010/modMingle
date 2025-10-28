import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ThemeProvider from "./ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ModMingle - Your Ultimate Minecraft Mod Discovery Hub",
  description:
    "Discover, explore, and download thousands of Minecraft mods. Find the perfect mods for your gameplay with ModMingle's comprehensive mod library powered by Modrinth.",
  keywords: "minecraft, mods, modding, mod discovery, modrinth, gaming",
  authors: [{ name: "Mohamed Ayman" }],
  creator: "Mohamed Ayman",
  openGraph: {
    title: "ModMingle - Minecraft Mod Discovery",
    description: "Your ultimate hub for discovering and downloading Minecraft mods",
    url: "https://modmingle.vercel.app",
    siteName: "ModMingle",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
