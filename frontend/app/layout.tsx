import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

// We use Inter for a clean, modern, and premium typography feel.
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoSphere | ESG Management Platform",
  description: "A gamified platform to manage Environmental, Social, and Governance goals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.className} min-h-screen bg-background text-foreground flex overflow-hidden`}>
        
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-gray-50/50 dark:bg-black/50">
          
          {/* Navbar Component */}
          <Navbar />
          
          <main className="flex-1 p-6 md:p-8">
            {children}
          </main>
          
        </div>
      </body>
    </html>
  );
}
