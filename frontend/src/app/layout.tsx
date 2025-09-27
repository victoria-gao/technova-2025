import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GreenSwap - Sustainable Living Made Simple",
  description: "Discover, exchange, and give new life to pre-loved items in your community. Join the sustainable revolution.",
  keywords: ["sustainability", "swap", "community", "eco-friendly", "second-hand"],
  authors: [{ name: "GreenSwap Team" }],
  openGraph: {
    title: "GreenSwap - Sustainable Living Made Simple",
    description: "Discover, exchange, and give new life to pre-loved items in your community.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 antialiased">
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}