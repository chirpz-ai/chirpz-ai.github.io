"use client";

import { motion } from "framer-motion";
import { Bot, LineChart, FileText, Workflow } from "lucide-react";

const features = [
  {
    icon: <Bot className="h-8 w-8" />,
    title: "AI-Powered Agents",
    description: "Intelligent agents that connect to your existing dashboards and databases to gather model metrics autonomously."
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    title: "Automated Analytics",
    description: "Automatically extract, analyze and interpret model performance metrics from platforms like Arize, Watsonx, and ClearML."
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Custom Reports",
    description: "Generate comprehensive governance reports tailored to meet regulatory requirements for insurance carriers."
  },
  {
    icon: <Workflow className="h-8 w-8" />,
    title: "Streamlined Workflow",
    description: "Reduce manual effort with one-click report generation pending data scientist approval before delivery."
  }
];

export function Features() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-blue-50 text-blue-600 mb-4">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simplify Model Governance Reporting
          </h2>
          <p className="text-gray-600 text-lg">
            Our platform integrates with your existing tools to automate the entire reporting process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl p-6 shadow-lg shadow-blue-100/60 border border-gray-100 hover:border-blue-100 transition-all duration-300"
            >
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 text-blue-600">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <div className="relative overflow-hidden p-px rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="relative z-10 flex items-center justify-center bg-white rounded-lg py-5 px-8 space-x-4">
              <span className="text-gray-700 font-medium">Ready to streamline your reporting process?</span>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                Get Started
              </a>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 blur-xl"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 