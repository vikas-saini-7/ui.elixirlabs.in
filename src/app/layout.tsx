import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import SubHeader from "@/components/common/SubHeader";
import Footer from "@/components/common/Footer";

// Font Configs
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elixir UI",
  description: "",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased dark`}
      >
        <Header />
        <SubHeader />

        <main className="container mx-auto px-4 min-h-[80vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
