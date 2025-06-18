"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

// Badge component similar to highlight component
const FeatureBadge = styled(Box)(({ theme }) => ({
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

// Simulation container with fading background
const SimulationContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to bottom, ${theme.palette.background.paper} 0%, ${theme.palette.background.paper} 70%, transparent 100%)`,
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "24px",
  height: "320px",
  width: "100%",
  maxWidth: "500px",
  position: "relative",
  overflow: "hidden",
}));

// Knowledge Graph Simulation Component
const KnowledgeGraphSimulation = () => {
  const theme = useTheme();
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [connections, setConnections] = useState<number[]>([]);

  // Define node positions and connections
  const nodes = [
    { id: 0, x: 50, y: 50, label: "Constitutional AI", isCenter: true },
    { id: 1, x: 18, y: 32, label: "RLHF Methods" },
    { id: 2, x: 78, y: 22, label: "LLM Safety" },
    { id: 3, x: 25, y: 75, label: "Alignment Research" },
    { id: 4, x: 82, y: 68, label: "AI Ethics" },
    { id: 5, x: 35, y: 18, label: "Preference Learning" },
    { id: 6, x: 65, y: 28, label: "Value Alignment" },
    { id: 7, x: 15, y: 88, label: "Human Feedback" },
    { id: 8, x: 88, y: 82, label: "Safety Metrics" },
  ];

  const nodeConnections = [
    [0, 1], [0, 2], [0, 3], [0, 4],  // Center to main nodes
    [1, 5], [2, 6], [3, 7], [4, 8],  // Main nodes to outer nodes
    [1, 2], [3, 8], [5, 6], [7, 4], [2, 7], [1, 8]   // Random cross connections
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNodes(prev => {
        if (prev.length === 0) return [0]; // Start with center node
        if (prev.length < nodes.length) {
          return [...prev, prev.length];
        }
        return []; // Reset
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnections(prev => {
        if (activeNodes.length <= 1) return [];
        if (prev.length < nodeConnections.length) {
          return [...prev, prev.length];
        }
        return [];
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [activeNodes]);

  return (
    <Box sx={{ 
      width: "100%", 
      height: "100%", 
      position: "relative",
      background: `radial-gradient(circle at center, ${theme.palette.primary.light}20 0%, transparent 70%)`
    }}>
      {/* Header */}
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        mb: 2,
        px: 1
      }}>
        <AccountTreeIcon sx={{ fontSize: 14, color: "success.main", mr: 1 }} />
        <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", fontWeight: 600 }}>
          Knowledge Graph Discovery
        </Typography>
      </Box>

      {/* SVG for connections */}
      <Box
        component="svg"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        {nodeConnections.map((connection, index) => {
          const [nodeA, nodeB] = connection;
          const nodeAPos = nodes[nodeA];
          const nodeBPos = nodes[nodeB];
          
          return (
            <motion.line
              key={`connection-${index}`}
              x1={`${nodeAPos.x}%`}
              y1={`${nodeAPos.y}%`}
              x2={`${nodeBPos.x}%`}
              y2={`${nodeBPos.y}%`}
              stroke={index < 4 ? theme.palette.info.main : theme.palette.info.light}
              strokeWidth={index < 4 ? "2" : "1"}
              strokeOpacity={connections.includes(index) ? (index < 4 ? 0.8 : 0.4) : 0}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: connections.includes(index) ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
            />
          );
        })}
      </Box>

      {/* Nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          style={{
            position: "absolute",
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: activeNodes.includes(node.id) ? 1 : 0,
            opacity: activeNodes.includes(node.id) ? 1 : 0,
          }}
          transition={{ 
            duration: 0.5, 
            delay: node.isCenter ? 0 : 0.3,
            type: "spring",
            stiffness: 200 
          }}
        >
          <Box
            sx={{
              width: node.isCenter ? 16 : 12,
              height: node.isCenter ? 16 : 12,
              borderRadius: "50%",
              bgcolor: node.isCenter ? "info.main" : "info.light",
              border: `2px solid ${node.isCenter ? theme.palette.info.dark : theme.palette.info.main}`,
              boxShadow: `0 0 10px ${theme.palette.info.main}40`,
              position: "relative",
            }}
          />
          <Typography
            sx={{
              position: "absolute",
              top: node.isCenter ? 22 : 18,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: node.isCenter ? "0.5rem" : "0.4rem",
              color: "text.primary",
              fontWeight: node.isCenter ? 600 : 500,
              whiteSpace: "nowrap",
              textAlign: "center",
              bgcolor: "rgba(28, 28, 28, 0.8)",
              px: 0.5,
              py: 0.2,
              borderRadius: 0.5,
            }}
          >
            {node.label}
          </Typography>
        </motion.div>
      ))}


    </Box>
  );
};

// LaTeX Writing Simulation Component
const LaTeXWritingSimulation = () => {
  const theme = useTheme();
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [latexCode, setLatexCode] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const simulationSteps = [
    {
      prompt: "Adding methodology section...",
      latex: `\\section{Methodology}
This study presents a comprehensive evaluation 
framework for large language models.`
    },
    {
      prompt: "Adding subsection for architecture...",
      latex: `\\section{Methodology}
This study presents a comprehensive evaluation 
framework for large language models.

\\subsection{Model Architecture Analysis}
We evaluate transformer-based architectures with 
varying parameter counts from 1B to 175B parameters.`
    },
    {
      prompt: "Inserting citations for methodology...",
      latex: `\\section{Methodology}
This study presents a comprehensive evaluation 
framework for large language models.

\\subsection{Model Architecture Analysis}
We evaluate transformer-based architectures with 
varying parameter counts from 1B to 175B parameters 
\\citep{vaswani2017attention, brown2020language}.`
    }
  ];

  useEffect(() => {
    const runSimulation = async () => {
      for (let i = 0; i < simulationSteps.length; i++) {
        const step = simulationSteps[i];
        
        // Add chat message (replace entire array to ensure clean state)
        setChatMessages(simulationSteps.slice(0, i + 1).map(s => s.prompt));
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Type LaTeX code incrementally
        setIsTyping(true);
        const previousLength = i === 0 ? 0 : simulationSteps[i - 1].latex.length;
        const newContent = step.latex.substring(previousLength);
        
        for (let j = 0; j <= newContent.length; j++) {
          const currentContent = step.latex.substring(0, previousLength + j);
          setLatexCode(currentContent);
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        setIsTyping(false);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      // Reset both states simultaneously before next cycle
      setChatMessages([]);
      setLatexCode("");
      setIsTyping(false);
      
      // Wait a moment to show the reset state, then restart
      await new Promise(resolve => setTimeout(resolve, 1000));
      runSimulation();
    };

    runSimulation();
  }, []);

  return (
    <Box sx={{ 
      width: "100%", 
      height: "100%", 
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header */}
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        mb: 2,
        px: 1
      }}>
        <CodeIcon sx={{ fontSize: 14, color: "warning.main", mr: 1 }} />
        <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", fontWeight: 600 }}>
        Writing Environment
        </Typography>
      </Box>

      <Box sx={{ 
        display: "flex",
        gap: 1,
        flex: 1
      }}>
        {/* Chat Panel */}
      <Box sx={{ 
        flex: 1,
        bgcolor: "rgba(255, 255, 255, 0.02)",
        borderRadius: 1,
        border: "1px solid rgba(255, 255, 255, 0.05)",
        p: 1.5,
        display: "flex",
        flexDirection: "column"
      }}>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          mb: 1,
          pb: 1,
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
        }}>
          <Box sx={{ 
            width: 8, 
            height: 8, 
            borderRadius: "50%", 
            bgcolor: "success.main", 
            mr: 1 
          }} />
                     <Typography sx={{ fontSize: "0.6rem", color: "text.secondary", fontWeight: 600 }}>
             Agent Writing
           </Typography>
        </Box>
        
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <AnimatePresence>
            {chatMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{
                  p: 1,
                  borderRadius: 0.5,
                  bgcolor: "rgba(96, 165, 250, 0.1)",
                  border: "1px solid rgba(96, 165, 250, 0.2)"
                }}>
                  <Typography sx={{ 
                    fontSize: "0.5rem", 
                    color: "info.main",
                    fontFamily: "monospace"
                  }}>
                    {message}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      </Box>

      {/* LaTeX Panel */}
      <Box sx={{ 
        flex: 1,
        bgcolor: "rgba(255, 255, 255, 0.02)",
        borderRadius: 1,
        border: "1px solid rgba(255, 255, 255, 0.05)",
        p: 1.5,
        display: "flex",
        flexDirection: "column"
      }}>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          mb: 1,
          pb: 1,
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
        }}>
          <CodeIcon sx={{ fontSize: 12, color: "warning.main", mr: 1 }} />
          <Typography sx={{ fontSize: "0.6rem", color: "text.secondary", fontWeight: 600 }}>
            LaTeX Output
          </Typography>
        </Box>
        
        <Box sx={{ 
          flex: 1,
          fontFamily: "monospace",
          fontSize: "0.45rem",
          lineHeight: 1.4,
          color: "text.secondary",
          whiteSpace: "pre-wrap",
          overflow: "hidden"
        }}>
          {latexCode}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{ 
                color: theme.palette.warning.main,
                marginLeft: 2
              }}
            >
              |
            </motion.span>
          )}
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export function Features() {
  const theme = useTheme();

  return (
    <Box
      id="features"
      sx={{
        position: "relative",
        py: { xs: 6, md: 8 },
        mx: { xs: 2, sm: 3, md: 4 },
        my: { xs: 4, md: 6 },
        borderRadius: 5,
        border: "1px solid transparent",
        backgroundColor: "transparent",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          padding: "1px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.3) 100%)",
          borderRadius: "inherit",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMaskComposite: "xor",
        }
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
          opacity: 0.02,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <FeatureBadge>
            <Typography sx={{ color: "text.primary", fontSize: "0.875rem", fontWeight: 600 }}>
              Product Features
            </Typography>
          </FeatureBadge>
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
          What Chirpz Delivers
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
            mb: 8,
            maxWidth: "600px",
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          One unified environment to conduct deep research, write complex papers, and compile publication-ready drafts.
        </Typography>

        {/* Feature 1 - Text Left, Visual Right */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 12 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.85rem",
                  color: "info.main",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  mb: 2,
                  display: "block",
                }}
              >
                Go from zero to first draft in minutes.
              </Typography>
              
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  fontSize: { xs: "1.5rem", md: "2.5rem" },
                  fontWeight: 600,
                  mb: 3,
                  color: "text.primary",
                  letterSpacing: "-0.01em",
                }}
              >
                Proactive Research & Synthesis
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "0.95rem", md: "1rem" },
                  color: "text.secondary",
                  lineHeight: 1.7,
                  maxWidth: "480px",
                }}
              >
                We connect to a universe of academic journals and pre-print servers, building a comprehensive knowledge base for any topic in real-time.
              </Typography>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <SimulationContainer>
                <KnowledgeGraphSimulation />
              </SimulationContainer>
            </Box>
          </Grid>
        </Grid>

        {/* Feature 2 - Text Left, Visual Right */}
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.85rem",
                  color: "info.main",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  mb: 2,
                  display: "block",
                }}
              >
                Write and edit with natural language.
              </Typography>
              
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  fontSize: { xs: "1.5rem", md: "2.5rem" },
                  fontWeight: 600,
                  mb: 3,
                  color: "text.primary",
                  letterSpacing: "-0.01em",
                }}
              >
                Agentic LaTeX Writing
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "0.95rem", md: "1rem" },
                  color: "text.secondary",
                  lineHeight: 1.7,
                  maxWidth: "480px",
                }}
              >
                Converse with your agent to draft sections, create tables, and manage citations in a single, distraction-free environment powered by trusted models like Gemini.
              </Typography>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <SimulationContainer>
                <LaTeXWritingSimulation />
              </SimulationContainer>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
