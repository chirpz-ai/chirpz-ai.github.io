import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import MUIProvider from "@/components/mui-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ChirpZ AI | AI Model Governance Reporting",
  description: "Automating model governance reporting for insurance SaaS companies with AI agents that transform complex metrics into ready-to-ship reports.",
  metadataBase: new URL("https://chirpz.ai"),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  keywords: [
    "AI model governance", 
    "model governance reporting", 
    "insurance SaaS", 
    "regulatory compliance", 
    "AI agents", 
    "automated reporting", 
    "model metrics", 
    "insurance AI",
    "ChirpZ AI",
    "ChirpZ.ai"
  ],
  authors: [{ name: "ChirpZ AI Team" }],
  creator: "ChirpZ AI",
  publisher: "ChirpZ AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ChirpZ AI | AI Model Governance Reporting",
    description: "Automating model governance reporting for insurance SaaS companies with AI agents that transform complex metrics into ready-to-ship reports.",
    url: 'https://chirpz.ai',
    siteName: 'ChirpZ AI',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://chirpz.ai/logo-google.png',
        width: 192,
        height: 192,
        alt: 'ChirpZ AI - AI Model Governance',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChirpZ AI | AI Model Governance Reporting',
    description: 'Automating model governance reporting for insurance SaaS companies with AI agents.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
