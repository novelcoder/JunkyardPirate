import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Junkyard Pirate — Jamie McFarlane",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href={FONTS_URL} rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
