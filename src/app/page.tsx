import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Workflow } from "@/components/workflow";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import Script from "next/script";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "ChirpZ.ai",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "AI-powered platform that automates model governance reporting for insurance SaaS companies.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "ratingCount": "10"
            },
            "publisher": {
              "@type": "Organization",
              "name": "ChirpZ.ai",
              "logo": {
                "@type": "ImageObject",
                "url": "https://chirpz.ai/assets/logo.svg"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "San Francisco",
                "addressRegion": "CA",
                "addressCountry": "US"
              }
            }
          })
        }}
      />
      <Header />
      <Hero />
      <Features />
      <Workflow />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
