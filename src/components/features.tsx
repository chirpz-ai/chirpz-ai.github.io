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
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-muted/50" id="features">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Simplify Model Governance Reporting
          </h2>
          <p className="max-w-[900px] mx-auto text-muted-foreground text-lg">
            Our platform integrates with your existing tools to automate the entire reporting process.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="flex flex-col items-center rounded-lg border bg-card p-8 text-card-foreground shadow hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 