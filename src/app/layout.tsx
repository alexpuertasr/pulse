import type { Metadata } from "next";
import { Roboto_Mono, Wix_Madefor_Text } from "next/font/google";

import "./globals.css";

const wixMadeforText = Wix_Madefor_Text({
  variable: "--font-wix-madefor-text",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pulse",
  description: "Track the signals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${wixMadeforText.variable} ${robotoMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
