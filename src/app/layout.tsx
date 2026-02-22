import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fitness Koçu | Atakan",
  description: "95 kg'dan 75 kg'a — 12 haftalık kişisel fitness ve beslenme programı",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Navigation />
        <main className="md:ml-20 pb-24 md:pb-8">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
