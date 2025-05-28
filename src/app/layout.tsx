import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import MUIProvider from "@/components/mui-provider";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Chirpz AI | AI Developer Productivity & Model Intelligence",
  description: "AI agents that autonomously generate intelligence streams from development and observability stacks, delivering actionable insights that accelerate AI model development.",
  metadataBase: new URL("https://chirpz.ai"),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  keywords: [
    "AI developer productivity", 
    "model intelligence", 
    "developer workflow automation", 
    "AI analytics", 
    "AI agents", 
    "automated workflows", 
    "model metrics", 
    "AI observability",
    "Chirpz AI",
    "developer tools",
    "model performance analytics"
  ],
  authors: [{ name: "Chirpz AI Team" }],
  creator: "Chirpz AI",
  publisher: "Chirpz AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Chirpz AI | AI Developer Productivity & Model Intelligence",
    description: "AI agents that autonomously generate intelligence streams from development and observability stacks, delivering actionable insights that accelerate AI model development.",
    url: 'https://chirpz.ai',
    siteName: 'Chirpz AI',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://chirpz.ai/logo-google.png',
        width: 192,
        height: 192,
        alt: 'Chirpz AI - Developer Productivity & Model Intelligence',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chirpz AI | AI Developer Productivity & Model Intelligence',
    description: 'AI agents that autonomously generate intelligence streams from development and observability stacks, delivering actionable insights that accelerate AI model development.',
    images: ['https://chirpz.ai/logo-google.png'],
    creator: '@chirpzai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-google.png", sizes: "192x192", type: "image/png" },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/logo-google.png", sizes: "192x192", type: "image/png" },
    ],
  },
  other: {
    'google-site-verification': 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Chirpz AI",
              "url": "https://chirpz.ai",
              "logo": "https://chirpz.ai/logo-google.png",
              "description": "AI agents that autonomously generate intelligence streams from development and observability stacks, delivering actionable insights that accelerate AI model development.",
              "sameAs": [
                "https://chirpz.ai"
                // Add social profiles here when available
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MUIProvider>
            {children}
          </MUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
