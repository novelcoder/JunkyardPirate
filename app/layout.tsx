import type { Metadata, Viewport } from "next";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const SITE_URL = "https://junkyardpirate.com";
const DESCRIPTION =
  "Junkyard Pirate: a 9-book military sci-fi series by Jamie McFarlane. Follow Vietnam vet Albert Jenkins from a Wisconsin junkyard to the front lines of a galactic war.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Junkyard Pirate — Jamie McFarlane",
    template: "%s",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Junkyard Pirate",
    title: "Junkyard Pirate — Jamie McFarlane",
    description: DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Junkyard Pirate — Jamie McFarlane",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171512",
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
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
