import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { GoogleTagManager } from "@next/third-parties/google";

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
      <GoogleTagManager gtmId="G-MX7SFJPWN3" />
      <body className={`${mulish.variable} antialiased`}>
        <Suspense>
          <Toaster />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
