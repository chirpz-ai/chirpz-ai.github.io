"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export function About() {
  const benefits = [
    "Faster reporting cycles",
    "Enhanced regulatory compliance",
    "Reduced manual workload",
    "Better data visualization"
  ];

  return (
    <section className="py-24 bg-gray-50" id="about">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-blue-50 text-blue-600 mb-4">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About ChirpZ.AI
            </h2>
            <p className="text-gray-600 text-lg">
              We're building advanced AI agents that automate model governance reporting
              for SaaS companies providing AI solutions to the insurance industry.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full rounded-xl bg-blue-100 transform -rotate-3"></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full rounded-xl bg-blue-200 transform rotate-3"></div>
              <div className="relative z-10 bg-white rounded-xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  Our mission is to eliminate the bottlenecks that slow down AI innovation while ensuring
                  compliance with critical regulations through transparent, consistent reporting.
                </p>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="flex items-center"
                    >
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">1</div>
                <h3 className="font-bold text-xl text-gray-900">The Challenge</h3>
              </div>
              <p className="text-gray-600 pl-14">
                SaaS companies providing AI solutions to insurance carriers struggle with the manual, 
                time-consuming process of creating governance reports. Data scientists spend valuable time 
                collecting metrics instead of building better models.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">2</div>
                <h3 className="font-bold text-xl text-gray-900">Our Solution</h3>
              </div>
              <p className="text-gray-600 pl-14">
                ChirpZ.AI's agents integrate with your existing tools, automatically collect and analyze 
                model performance data, and generate comprehensive, regulation-compliant reports ready for 
                review.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">3</div>
                <h3 className="font-bold text-xl text-gray-900">The Impact</h3>
              </div>
              <p className="text-gray-600 pl-14">
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