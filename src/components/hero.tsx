"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  useTheme,
  alpha
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "12px 28px",
  borderRadius: "8px",
  fontWeight: 600,
  fontSize: "1rem",
  textTransform: "none",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.2)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
  }
}));

const PrimaryButton = styled(StyledButton)(() => ({
  backgroundColor: "#3B82F6",
  color: "white",
  "&:hover": {
    backgroundColor: "#2563EB",
  }
}));

const SecondaryButton = styled(StyledButton)(() => ({
  backgroundColor: "rgba(31, 41, 55, 0.7)",
  border: "1px solid rgba(75, 85, 99, 0.5)",
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(31, 41, 55, 0.9)",
  }
}));

const DemoWindow = styled(Paper)(({ theme }) => ({
  position: "relative",
  backgroundColor: "rgba(17, 24, 39, 0.7)",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid rgba(75, 85, 99, 0.5)",
  padding: "24px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(8px)",
}));

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "inline-block",
});

// Define a blinking cursor component for the terminal effect
const Cursor = () => (
  <motion.div 
    animate={{ opacity: [1, 0] }}
    transition={{ repeat: Infinity, duration: 0.8 }}
    style={{ 
      width: 2, 
      height: 16, 
      backgroundColor: '#3B82F6', 
      display: 'inline-block',
      marginLeft: 4,
      position: 'relative',
      top: 3
    }}
  />
);

// Add animated dots component
const AnimatedDots = () => {
  const [dots, setDots] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev + 1) % 4);
    }, 400);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Box component="span" sx={{ width: 20, display: 'inline-block' }}>
      {'.'.repeat(dots)}
    </Box>
  );
};

// Spinning Loader component
const SpinningLoader = () => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 1.2, 
        repeat: Infinity, 
        ease: "linear"
      }}
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        border: "1.5px solid rgba(16, 185, 129, 0.6)",
        borderTopColor: "#10B981",
        marginRight: 8
      }}
    />
  );
};

// Report section component with reveal animation
interface SectionProps {
  title: string;
  content?: string;
  type: string;
  isLastItem: boolean;
  showCursor: boolean;
  source?: string;
}

const ReportSection = ({ title, content, type, isLastItem, showCursor, source }: SectionProps) => {
  // Define color schemes for different sources
  const sourceColors = {
    Arize: {
      bg: "rgba(14, 165, 233, 0.15)",
      border: "rgba(14, 165, 233, 0.3)",
      text: "#0EA5E9",
      dotColor: "#0EA5E9",
      lightBg: "rgba(14, 165, 233, 0.1)",
      lightText: "rgba(14, 165, 233, 0.8)"
    },
    Openlayer: {
      bg: "rgba(99, 102, 241, 0.15)",
      border: "rgba(99, 102, 241, 0.3)",
      text: "#6366F1",
      dotColor: "#6366F1",
      lightBg: "rgba(99, 102, 241, 0.1)",
      lightText: "rgba(99, 102, 241, 0.8)"
    }
  };
  
  // Get the color scheme based on source, default to Arize
  const colorScheme = source === "Openlayer" ? sourceColors.Openlayer : sourceColors.Arize;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ marginBottom: 14 }}
    >
      {type === 'header' ? (
        <Box sx={{ mb: 2 }}>
          <Typography 
            sx={{ 
              color: "#60A5FA", 
              fontWeight: 600,
              fontSize: "1.1rem"
            }}
          >
            {title}
            {isLastItem && showCursor && <Cursor />}
          </Typography>
        </Box>
      ) : type === 'section' ? (
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box sx={{ 
            width: 8, 
            height: 8, 
            borderRadius: "50%", 
            bgcolor: "#3B82F6", 
            mr: 1.5 
          }} />
          <Typography 
            sx={{ 
              color: alpha("#fff", 0.95),
              fontWeight: 500,
              fontSize: "0.95rem"
            }}
          >
            {title}
            {source && (
              <Box component="span" sx={{ 
                ml: 1.5,
                px: 1, 
                py: 0.2, 
                bgcolor: colorScheme.bg, 
                borderRadius: 0.8,
                fontSize: "0.7rem",
                color: colorScheme.text,
                fontWeight: 600,
                border: `1px solid ${colorScheme.border}`,
                display: "inline-flex",
                alignItems: "center"
              }}>
                <Box 
                  component="span" 
                  sx={{ 
                    width: 6, 
                    height: 6, 
                    bgcolor: colorScheme.dotColor, 
                    borderRadius: "50%", 
                    mr: 0.5,
                    display: "inline-block"
                  }}
                />
                {source}
              </Box>
            )}
            {isLastItem && showCursor && <Cursor />}
          </Typography>
        </Box>
      ) : type === 'data' ? (
        <Box sx={{ ml: 4, mb: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography 
            sx={{ 
              color: alpha("#fff", 0.8),
              fontSize: "0.88rem"
            }}
          >
            {content ? `${title}: ${content}` : title}
            {isLastItem && showCursor && <Cursor />}
          </Typography>
          {source && (
            <Box component="span" sx={{ 
              ml: 1,
              px: 0.8, 
              py: 0.1, 
              bgcolor: colorScheme.lightBg, 
              borderRadius: 0.5,
              fontSize: "0.65rem",
              color: colorScheme.lightText,
              fontWeight: 500,
              letterSpacing: "0.01em"
            }}>
              via {source}
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ 
          mt: 2,
          p: 1.5, 
          bgcolor: "rgba(16, 185, 129, 0.15)", 
          borderRadius: 1,
          border: "1px solid rgba(16, 185, 129, 0.3)"
        }}>
          <Typography 
            sx={{ 
              color: "#10B981",
              fontWeight: 600,
              fontSize: "0.9rem"
            }}
          >
            {content ? `${title}: ${content}` : title}
            {isLastItem && showCursor && <Cursor />}
          </Typography>
        </Box>
      )}
    </motion.div>
  );
};

export function Hero() {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentReportType, setCurrentReportType] = useState<'llm' | 'cv'>('llm');
  const [agentStatus, setAgentStatus] = useState<'idle' | 'thinking' | 'generating'>('idle');
  const [scrollPosition, setScrollPosition] = useState(0);
  const reportContainerRef = useRef<HTMLDivElement>(null);
  const animationTimer = useRef<NodeJS.Timeout | null>(null);
  const resetTimer = useRef<NodeJS.Timeout | null>(null);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);
  const statusTimer = useRef<NodeJS.Timeout | null>(null);

  // LLM Report sections data
  const llmReportSections = [
    { id: 'header', title: 'AI Model Governance Report', type: 'header' },
    { id: 'model', title: 'Model: LLM-Governance-v2.1', type: 'section' },
    { id: 'date', title: 'Deployed: June 15, 2023', type: 'data' },
    
    { id: 'risk', title: 'Risk Assessment', type: 'section', source: 'Arize' },
    { id: 'risk1', title: 'Overall Risk Score', content: '72/100 (Moderate)', type: 'data', source: 'Arize' },
    { id: 'risk3', title: 'Operational Risk', content: 'Moderate (58/100)', type: 'data', source: 'Arize' },
    
    { id: 'metrics', title: 'Performance Metrics', type: 'section' },
    { id: 'metrics1', title: 'Accuracy', content: '94.3%', type: 'data' },
    { id: 'metrics3', title: 'Latency', content: '127ms (p95)', type: 'data' },
    
    { id: 'fairness', title: 'Fairness Assessment', type: 'section' },
    { id: 'fairness1', title: 'Demographic Parity', content: '0.97 (Excellent)', type: 'data' },
    
    { id: 'compliance', title: 'Regulatory Compliance', type: 'section' },
    { id: 'compliance1', title: 'EU AI Act', content: 'Compliant', type: 'data' },
    { id: 'compliance3', title: 'Model Documentation', content: 'Complete', type: 'data' },
    
    // Stakeholders section - shortened
    { id: 'stakeholders', title: 'Stakeholders', type: 'section' },
    { id: 'stakeholders1', title: 'Model Owner', content: 'AI Governance Team', type: 'data' },
    { id: 'stakeholders4', title: 'Compliance Officer', content: 'David Chen', type: 'data' },
    
    // Model Lifecycle section - shortened
    { id: 'lifecycle', title: 'Model Lifecycle & Maintenance', type: 'section', source: 'Arize' },
    { id: 'lifecycle2', title: 'Last Retraining', content: 'May 30, 2023', type: 'data', source: 'Arize' },
    { id: 'lifecycle3', title: 'Drift Detection', content: 'Active (weekly)', type: 'data', source: 'Arize' },
    
    { id: 'conclusion', title: 'Report Status', content: 'Approved for Production', type: 'conclusion' },
  ];

  // Computer Vision Report sections data
  const cvReportSections = [
    { id: 'cv-header', title: 'Computer Vision Model Report', type: 'header' },
    { id: 'cv-model', title: 'Model: ObjectDetect-CV-3.4', type: 'section' },
    { id: 'cv-date', title: 'Deployed: August 3, 2023', type: 'data' },
    
    { id: 'cv-performance', title: 'Model Performance', type: 'section', source: 'Openlayer' },
    { id: 'cv-metrics1', title: 'mAP (IoU=0.5)', content: '0.87', type: 'data', source: 'Openlayer' },
    { id: 'cv-metrics2', title: 'Precision', content: '91.2%', type: 'data', source: 'Openlayer' },
    
    { id: 'cv-thresholds', title: 'Confidence Thresholds', type: 'section', source: 'Openlayer' },
    { id: 'cv-thresh1', title: 'Detection Threshold', content: '0.65', type: 'data', source: 'Openlayer' },
    
    { id: 'cv-robustness', title: 'Robustness Analysis', type: 'section' },
    { id: 'cv-robust1', title: 'Light Variation', content: '96.3% retention', type: 'data' },
    { id: 'cv-robust3', title: 'Angle Variation', content: '78.9% retention', type: 'data' },
    
    { id: 'cv-testing', title: 'Downstream Testing', type: 'section' },
    { id: 'cv-test2', title: 'Adversarial Testing', content: 'Passed', type: 'data' },
    
    // Stakeholders section - shortened
    { id: 'cv-stakeholders', title: 'Stakeholders', type: 'section' },
    { id: 'cv-stakeholders1', title: 'Project Lead', content: 'Michael Torres', type: 'data' },
    { id: 'cv-stakeholders3', title: 'Hardware Team', content: 'Edge Devices', type: 'data' },
    
    // Model Lifecycle section - shortened
    { id: 'cv-lifecycle', title: 'Model Lifecycle & Maintenance', type: 'section', source: 'Openlayer' },
    { id: 'cv-lifecycle2', title: 'Training Duration', content: '72 hours', type: 'data', source: 'Openlayer' },
    { id: 'cv-lifecycle5', title: 'Model Refresh', content: 'Bi-monthly', type: 'data', source: 'Openlayer' },
    
    { id: 'cv-conclusion', title: 'Report Status', content: 'Approved for Deployment', type: 'conclusion' },
  ];

  // Get the current active report sections based on report type
  const reportSections = currentReportType === 'llm' ? llmReportSections : cvReportSections;

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (animationTimer.current) clearTimeout(animationTimer.current);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      if (statusTimer.current) clearTimeout(statusTimer.current);
    };
  }, []);

  // Handle auto-scrolling as content grows
  useEffect(() => {
    if (!reportContainerRef.current || activeIndex <= 5) return;
    
    // Calculate where to scroll based on active index - maintain last few items in view
    const container = reportContainerRef.current;
    const contentHeight = container.scrollHeight;
    const viewportHeight = container.clientHeight;
    
    // Only need to scroll if content exceeds viewport
    if (contentHeight > viewportHeight) {
      // Determine scroll position to keep the active content in view
      // This formula smoothly scrolls as new content appears
      const newScrollPosition = Math.max(
        0,
        (contentHeight - viewportHeight) * (activeIndex / reportSections.length)
      );
      
      // Apply scrolling with animation
      scrollTimer.current = setTimeout(() => {
        container.scrollTo({
          top: newScrollPosition,
          behavior: 'smooth'
        });
      }, 150);
    }
  }, [activeIndex, reportSections.length]);

  // Control the animation sequence
  useEffect(() => {
    // Start animation after component mounts
    if (activeIndex === -1) {
      // First set to thinking state
      setAgentStatus('thinking');
      
      animationTimer.current = setTimeout(() => {
        // After short thinking period, switch to generating
        setAgentStatus('generating');
        setActiveIndex(0);
        setScrollPosition(0);
        setProgress(5);
      }, 1500); // Longer delay to show thinking first
      return;
    }

    // Update progress based on current index
    setProgress(Math.min(100, Math.round(((activeIndex + 1) / reportSections.length) * 100)));

    // If animation is complete, reset after delay and switch report type
    if (activeIndex >= reportSections.length) {
      // Set back to idle
      setAgentStatus('idle');
      
      resetTimer.current = setTimeout(() => {
        setActiveIndex(-1);
        setProgress(0);
        setScrollPosition(0);
        setCurrentReportType(prev => prev === 'llm' ? 'cv' : 'llm');
      }, 2000);
      return;
    }

    // Continue the animation with varying delays based on section type
    const currentType = activeIndex < reportSections.length ? reportSections[activeIndex].type : '';
    const delay = 
      currentType === 'header' ? 700 : 
      currentType === 'section' ? 450 : 
      currentType === 'conclusion' ? 850 : 
      250;

    animationTimer.current = setTimeout(() => {
      setActiveIndex(prev => prev + 1);
    }, delay);
  }, [activeIndex, reportSections.length, currentReportType]);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        pt: "80px",
        background: "linear-gradient(135deg, #111827 0%, #1F2937 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background grid pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/grid-pattern.svg')",
          backgroundRepeat: "repeat",
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      {/* Gradient blurs */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "-5%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)",
          filter: "blur(70px)",
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 70%)",
          filter: "blur(70px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box textAlign={{ xs: "center", lg: "left" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontSize: { xs: "2.75rem", sm: "3.5rem", md: "4rem", lg: "4.5rem" },
                      fontWeight: 800,
                      lineHeight: 1.1,
                      letterSpacing: "-0.05em",
                      mb: 1,
                      color: "white",
                    }}
                  >
                    Model Governance
                  </Typography>
                  <Typography
                    variant="h1"
                    component="span"
                    sx={{
                      fontSize: { xs: "2.75rem", sm: "3.5rem", md: "4rem", lg: "4.5rem" },
                      fontWeight: 800,
                      lineHeight: 1.1,
                      letterSpacing: "-0.05em",
                      mb: 3,
                      background: "linear-gradient(90deg, #60A5FA 0%, #A78BFA 100%)",
                      backgroundClip: "text",
                      color: "transparent",
                      display: "inline-block",
                    }}
                  >
                    Automated by AI
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "1rem", md: "1.25rem" },
                      color: alpha("#fff", 0.8),
                      maxWidth: "500px",
                      mt: 3,
                      mb: 2,
                      mx: { xs: "auto", lg: 0 },
                    }}
                  >
                    AI agents that enable end-to-end model governance reporting. We link to your observability tools and deliver ready-to-submit compliance reports.
                  </Typography>
                  
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.1rem", md: "1.3rem" },
                      mb: 4,
                      background: "linear-gradient(90deg, #10B981 0%, #3B82F6 100%)",
                      backgroundClip: "text",
                      color: "transparent",
                      display: "inline-block",
                      mx: { xs: "auto", lg: 0 },
                    }}
                  >
                    No migration required. Works with your existing tools.
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Box 
                    sx={{
                      display: "flex", 
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                      justifyContent: { xs: "center", lg: "flex-start" }
                    }}
                  >
                    <Box sx={{ display: "inline-block" }}>
                      <Link href="#contact" style={{ textDecoration: 'none' }}>
                        <PrimaryButton
                          variant="contained"
                          disableElevation
                        >
                          Get in Touch
                        </PrimaryButton>
                      </Link>
                    </Box>
                    <Box sx={{ display: "inline-block" }}>
                      <Link href="#features" style={{ textDecoration: 'none' }}>
                        <SecondaryButton
                          variant="outlined"
                          endIcon={<ArrowForwardIcon />}
                          disableElevation
                        >
                          Learn More
                        </SecondaryButton>
                      </Link>
                    </Box>
                  </Box>
                </motion.div>
              </motion.div>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <DemoWindow elevation={0}>
                  {/* Window controls */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Box sx={{ width: 120, height: 18, bgcolor: "#374151", borderRadius: 1 }} />
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#EF4444" }} />
                      <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#F59E0B" }} />
                      <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#10B981" }} />
                    </Box>
                  </Box>

                  {/* Progress bar */}
                  <Box sx={{ width: "100%", height: 3, bgcolor: "rgba(55, 65, 81, 0.3)", mb: 3, borderRadius: 1, overflow: "hidden" }}>
                    <motion.div
                      style={{ height: "100%", backgroundColor: "#3B82F6" }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </Box>

                  {/* Dynamic report content */}
                  <Box 
                    ref={reportContainerRef}
                    sx={{ 
                      mb: 3, 
                      height: 260, 
                      overflow: "auto",
                      scrollBehavior: "smooth",
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "rgba(55, 65, 81, 0.1)",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(59, 130, 246, 0.5)",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentReportType}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        {reportSections.slice(0, activeIndex).map((section, index) => (
                          <ReportSection
                            key={section.id}
                            title={section.title}
                            content={section.content}
                            type={section.type}
                            isLastItem={index === activeIndex - 1}
                            showCursor={showCursor}
                            source={section.source}
                          />
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </Box>

                  {/* Action button and agent indicator */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/* Agent generating text - always maintain the space even when hidden */}
                    <Box sx={{ minWidth: '150px' }}>
                      {agentStatus !== 'idle' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.85 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SpinningLoader />
                            <Typography variant="caption" sx={{ fontSize: "0.75rem", color: alpha("#fff", 0.8) }}>
                              {agentStatus === 'thinking' ? 'agent thinking' : 'agent generating'}
                              <AnimatedDots />
                            </Typography>
                          </Box>
                        </motion.div>
                      )}
                    </Box>
                    
                    {/* Empty middle space to push button to the right */}
                    <Box sx={{ flexGrow: 1 }} />
                    
                    {/* Generate Report button - always stays on the right */}
                    <Box>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Box sx={{ 
                          width: 120, 
                          height: 36, 
                          bgcolor: "#3B82F6", 
                          borderRadius: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer"
                        }}>
                          <Typography sx={{ color: "#fff", fontSize: "0.85rem", fontWeight: 500 }}>
                            Generate Report
                          </Typography>
                        </Box>
                      </motion.div>
                    </Box>
                  </Box>
                </DemoWindow>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 