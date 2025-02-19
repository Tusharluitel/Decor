import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
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
        className={`${mulish.variable} antialiased`}
      >
        <Suspense>
          <Toaster />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
