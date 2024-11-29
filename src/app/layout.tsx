import type { Metadata } from "next";
import "./globals.css";
import Container from "@/components/container";
import {
  SITE_TITLE,
  SITE_URL,
  HOME_OG_IMAGE_URL,
  KEYWORDS,
  Author,
  SITE_DESCRIPTION,
  TWITTER_HANDLE,
} from "@/lib/constants";

const title = `${SITE_TITLE} 🦖`;

export const metadata: Metadata = {
  title: title,
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: Author, url: SITE_URL }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: title,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: HOME_OG_IMAGE_URL,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: title,
    description: SITE_DESCRIPTION,
    images: HOME_OG_IMAGE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en" className="dark">
      <html lang="en" className="dark scroll-smooth">

      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>

      <body className="bg-bg text-text dark:text-textLight">
        <Container>{children}</Container>
      </body>
    </html>
  );
}
