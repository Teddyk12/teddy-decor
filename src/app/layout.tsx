import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teddy Decor - Event Decor & Planning | Creating Unforgettable Moments",
  description: "Full-service event decor and planning for weddings, birthdays, baby showers, and special occasions. We bring your vision to life with creativity and precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased font-sans">
        <ClientBody>
          <Toaster position="top-right" richColors />
          <Navigation />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </ClientBody>
      </body>
    </html>
  );
}
