"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  useTheme
} from "@mui/material";

// Badge component exactly like features component
const WorkflowBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 16px",
  borderRadius: "24px",
  fontSize: "0.875rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    padding: "1px",
    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%)",
    borderRadius: "inherit",
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "xor",
    WebkitMaskComposite: "xor",
  }
}));

// Timeline step data
const timelineSteps = [
  {
    id: 1,
    label: "Instant understanding. Zero setup.",
    title: "Define and Schedule Your Research",
    description: "Simply state your objective—a grant proposal for the NSF, a literature review on nanophotonics, or a new paper outline. Our agent grasps the context and requirements instantly."
  },
  {
    id: 2,
    label: "Autonomous work. No manual input.",
    title: "Agent-Led Research and Drafting Begins",
    description: "Once prompted, the agent works proactively in the background, conducting deep research and writing the first draft directly into a structured LaTeX document. Your data stays yours, always."
  },
  {
    id: 3,
    label: "Collaborate and finalize. One click.",
    title: "Compile Your Final PDF",
    description: "Review the draft, prompt for any edits or additions, collaborate with your team, and when you're satisfied, compile a perfectly formatted, submission-ready PDF with a single command."
  }
];

export function Workflow() {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [progressHeight, setProgressHeight] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      // Divide scroll progress into three equal sections (0-1 mapped to 0-3 sections)
      const totalProgress = Math.max(0, Math.min(1, latest));
      
      // Determine current section (0, 1, or 2)
      let section = 0;
      let heightPercent = 0;
      
      if (totalProgress <= 0.33) {
        // First section (0-33%)
        section = 0;
        heightPercent = (totalProgress / 0.33) * 33.33; // 0% to 33.33%
      } else if (totalProgress <= 0.66) {
        // Second section (33-66%)
        section = 1;
        heightPercent = 33.33 + ((totalProgress - 0.33) / 0.33) * 33.33; // 33.33% to 66.66%
      } else {
        // Third section (66-100%)
        section = 2;
        heightPercent = 66.66 + ((totalProgress - 0.66) / 0.34) * 33.34; // 66.66% to 100%
      }
      
      setCurrentSection(section);
      setProgressHeight(Math.min(100, heightPercent));
    });

    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <Box
      id="workflow"
      ref={containerRef}
      sx={{
        backgroundColor: "transparent",
        py: { xs: 8, md: 12 },
        mx: { xs: 2, sm: 3, md: 4 },
        my: { xs: 4, md: 6 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <WorkflowBadge>
            <Typography sx={{ color: "text.primary", fontSize: "0.875rem", fontWeight: 600 }}>
              How it Works
            </Typography>
          </WorkflowBadge>
        </Box>

        {/* Section Headline */}
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2.5rem", md: "2.75rem" },
            fontWeight: 400,
            textAlign: "center",
            mb: 3,
            color: "text.primary",
            letterSpacing: "-0.02em",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          Idea to Proposal
        </Typography>

        {/* Section Sub-headline */}
        <Typography
          variant="h5"
          component="p"
          sx={{
            fontSize: { xs: "1rem", md: "1.1rem" },
            fontWeight: 350,
            color: "text.secondary",
            textAlign: "center",
            mb: 12,
            maxWidth: "600px",
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Three steps. Zero friction. Total focus.
        </Typography>

        {/* Timeline Container */}
        <Box sx={{ maxWidth: "800px", mx: "auto", position: "relative" }}>
          {/* Timeline Line */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: "22.5px", md: "48px" }, // Adjusted for mobile centering
              top: "50px", // Start at first label level
              height: { 
                xs: "calc(100% - 260px)", // Shorter for mobile spacing
                md: "calc(100% - 190px)" // Original desktop height
              },
              width: "2px",
              zIndex: 1,
            }}
          >
            {/* Background line */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: theme.palette.primary.light,
                opacity: 0.3,
                borderRadius: "1px",
              }}
            />
            
            {/* Animated progress line */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                borderRadius: "1px",
                background: `linear-gradient(to bottom, ${theme.palette.primary.contrastText}, ${theme.palette.primary.contrastText}90)`,
                boxShadow: `0 0 20px ${theme.palette.primary.contrastText}40`,
                height: `${progressHeight}%`,
                transition: "height 0.12s ease-out",
              }}
            />
          </Box>

          {/* Timeline Steps */}
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  mb: { xs: 8, md: 12 },
                  pl: { xs: "60px", md: "84px" },
                  position: "relative",
                }}
              >
                {/* Step Node */}
                 <Box
                   component={motion.div}
                   sx={{
                     position: "absolute",
                     left: { xs: "21px", md: "46.5px" }, // Better centering for mobile
                     top: "50px", // Align with label position
                     width: "5px",
                     height: "5px",
                     borderRadius: "50%",
                     backgroundColor: currentSection === index ? theme.palette.primary.contrastText : theme.palette.primary.contrastText,
                     border: "none",
                     zIndex: 2,
                     opacity: currentSection === index ? 1 : 0,
                     transform: currentSection === index ? "scale(1)" : "scale(0.8)",
                     boxShadow: currentSection === index ? `0 0 12px ${theme.palette.primary.contrastText}80` : "none",
                     transition: "all 0.3s ease-out",
                   }}
                 />

                {/* Content */}
                <Box sx={{ flex: 1, maxWidth: "600px" }}>
                  {/* Small Label */}
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "0.85rem",
                      color: "text.disabled",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      mb: 2,
                      display: "block",
                    }}
                  >
                    {step.label}
                  </Typography>

                  {/* Step Title */}
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                      fontSize: { xs: "1.25rem", md: "2.75rem" },
                      fontWeight: 400,
                      mb: 3,
                      color: "text.primary",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "0.95rem", md: "0.95rem" },
                      color: "text.secondary",
                      lineHeight: 1.7,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
