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
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
    },
    LangSmith: {
      bg: "rgba(236, 72, 153, 0.15)",
      border: "rgba(236, 72, 153, 0.3)",
      text: "#EC4899",
      dotColor: "#EC4899",
      lightBg: "rgba(236, 72, 153, 0.1)",
      lightText: "rgba(236, 72, 153, 0.8)"
    },
    SageMaker: {
      bg: "rgba(249, 115, 22, 0.15)",
      border: "rgba(249, 115, 22, 0.3)",
      text: "#F97316",
      dotColor: "#F97316",
      lightBg: "rgba(249, 115, 22, 0.1)",
      lightText: "rgba(249, 115, 22, 0.8)"
    },
    Watsonx: {
      bg: "rgba(16, 185, 129, 0.15)",
      border: "rgba(16, 185, 129, 0.3)",
      text: "#10B981",
      dotColor: "#10B981",
      lightBg: "rgba(16, 185, 129, 0.1)",
      lightText: "rgba(16, 185, 129, 0.8)"
    }
  };
  
  // Get the color scheme based on source, default to Arize
  const colorScheme = sourceColors[source as keyof typeof sourceColors] || sourceColors.Arize;
  
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

// Add some additional styled components for the timeline elements
const TimelineConnector = styled(Box)(({ theme }) => ({
  width: 2,
  backgroundColor: "#3B82F6",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1
}));

const TimelineEventBox = styled(Paper)(({ theme }) => ({
  position: "relative",
  backgroundColor: "rgba(17, 24, 39, 0.7)",
  borderRadius: "10px",
  border: "1px solid rgba(75, 85, 99, 0.5)",
  padding: "10px",
  boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(8px)",
  maxWidth: "70%",
  margin: "0 auto",
  textAlign: "center",
}));

export function Hero() {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentReportType, setCurrentReportType] = useState<'llm' | 'cv'>('llm');
  const [agentStatus, setAgentStatus] = useState<'idle' | 'thinking' | 'generating'>('idle');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const reportContainerRef = useRef<HTMLDivElement>(null);
  const animationTimer = useRef<NodeJS.Timeout | null>(null);
  const resetTimer = useRef<NodeJS.Timeout | null>(null);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);
  const statusTimer = useRef<NodeJS.Timeout | null>(null);

  // LLM Report sections data
  const llmReportSections = [
    { id: 'header', title: 'LLM Model Intelligence Dashboard', type: 'header' },
    { id: 'model', title: 'Model: LLM-Analytics-v2.1', type: 'section' },
    { id: 'date', title: 'Analysis Generated: June 15, 2023', type: 'data' },
    
    { id: 'performance', title: 'Performance Analytics', type: 'section', source: 'Arize' },
    { id: 'perf1', title: 'Accuracy Trend', content: '94.3% (↑2.1% this week)', type: 'data', source: 'Arize' },
    { id: 'perf2', title: 'Response Quality', content: '4.7/5.0 avg rating', type: 'data', source: 'Arize' },
    
    { id: 'metrics', title: 'Operational Metrics', type: 'section', source: 'LangSmith' },
    { id: 'metrics1', title: 'Latency Performance', content: '127ms (p95) - Stable', type: 'data', source: 'LangSmith' },
    { id: 'metrics3', title: 'Throughput', content: '1.2K requests/min', type: 'data', source: 'LangSmith' },
    
    { id: 'insights', title: 'Predictive Insights', type: 'section', source: 'Openlayer' },
    { id: 'insights1', title: 'Performance Trend', content: 'Stable growth expected', type: 'data', source: 'Openlayer' },
    
    { id: 'reliability', title: 'Model Reliability', type: 'section', source: 'Arize' },
    { id: 'reliability1', title: 'Drift Detection', content: 'No significant drift', type: 'data', source: 'Arize' },
    { id: 'reliability3', title: 'Error Analysis', content: '2.1% edge case patterns', type: 'data', source: 'LangSmith' },
    
    // Team Workflow section - shortened
    { id: 'workflow', title: 'Team Workflow', type: 'section' },
    { id: 'workflow1', title: 'Model Owner', content: 'AI Development Team', type: 'data' },
    { id: 'workflow4', title: 'Last Review', content: 'David Chen - 2 days ago', type: 'data' },
    
    // Development Lifecycle section - shortened
    { id: 'lifecycle', title: 'Development Lifecycle', type: 'section', source: 'LangSmith' },
    { id: 'lifecycle2', title: 'Last Update', content: 'May 30, 2023', type: 'data', source: 'LangSmith' },
    { id: 'lifecycle3', title: 'Monitoring Status', content: 'Active (continuous)', type: 'data', source: 'Openlayer' },
    
    { id: 'conclusion', title: 'Intelligence Summary', content: 'Performance Optimized - Ready for Scale', type: 'conclusion' },
  ];

  // Computer Vision Report sections data
  const cvReportSections = [
    { id: 'cv-header', title: 'Computer Vision Intelligence Dashboard', type: 'header' },
    { id: 'cv-model', title: 'Model: ObjectDetect-CV-3.4', type: 'section' },
    { id: 'cv-date', title: 'Analysis Generated: August 3, 2023', type: 'data' },
    
    { id: 'cv-performance', title: 'Performance Analytics', type: 'section', source: 'Openlayer' },
    { id: 'cv-metrics1', title: 'mAP Score', content: '0.87 (Excellent)', type: 'data', source: 'Openlayer' },
    { id: 'cv-metrics2', title: 'Precision Rate', content: '91.2% accuracy', type: 'data', source: 'SageMaker' },
    
    { id: 'cv-optimization', title: 'Performance Optimization', type: 'section', source: 'SageMaker' },
    { id: 'cv-thresh1', title: 'Detection Threshold', content: '0.65 optimal setting', type: 'data', source: 'SageMaker' },
    
    { id: 'cv-robustness', title: 'Robustness Insights', type: 'section', source: 'Watsonx' },
    { id: 'cv-robust1', title: 'Environmental Variance', content: '96.3% consistency', type: 'data', source: 'Watsonx' },
    { id: 'cv-robust3', title: 'Angle Sensitivity', content: '78.9% stable range', type: 'data', source: 'Watsonx' },
    
    { id: 'cv-testing', title: 'Predictive Testing', type: 'section', source: 'Openlayer' },
    { id: 'cv-test2', title: 'Edge Case Analysis', content: 'Low risk scenarios', type: 'data', source: 'Openlayer' },
    
    // Team Workflow section - shortened
    { id: 'cv-workflow', title: 'Team Workflow', type: 'section' },
    { id: 'cv-workflow1', title: 'Project Lead', content: 'Michael Torres', type: 'data' },
    { id: 'cv-workflow3', title: 'Deployment Team', content: 'Edge Infrastructure', type: 'data' },
    
    // Development Lifecycle section - shortened
    { id: 'cv-lifecycle', title: 'Development Lifecycle', type: 'section', source: 'SageMaker' },
    { id: 'cv-lifecycle2', title: 'Training Duration', content: '72 hours', type: 'data', source: 'SageMaker' },
    { id: 'cv-lifecycle5', title: 'Update Schedule', content: 'Bi-monthly optimization', type: 'data', source: 'Watsonx' },
    
    { id: 'cv-conclusion', title: 'Intelligence Summary', content: 'Performance Optimized - Ready for Scale', type: 'conclusion' },
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
    if (!reportContainerRef.current || activeIndex < 0) return;
    
    // Reset scroll position when starting a new animation
    if (activeIndex === 0) {
      if (reportContainerRef.current) {
        reportContainerRef.current.scrollTop = 0;
      }
      return;
    }
    
    const container = reportContainerRef.current;
    const contentHeight = container.scrollHeight;
    const viewportHeight = container.clientHeight;
    
    // Only need to scroll if content exceeds viewport
    if (contentHeight > viewportHeight) {
      // If we're at the conclusion item, scroll to the very bottom
      if (activeIndex === reportSections.length - 1) {
        container.scrollTo({
          top: contentHeight,
          behavior: 'smooth'
        });
      } else {
        // For other items, use the proportional scroll
        const newScrollPosition = Math.max(
          0,
          (contentHeight - viewportHeight) * (activeIndex / reportSections.length)
        );
        
        container.scrollTo({
          top: newScrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex, reportSections.length]);

  // Control the animation sequence
  useEffect(() => {
    // Don't process animation updates during transition
    if (isTransitioning) {
      return;
    }
    
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
        
        // Explicitly reset scroll position
        if (reportContainerRef.current) {
          reportContainerRef.current.scrollTop = 0;
        }
      }, 1000);
      return;
    }

    // Update progress based on current index
    setProgress(Math.min(100, Math.round(((activeIndex + 1) / reportSections.length) * 100)));

    // If animation is complete, reset after delay and switch report type
    if (activeIndex >= reportSections.length) {
      // Set back to idle
      setAgentStatus('idle');
      
      // First mark as transitioning to prevent any animation updates
      setIsTransitioning(true);
      
      resetTimer.current = setTimeout(() => {
        // Reset animation states
        setActiveIndex(-1);
        setProgress(0);
        setScrollPosition(0);
        
        // Important: Switch report type only after a complete animation cycle
        setTimeout(() => {
          // Update report type
          setCurrentReportType(prev => prev === 'llm' ? 'cv' : 'llm');
          
          // Explicitly reset scroll position
          if (reportContainerRef.current) {
            reportContainerRef.current.scrollTop = 0;
          }
          
          // Allow animation to proceed again after everything is reset
          setTimeout(() => {
            setIsTransitioning(false);
          }, 70);
        }, 150); 
      }, 1000);
      return;
    }

    // Continue the animation with varying delays based on section type
    const currentType = activeIndex < reportSections.length ? reportSections[activeIndex].type : '';
    const delay = 
      currentType === 'header' ? 1200 :
      currentType === 'section' ? 800 :
      currentType === 'conclusion' ? 850 : 
      400;

    // If this is the last item (conclusion), add extra delay before transitioning
    if (activeIndex === reportSections.length - 1) {
      // First render the conclusion item
      animationTimer.current = setTimeout(() => {
        setActiveIndex(prev => prev + 1);
      }, delay);
      setTimeout(() => {
        setActiveIndex(prev => prev + 1);
      }, delay + 5000);
    } else {
      animationTimer.current = setTimeout(() => {
        setActiveIndex(prev => prev + 1);
      }, delay);
    }
  }, [activeIndex, reportSections.length, currentReportType, isTransitioning]);

  // Render only content that should be visible based on animation state
  const renderReportSections = () => {
    if (isTransitioning || activeIndex <= 0) {
      return null;
    }
    
    return reportSections.slice(0, activeIndex).map((section, index) => (
      <ReportSection
        key={section.id}
        title={section.title}
        content={section.content}
        type={section.type}
        isLastItem={index === activeIndex - 1}
        showCursor={showCursor}
        source={section.source}
      />
    ));
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        pt: "80px",
        pb: "10px",
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
                    component="span"
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "3.25rem", md: "3.75rem", lg: "4.25rem" },
                      fontWeight: 800,
                      lineHeight: 1.1,
                      letterSpacing: "-0.05em",
                      mb: 1,
                      pb: 1,
                      pr: 1,
                      background: "linear-gradient(90deg, #60A5FA 0%, #A78BFA 100%)",
                      backgroundClip: "text",
                      color: "transparent",
                      display: "inline-block",
                    }}
                  >
                    AI Agents 
                  </Typography>
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "2.75rem", md: "3.25rem", lg: "3.5rem" },
                      fontWeight: 800,
                      lineHeight: 1.1,
                      letterSpacing: "-0.05em",
                      mb: 5,
                      color: "white",
                      display: "block",
                      ml: { xs: 0, sm: 0 }
                    }}
                  >
                    for Model Intelligence
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
                    Automate workflow bottlenecks. Get actionable model insights. Stop manual metric gathering—focus on building better AI.
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
                    Plug in. Power up. Ship faster.
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
            <Box sx={{ display: "block" }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ position: "relative" }}
              >
                {/* Add top margin to push entire grid down */}
                <Box sx={{ mt: { xs: 4, sm: 5, md: 6 } }}>
                  {/* Event Trigger Box - Top of Timeline */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    style={{ position: "relative", zIndex: 2 }}
                  >
                    {/* Top Connection Line with Fade Effect */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 40 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      style={{ 
                        position: "relative", 
                        height: 40, 
                        overflow: "visible",
                        width: "100%",
                        marginBottom: -35
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -35,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 2,
                          height: '100%',
                          background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 1) 100%)',
                          zIndex: 1
                        }}
                      />
                    </motion.div>

                    <TimelineEventBox sx={{ 
                      mb: 0.5,
                      maxWidth: { xs: '65%', sm: '55%', md: '45%' }, 
                      mx: "auto",
                    }}>
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1.2,
                        justifyContent: "center"
                      }}>
                        <Box 
                          sx={{ 
                            minWidth: 28, 
                            height: 28, 
                            borderRadius: '50%', 
                            bgcolor: 'rgba(59, 130, 246, 0.2)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            border: '1px solid rgba(59, 130, 246, 0.5)'
                          }}
                        >
                          <DescriptionIcon sx={{ fontSize: 14, color: '#60A5FA' }} />
                        </Box>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#60A5FA' }}>
                          Intelligence Requested
                        </Typography>
                      </Box>
                    </TimelineEventBox>
                  </motion.div>

                  {/* Bottom Connector Line between Report Requested and Simulation Box with Fade Effect */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 30 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    style={{ 
                      position: "relative", 
                      height: 30, 
                      overflow: "visible",
                      width: "100%",
                      marginBottom: -4,
                      marginTop: -4
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 2,
                        height: '100%',
                        background: 'linear-gradient(to bottom, rgba(59, 130, 246, 1) 0%, rgba(59, 130, 246, 0) 100%)',
                        zIndex: 1
                      }}
                    />
                  </motion.div>

                  {/* Main Report Generation Box */}
                  <DemoWindow elevation={0} sx={{ 
                    maxWidth: { xs: '100%', sm: '90%', md: '100%' },
                    mx: { xs: 'auto', sm: 'auto', md: 0 },
                    position: 'relative',
                    zIndex: 2
                  }}>
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
                        height: { xs: 200, sm: 220, md: 260 }, 
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
                          key={`${currentReportType}-${isTransitioning ? 'transition' : 'active'}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          {renderReportSections()}
                        </motion.div>
                      </AnimatePresence>
                    </Box>

                    {/* Action button and agent indicator */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "24px" }}>
                      <Box sx={{ minWidth: '150px', height: '24px', display: 'flex', alignItems: 'center' }}>
                        {agentStatus !== 'idle' && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.85 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <SpinningLoader />
                              <Typography variant="caption" sx={{ fontSize: "0.75rem", color: alpha("#fff", 0.8) }}>
                                {agentStatus === 'thinking' ? 'agent thinking' : 'Intelligence Stream'}
                                <AnimatedDots />
                              </Typography>
                            </Box>
                          </motion.div>
                        )}
                      </Box>
                    </Box>
                  </DemoWindow>
                  
                  {/* Bottom Connector Line */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 30 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    style={{ 
                      position: "relative", 
                      height: 30, 
                      overflow: "visible",
                      width: "100%",
                      marginBottom: -4,
                      marginTop: -4
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 2,
                        height: '100%',
                        background: 'linear-gradient(to top, rgba(59, 130, 246, 1) 0%, rgba(59, 130, 246, 0) 100%)',
                        zIndex: 1
                      }}
                    />
                  </motion.div>
                  
                  {/* Data Scientist Review Box - Bottom of Timeline */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                    style={{ position: "relative", zIndex: 2 }}
                  >
                    <TimelineEventBox sx={{ 
                      mt: 0.5,
                      maxWidth: { xs: '65%', sm: '55%', md: '45%' },
                      mx: "auto"
                    }}>
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        gap: 1.2 
                      }}>
                        <Box 
                          sx={{ 
                            minWidth: 28, 
                            height: 28, 
                            borderRadius: '50%', 
                            bgcolor: 'rgba(16, 185, 129, 0.2)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            border: '1px solid rgba(16, 185, 129, 0.5)'
                          }}
                        >
                          <PersonIcon sx={{ fontSize: 14, color: '#10B981' }} />
                        </Box>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#10B981' }}>
                          Developer Review
                        </Typography>
                        
                        <CheckCircleIcon 
                          sx={{ 
                            fontSize: 20, 
                            color: '#10B981'
                          }} 
                        />
                      </Box>
                    </TimelineEventBox>
                  </motion.div>

                  {/* Final Connector Line to next section with Fade Effect */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 40 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    style={{ 
                      position: "relative", 
                      height: 80,
                      overflow: "visible",
                      width: "100%",
                      marginTop: -4,
                      marginBottom: -10
                    }}
                  >
                    <Box
                      sx={{   
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 2,
                        height: '100%',
                        background: 'linear-gradient(to bottom, rgba(59, 130, 246, 1) 0%, rgba(59, 130, 246, 0) 100%)',
                        zIndex: 1
                      }}
                    />
                  </motion.div>
                </Box>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 