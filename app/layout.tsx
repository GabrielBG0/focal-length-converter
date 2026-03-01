import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lens Equivalence Calculator | Crop Factor & Aperture Conversion",
  description:
    "Professional lens equivalence calculator. Convert full-frame focal length and aperture to APS-C, Micro Four Thirds, iPhone sensors, and more.",
  keywords: [
    "lens equivalence calculator",
    "crop factor calculator",
    "full frame to aps-c",
    "aperture equivalence",
    "35mm equivalent",
    "sensor size comparison",
  ],
  openGraph: {
    title: "Lens Equivalence Calculator",
    description:
      "Convert focal length and aperture between full-frame and other sensor formats.",
    url: "https://yourdomain.com",
    siteName: "Lens Equivalence Calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lens Equivalence Calculator",
    description:
      "Convert full-frame lenses to APS-C, Micro Four Thirds and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
