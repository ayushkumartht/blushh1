import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "blushhh | exclusive for kiet",
  description: "minimalist dating for kiet group of institutions. intimate, secure, and handcrafted.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-white text-ink antialiased selection:bg-rose selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
