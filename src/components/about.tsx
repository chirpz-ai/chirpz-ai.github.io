"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section className="py-20" id="about">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 p-1">
              <div className="bg-background rounded-lg p-8 h-full">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  About ChirpZ.AI
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    ChirpZ.AI is building advanced AI agents that automate model governance reporting
                    for SaaS companies providing AI solutions to the insurance industry.
                  </p>
                  <p>
                    Our mission is to eliminate the bottlenecks that slow down AI innovation while ensuring
                    compliance with critical regulations through transparent, consistent reporting.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">The Challenge</h3>
              <p className="text-muted-foreground">
                Many SaaS companies providing AI solutions to insurance carriers struggle with the manual, 
                time-consuming process of creating governance reports. Data scientists spend valuable time 
                collecting metrics from multiple dashboards instead of building better models.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Our Solution</h3>
              <p className="text-muted-foreground">
                ChirpZ.AI's agents integrate with your existing tools, automatically collect and analyze 
                model performance data, and generate comprehensive, regulation-compliant reports ready for 
                review and delivery to your insurance clients.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">The Impact</h3>
              <p className="text-muted-foreground">
                By automating the reporting process, we help SaaS companies save time, reduce costs, enhance 
                compliance, and ultimately deliver a better experience to their insurance industry customers.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 