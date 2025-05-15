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
  title: "ChirpZ.ai | AI Model Governance Reporting",
  description: "Automating model governance reporting for insurance SaaS companies with AI agents that transform complex metrics into ready-to-ship reports.",
  metadataBase: new URL("https://chirpz.ai"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI model governance", 
    "model governance reporting", 
    "insurance SaaS", 
    "regulatory compliance", 
    "AI agents", 
    "automated reporting", 
    "model metrics", 
    "insurance AI"
  ],
  authors: [{ name: "ChirpZ.ai Team" }],
  creator: "ChirpZ.ai",
  publisher: "ChirpZ.ai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ChirpZ.ai | AI Model Governance Reporting",
    description: "Automating model governance reporting for insurance SaaS companies with AI agents that transform complex metrics into ready-to-ship reports.",
    url: 'https://chirpz.ai',
    siteName: 'ChirpZ.ai',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://chirpz.ai/assets/og-image.png', // Create and add this image to your public/assets folder
        width: 1200,
        height: 630,
        alt: 'ChirpZ.ai - AI Model Governance',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChirpZ.ai | AI Model Governance Reporting',
    description: 'Automating model governance reporting for insurance SaaS companies with AI agents.',
    images: ['https://chirpz.ai/assets/twitter-image.png'], // Create and add this image to your public/assets folder
    creator: '@chirpzai', // If you have a Twitter handle
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
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
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
