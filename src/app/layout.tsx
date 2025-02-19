import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

// const geistSans = GeistSans({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   display: "swap",
// });

// const geistMono = GeistMono({
//   variable: "--font-geist-mono", 
//   subsets: ["latin"],
//   weight: ["400", "500", "600"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "DECORSIGN",
  description: "Created beautiful and functional space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${GeistSans.className} ${GeistMono.className} antialiased`}
      >
        <Suspense>
          <Toaster />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
