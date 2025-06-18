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
  useTheme
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

const PrimaryButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  color: theme.palette.common.black,
  fontWeight: 600,
  "&:hover": {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
  }
}));

const SecondaryButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    borderColor: "rgba(255, 255, 255, 0.3)",
  }
}));

const DemoWindow = styled(Paper)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "24px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
  backdropFilter: "blur(12px)",
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
        border: "1.5px solid rgba(52, 211, 153, 0.6)",
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
  const theme = useTheme();
  // Define color schemes for different sources
  const sourceColors = {
    ArXiv: {
      bg: "rgba(14, 165, 233, 0.15)", // info
      border: "rgba(14, 165, 233, 0.3)",
      text: theme.palette.info.main,
      dotColor: theme.palette.info.main,
      lightBg: "rgba(14, 165, 233, 0.1)",
      lightText: "rgba(14, 165, 233, 0.8)"
    },
    NSF: {
      bg: "rgba(99, 102, 241, 0.15)", // custom
      border: "rgba(99, 102, 241, 0.3)",
      text: "#6366F1",
      dotColor: "#6366F1",
      lightBg: "rgba(99, 102, 241, 0.1)",
      lightText: "rgba(99, 102, 241, 0.8)"
    },
    PubMed: {
      bg: "rgba(236, 72, 153, 0.15)", // custom
      border: "rgba(236, 72, 153, 0.3)",
      text: "#EC4899",
      dotColor: "#EC4899",
      lightBg: "rgba(236, 72, 153, 0.1)",
      lightText: "rgba(236, 72, 153, 0.8)"
    },
    IEEE: {
      bg: "rgba(249, 115, 22, 0.15)", // warning
      border: "rgba(249, 115, 22, 0.3)",
      text: theme.palette.warning.main,
      dotColor: theme.palette.warning.main,
      lightBg: "rgba(249, 115, 22, 0.1)",
      lightText: "rgba(249, 115, 22, 0.8)"
    },
    Nature: {
      bg: "rgba(16, 185, 129, 0.15)", // success
      border: "rgba(16, 185, 129, 0.3)",
      text: theme.palette.success.main,
      dotColor: theme.palette.success.main,
      lightBg: "rgba(16, 185, 129, 0.1)",
      lightText: "rgba(16, 185, 129, 0.8)"
    }
  };
  
  // Get the color scheme based on source, default to ArXiv
  const colorScheme = sourceColors[source as keyof typeof sourceColors] || sourceColors.ArXiv;
  
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
              color: "info.main", 
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
            bgcolor: "info.dark", 
            mr: 1.5 
          }} />
          <Typography 
            sx={{ 
              color: "text.primary",
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
              color: "text.secondary",
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
             {source}
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
              color: "success.main",
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

// Add Badge styled component after the other styled components
const BadgeButton = styled(Box)(({ theme }) => ({
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

// LaTeX Code Display Component
interface LaTeXCodeProps {
  code: string;
  isTyping: boolean;
}

const LaTeXCodeDisplay = ({ code, isTyping }: LaTeXCodeProps) => {
  return (
    <Box sx={{
      fontFamily: 'Consolas, "Courier New", monospace',
      bgcolor: 'PrimaryButton.contrastText',
      fontSize: '0.75rem',
      lineHeight: 1.6,
      color: 'text.secondary',
      whiteSpace: 'pre-wrap',
      overflow: 'hidden',
      textAlign: 'left',
      letterSpacing: '0px',
      fontFeatureSettings: '"liga" 0',
      textRendering: 'optimizeSpeed',
      wordBreak: 'break-all'
    }}>
      {code}
      {isTyping && <Cursor />}
    </Box>
  );
};

// PDF Preview Component
interface PDFPreviewProps {
  content: string[];
  activeLines: number;
}

const PDFPreviewDisplay = ({ content, activeLines }: PDFPreviewProps) => {
  return (
    <Box sx={{
      bgcolor: 'PrimaryButton.contrastText',
      borderRadius: 0,
      p: 2,
      height: '100%',
      fontSize: '0.65rem',
      lineHeight: 1.3,
      color: 'grey.900',
      fontFamily: 'serif',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold', mb: 1 , color: 'text.primary'}}>
          Constitutional AI for LLM Safety
        </Typography>
        <Typography sx={{ fontSize: '0.6rem', color: 'text.primary' }}>
          NSF Grant Proposal - AI Safety Initiative
        </Typography>
      </Box>
      
      <Box sx={{ borderBottom: '1px solid', borderColor: 'grey.300', mb: 1.5, pb: 1 }}>
        <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', mb: 0.5 }}>
          Abstract
        </Typography>
        <AnimatePresence>
          {activeLines > 0 && content.slice(0, Math.min(activeLines, content.length)).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Typography sx={{ fontSize: '0.6rem', mb: 0.3, lineHeight: 1.4 }}>
                {line}
              </Typography>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Show additional content as the PDF fills */}
        {activeLines > content.length && (
          <Box sx={{ mt: 1 }}>
            <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold', mb: 0.5 }}>
              1. Introduction
            </Typography>
            <Typography sx={{ fontSize: '0.6rem', lineHeight: 1.4 }}>
              The field of artificial intelligence has made remarkable progress...
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Add some additional styled components for the timeline elements
const TimelineEventBox = styled(Paper)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "10px",
  boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.6)",
  backdropFilter: "blur(12px)",
  maxWidth: "70%",
  margin: "0 auto",
  textAlign: "center",
}));

export function Hero() {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const [progress, setProgress] = useState(0);
  const [agentStatus, setAgentStatus] = useState<'idle' | 'researching' | 'writing'>('idle');
  const [latexCode, setLatexCode] = useState('');
  const [pdfLines, setPdfLines] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const reportContainerRef = useRef<HTMLDivElement>(null);
  const latexContainerRef = useRef<HTMLDivElement>(null);
  const animationTimer = useRef<NodeJS.Timeout | null>(null);
  const resetTimer = useRef<NodeJS.Timeout | null>(null);
  const latexTimer = useRef<NodeJS.Timeout | null>(null);

     // Research Phase sections data
   const researchSections = [
     { id: 'header', title: 'Deep Research Phase: LLM Safety Grant', type: 'header' },
     { id: 'search', title: 'Literature Search Initiated', type: 'section', source: 'ArXiv' },
     { id: 'papers1', title: 'Papers Found', content: '189 relevant publications', type: 'data', source: 'ArXiv' },
     { id: 'papers2', title: 'High Impact Citations', content: '27 breakthrough papers', type: 'data', source: 'Nature' },
     
     { id: 'grants', title: 'Grant Database Scan', type: 'section', source: 'NSF' },
     { id: 'grants1', title: 'Matching Programs', content: 'AI Safety Initiative: $450K available', type: 'data', source: 'NSF' },
     { id: 'grants2', title: 'Deadline Analysis', content: 'Optimal submission: Feb 15', type: 'data', source: 'NSF' },
     
     { id: 'analysis', title: 'Research Gap Analysis', type: 'section', source: 'IEEE' },
     { id: 'gaps1', title: 'Key Opportunity', content: 'Constitutional AI for LLMs', type: 'data', source: 'IEEE' },
     { id: 'gaps2', title: 'Competitive Edge', content: 'RLHF + interpretability unexplored', type: 'data', source: 'PubMed' },
     
     { id: 'synthesis', title: 'Research Synthesis Complete', type: 'section', source: 'Nature' },
     { id: 'synthesis1', title: 'Novel Approach Identified', content: 'Ready for proposal generation', type: 'data', source: 'Nature' },
     
     { id: 'transition', title: 'Initiating LaTeX Generation', content: 'Switching to Writing Mode', type: 'conclusion' },
   ];

       // LaTeX code that gets typed out
  const latexCodeLines = [
    '\\documentclass[11pt]{article}\\usepackage{amsmath}',
    '\\title{Constitutional AI for LLM Safety}\\author{Research Team}',
    '\\begin{document}\\maketitle',
    '\\begin{abstract}',
    'This proposal addresses LLM safety through constitutional AI methods. ',
    'We propose novel RLHF techniques to ensure aligned behavior. ',
    'We request $450,000 over 3 years.',
    '\\end{abstract}'
  ];

     // PDF content lines
   const pdfContent = [
     'This proposal addresses LLM safety through constitutional AI methods.',
     'We propose novel RLHF techniques to ensure aligned behavior.',
     'We request $450,000 over 3 years.'
   ];

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (animationTimer.current) clearTimeout(animationTimer.current);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      if (latexTimer.current) clearTimeout(latexTimer.current);
    };
  }, []);

  // Handle auto-scrolling during research phase
  useEffect(() => {
    if (!reportContainerRef.current || activeIndex < 0 || agentStatus === 'writing') return;
    
    if (activeIndex === 0) {
      if (reportContainerRef.current) {
        reportContainerRef.current.scrollTop = 0;
      }
      return;
    }
    
    const container = reportContainerRef.current;
    const contentHeight = container.scrollHeight;
    const viewportHeight = container.clientHeight;
    
    if (contentHeight > viewportHeight) {
      // On the last item, scroll to the very bottom
      if (activeIndex === researchSections.length - 1) {
        container.scrollTo({
          top: contentHeight - viewportHeight,
          behavior: 'smooth'
        });
      } else {
        const scrollRatio = activeIndex / (researchSections.length - 1);
        const newScrollPosition = Math.max(
          0,
          (contentHeight - viewportHeight) * scrollRatio
        );
        
        container.scrollTo({
          top: newScrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex, agentStatus]);

  // Handle auto-scrolling for LaTeX preview during writing phase
  useEffect(() => {
    if (!latexContainerRef.current || agentStatus !== 'writing') return;
    
    const container = latexContainerRef.current;
    
    // Auto-scroll to bottom as content is added
    const scrollToBottom = () => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    };
    
    // Scroll when latex code updates
    if (latexCode.length > 0) {
      scrollToBottom();
    }
  }, [latexCode, agentStatus]);

  // Control the main animation sequence
  useEffect(() => {
    if (isTransitioning) return;
    
    // Start research phase
    if (activeIndex === -1) {
      setAgentStatus('researching');
      
      animationTimer.current = setTimeout(() => {
        setActiveIndex(0);
        setProgress(5);
        
        if (reportContainerRef.current) {
          reportContainerRef.current.scrollTop = 0;
        }
      }, 1000);
      return;
    }

    // Research phase progression
    if (agentStatus === 'researching' && activeIndex < researchSections.length) {
      setProgress(Math.min(50, Math.round(((activeIndex + 1) / researchSections.length) * 50)));

      const currentType = researchSections[activeIndex]?.type || '';
      const delay = 
        currentType === 'header' ? 1000 :
        currentType === 'section' ? 600 :
        currentType === 'conclusion' ? 1500 : 
        300;

      animationTimer.current = setTimeout(() => {
        if (activeIndex === researchSections.length - 1) {
          // Transition to writing phase
          setAgentStatus('writing');
          setProgress(60);
        } else {
          setActiveIndex(prev => prev + 1);
        }
      }, delay);
      return;
    }

    // Writing phase - start LaTeX generation
    if (agentStatus === 'writing') {
      // Start typing LaTeX code
      let currentLineIndex = 0;
      let currentCharIndex = 0;
      
      const typeLatex = () => {
        if (currentLineIndex >= latexCodeLines.length) {
          // Writing complete, restart cycle
          setProgress(100);
          
          resetTimer.current = setTimeout(() => {
            setIsTransitioning(true);
            setActiveIndex(-1);
            setProgress(0);
            setLatexCode('');
            setPdfLines(0);
            setAgentStatus('idle');
            
            setTimeout(() => {
              setIsTransitioning(false);
            }, 500);
          }, 3000);
          return;
        }
        
        const currentLine = latexCodeLines[currentLineIndex];
        
        if (currentCharIndex < currentLine.length) {
          // Type character by character
          setLatexCode(prev => prev + currentLine[currentCharIndex]);
          currentCharIndex++;
          
          // Update PDF preview based on progress
          if (currentLineIndex >= 4) { // After abstract content starts
            const pdfLineIndex = Math.max(1, currentLineIndex - 3);
            setPdfLines(Math.min(pdfLineIndex, pdfContent.length));
          }
          
          latexTimer.current = setTimeout(typeLatex, 25);
        } else {
          // Move to next line
          setLatexCode(prev => prev + '\n');
          currentLineIndex++;
          currentCharIndex = 0;
          setProgress(60 + (currentLineIndex / latexCodeLines.length) * 40);
          latexTimer.current = setTimeout(typeLatex, 100);
        }
      };
      
      latexTimer.current = setTimeout(typeLatex, 500);
    }
  }, [activeIndex, agentStatus, isTransitioning]);

  // Render research sections
  const renderResearchSections = () => {
    if (agentStatus === 'writing' || activeIndex <= 0) {
      return null;
    }
    
    return researchSections.slice(0, activeIndex + 1).map((section, index) => (
      <ReportSection
        key={section.id}
        title={section.title}
        content={section.content}
        type={section.type}
        isLastItem={index === activeIndex}
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
        backgroundColor: "transparent",
        pt: "80px",
        pb: "10px",
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
          opacity: 0,
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
                {/* Add Badges above "Your AI" */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Box sx={{ 
                    display: "flex", 
                    gap: 1.5, 
                    mb: 3,
                    justifyContent: { xs: "center", lg: "flex-start" },
                    flexWrap: "wrap"
                  }}>
                    <BadgeButton
                      sx={{
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                      }}
                    >
                      Built for Researchers
                    </BadgeButton>
                    <BadgeButton
                      sx={{
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                      }}
                    >
                      Accelerating Discovery
                    </BadgeButton>
                  </Box>
                </motion.div>

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
                      background: (theme) => `linear-gradient(90deg, ${theme.palette.info.main} 0%, ${theme.palette.info.light} 100%)`,
                      backgroundClip: "text",
                      color: "transparent",
                      display: "inline-block",
                    }}
                  >
                    Your AI
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
                      color: "text.primary",
                      display: "block",
                      ml: { xs: 0, sm: 0 }
                    }}
                  >
                    Research Scientist
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
                      color: "text.secondary",
                      maxWidth: "500px",
                      mt: 3,
                      mb: 2,
                      mx: { xs: "auto", lg: 0 },
                    }}
                  >
                    The agent that proactively researches and writes proposals on your behalf. No manual literature review. No LaTeX struggles.
                  </Typography>
                  
                  {/* <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.1rem", md: "1.3rem" },
                      mb: 4,
                      background: (theme) => `linear-gradient(90deg, ${theme.palette.success.main} 0%, ${theme.palette.info.main} 100%)`,
                      backgroundClip: "text",
                      color: "transparent",
                      display: "inline-block",
                      mx: { xs: "auto", lg: 0 },
                    }}
                  >
                    Focus on Discovery, Not the Paperwork.
                  </Typography> */}
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
                      justifyContent: { xs: "center", lg: "flex-start" },
                    }}
                  >
                    <Box sx={{ display: "inline-block", pt: 4 }}>
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

          <Grid size={{ xs: 12, lg: 6}}>
            <Box sx={{ display: "block", pr: 0 }}>
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
                          background: (theme) => `linear-gradient(to bottom, ${theme.palette.info.main}00 0%, ${theme.palette.info.main}ff 100%)`,
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
                            bgcolor: 'rgba(96, 165, 250, 0.2)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            border: '1px solid',
                            borderColor: 'rgba(96, 165, 250, 0.5)'
                          }}
                        >
                          <DescriptionIcon sx={{ fontSize: 14, color: 'info.main' }} />
                        </Box>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'info.main' }}>
                          Proactive Research
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
                        background: (theme) => `linear-gradient(to bottom, ${theme.palette.info.main}ff 0%, ${theme.palette.info.main}00 100%)`,
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
                      <Box sx={{ width: 120, height: 18, bgcolor: "primary.light", borderRadius: 1 }} />
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "error.main" }} />
                        <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "warning.main" }} />
                        <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "success.main" }} />
                      </Box>
                    </Box>

                    {/* Progress bar */}
                    <Box sx={{ width: "100%", height: 3, bgcolor: "action.disabledBackground", mb: 3, borderRadius: 1, overflow: "hidden" }}>
                      <motion.div
                        style={{ height: "100%", backgroundColor: theme.palette.info.main }}
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </Box>

                    {/* Dynamic content - Research Phase or Writing Phase */}
                    {agentStatus === 'writing' ? (
                      // Overleaf-like LaTeX editor with PDF preview
                      <Box sx={{ mb: 3, height: { xs: 200, sm: 220, md: 260 } }}>
                        <Box sx={{ display: 'flex', gap: 1, height: '100%' }}>
                          {/* LaTeX Code Panel */}
                          <Box 
                            ref={latexContainerRef}
                            sx={{ 
                            flex: 1, 
                            bgcolor: "background.paper", 
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 1, 
                            p: 1.5,
                            overflow: "auto",
                            "&::-webkit-scrollbar": {
                              display: "none",
                            },
                            scrollbarWidth: "none", // Firefox
                            msOverflowStyle: "none", // IE/Edge
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                              <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 600 }}>
                                proposal.tex
                              </Typography>
                            </Box>
                            <LaTeXCodeDisplay code={latexCode} isTyping={agentStatus === 'writing'} />
                          </Box>
                          
                          {/* PDF Preview Panel */}
                          <Box sx={{ 
                            flex: 1, 
                            bgcolor: "background.paper", 
                            borderRadius: 1, 
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pb: 1, borderBottom: '1px solid rgba(75, 85, 99, 0.3)' }}>
                              <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 600 }}>
                                PDF Preview
                              </Typography>
                            </Box>
                            <Box sx={{ flex: 1, overflow: 'hidden'}}>
                              <PDFPreviewDisplay content={pdfContent} activeLines={pdfLines} />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      // Research Phase Display
                      <Box 
                        ref={reportContainerRef}
                        sx={{ 
                          mb: 3, 
                          height: { xs: 200, sm: 220, md: 260 }, 
                          overflow: "auto",
                          scrollBehavior: "smooth",
                          "&::-webkit-scrollbar": {
                            display: "none",
                          },
                          scrollbarWidth: "none", // Firefox
                          msOverflowStyle: "none", // IE/Edge
                        }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${agentStatus}-${isTransitioning ? 'transition' : 'active'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                          >
                            {renderResearchSections()}
                          </motion.div>
                        </AnimatePresence>
                      </Box>
                    )}

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
                              <Typography variant="caption" sx={{ fontSize: "0.75rem", color: "#B3B3B3" }}>
                                {agentStatus === 'researching' ? 'agent researching' : 'Research Agent Working'}
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
                        background: (theme) => `linear-gradient(to top, ${theme.palette.info.main}ff 0%, ${theme.palette.info.main}00 100%)`,
                        zIndex: 1
                      }}
                    />
                  </motion.div>
                  
                  {/* Scientist Review Box - Bottom of Timeline */}
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
                            border: '1px solid',
                            borderColor: 'rgba(16, 185, 129, 0.5)'
                          }}
                        >
                          <PersonIcon sx={{ fontSize: 14, color: 'success.main' }} />
                        </Box>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'success.main' }}>
                          Scientist Review
                        </Typography>
                        
                        <CheckCircleIcon 
                          sx={{ 
                            fontSize: 20, 
                            color: 'success.main'
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
                        background: (theme) => `linear-gradient(to bottom, ${theme.palette.info.main}ff 0%, ${theme.palette.info.main}00 100%)`,
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