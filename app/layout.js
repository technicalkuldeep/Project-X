// Remove the metadata export from layout.js
// layout.js (client component)
"use client";

import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>{children}</SessionProvider> {/* Wrap children inside SessionProvider */}
      </body>
    </html>
  );
}
