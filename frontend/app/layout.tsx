import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      {/* 
        The body uses our custom background and text colors defined in globals.css.
        We set up a flex container so we can easily drop in the Sidebar later.
      */}
      <body className={`${inter.className} min-h-screen bg-background text-foreground flex overflow-hidden`}>
        
        {/* Placeholder for Sidebar Component (To be created) */}
        {/* <Sidebar /> */}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-gray-50/50 dark:bg-black/50">
          
          {/* Placeholder for Navbar/Header Component (To be created) */}
          {/* <Navbar /> */}
          
          <main className="flex-1 p-6 md:p-8">
            {children}
          </main>
          
        </div>
      </body>
    </html>
  );
}
