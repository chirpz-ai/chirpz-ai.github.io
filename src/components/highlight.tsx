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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

// Badge component with gradient border (similar to hero badges)
const HighlightBadge = styled(Box)(({ theme }) => ({
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

// Highlight card component
const HighlightCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  paddingTop: "20px",
  paddingBottom: "20px",
  height: "100%",
  maxWidth: "70%",
  margin: "0 auto",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
}));

// Calendar simulation component
const CalendarSimulation = () => {
  const theme = useTheme();
  const [clearedItems, setClearedItems] = useState<number[]>([]);
  
  const calendarItems = [
    { id: 1, text: "Literature Search", color: "#EF4444" },
    { id: 2, text: "Format Paper", color: "#F59E0B" },
    { id: 3, text: "Relevance Map", color: "#10B981" },
    { id: 4, text: "Deep Work", color: theme.palette.info.main, isDeepWork: true },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setClearedItems(prev => {
        if (prev.length === 0) return [1];
        if (prev.length === 1) return [1, 2];
        if (prev.length === 2) return [1, 2, 3];
        // Reset after all items are cleared
        return [];
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ 
      background: `linear-gradient(to bottom, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 70%, transparent 100%)`,
      borderRadius: 1.5, 
      p: 1.5,
      width: "80%", 
      height: "180px",
      display: "flex",
      flexDirection: "column"
    }}>
             {/* Browser tab-like header */}
       <Box sx={{ 
         display: "flex", 
         alignItems: "center", 
         bgcolor: "rgba(255, 255, 255, 0.05)",
         borderRadius: "8px 8px 0 0",
         px: 1,
         py: 0.5,
         mx: -1.5,
         mt: -1.5,
         mb: 1
       }}>
        <CalendarTodayIcon sx={{ fontSize: 12, color: "info.main", mr: 0.5 }} />
        <Typography sx={{ fontSize: "0.6rem", color: "text.secondary", fontWeight: 600 }}>
          Research Calendar
        </Typography>
      </Box>
             
       <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, flex: 1 }}>
         {calendarItems.map((item) => (
           <motion.div
             key={item.id}
             initial={{ opacity: 1, scale: 1 }}
             animate={{
               opacity: clearedItems.includes(item.id) ? 0.3 : 1,
               scale: clearedItems.includes(item.id) ? 0.95 : 1,
               backgroundColor: item.isDeepWork && clearedItems.length >= 3 ? 
                 "rgba(96, 165, 250, 0.2)" : "transparent"
             }}
             transition={{ duration: 0.5 }}
           >
             <Box sx={{
               display: "flex",
               alignItems: "center",
               p: 0.75,
               borderRadius: 0.75,
               border: `1px solid ${clearedItems.includes(item.id) ? 'rgba(255, 255, 255, 0.05)' : item.color}40`,
               position: "relative"
             }}>
               <Box sx={{
                 width: 6,
                 height: 6,
                 borderRadius: "50%",
                 bgcolor: item.color,
                 mr: 0.75,
                 opacity: clearedItems.includes(item.id) ? 0.3 : 1
               }} />
               <Typography sx={{ 
                 fontSize: "0.55rem", 
                 color: clearedItems.includes(item.id) ? "text.disabled" : "text.secondary",
                 textDecoration: clearedItems.includes(item.id) ? "line-through" : "none"
               }}>
                 {item.text}
               </Typography>
             </Box>
           </motion.div>
         ))}
       </Box>
    </Box>
  );
};

// Proposal score simulation component
const ProposalSimulation = () => {
  const theme = useTheme();
  const [score, setScore] = useState(30);
  const [improvements, setImprovements] = useState<string[]>([]);
  
  const possibleImprovements = [
    "Added 12 relevant citations",
    "Strengthened methodology section",
    "Enhanced budget justification",
    "Improved research objectives"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setImprovements(prev => {
        if (prev.length < possibleImprovements.length) {
          const nextImprovement = possibleImprovements[prev.length];
          setScore(current => Math.min(100, current + 12));
          return [...prev, nextImprovement];
        }
        // Reset
        setScore(30);
        return [];
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ 
      background: `linear-gradient(to bottom, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 70%, transparent 100%)`,
      borderRadius: 1.5, 
      p: 1.5,
      width: "80%", 
      height: "180px",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Browser tab-like header */}
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        bgcolor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "8px 8px 0 0",
        px: 1,
        py: 0.5,
        mx: -1.5,
        mt: -1.5,
        mb: 1
      }}>
        <AssignmentIcon sx={{ fontSize: 12, color: "info.main", mr: 0.5 }} />
        <Typography sx={{ fontSize: "0.6rem", color: "text.secondary", fontWeight: 600 }}>
          Proposal Analysis
        </Typography>
      </Box>
             
       {/* Score display */}
       <Box sx={{ mb: 1.5 }}>
         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.75 }}>
           <Typography sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
             Completeness Score
           </Typography>
           <motion.div
             key={score}
             initial={{ scale: 1.2 }}
             animate={{ scale: 1 }}
             transition={{ duration: 0.3 }}
           >
             <Typography sx={{ 
               fontSize: "0.65rem", 
               color: score > 80 ? "success.main" : score > 50 ? "warning.main" : "error.main",
               fontWeight: 700
             }}>
               {score}%
             </Typography>
           </motion.div>
         </Box>
         
         {/* Progress bar */}
         <Box sx={{ width: "100%", height: 3, bgcolor: "rgba(255, 255, 255, 0.1)", borderRadius: 1.5, overflow: "hidden" }}>
           <motion.div
             style={{ 
               height: "100%", 
               backgroundColor: score > 80 ? "#10B981" : score > 60 ? "#F59E0B" : "#EF4444",
               borderRadius: 1.5
             }}
             initial={{ width: "45%" }}
             animate={{ width: `${score}%` }}
             transition={{ duration: 0.8, ease: "easeOut" }}
           />
         </Box>
       </Box>

       {/* Improvements list */}
       <Box sx={{ flex: 1, overflow: "hidden" }}>
         <AnimatePresence>
           {improvements.map((improvement, index) => (
             <motion.div
               key={improvement}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
             >
               <Box sx={{ 
                 display: "flex", 
                 alignItems: "center", 
                 mb: 0.4,
                 p: 0.4,
                 borderRadius: 0.4,
                 bgcolor: "rgba(96, 165, 250, 0.1)"
               }}>
                 <CheckCircleIcon sx={{ fontSize: 10, color: "info.main", mr: 0.5 }} />
                 <Typography sx={{ fontSize: "0.5rem", color: "info.main" }}>
                   {improvement}
                 </Typography>
               </Box>
             </motion.div>
           ))}
         </AnimatePresence>
       </Box>
    </Box>
  );
};

export function Highlight() {
  const theme = useTheme();

  return (
    <Box
      id="highlight"
      sx={{
        backgroundColor: "background.paper",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: 5,
        py: { xs: 6, md: 8 },
        mx: { xs: 2, sm: 3, md: 4 },
        my: { xs: 4, md: 6 },
        position: "relative",
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
          opacity: 0.02,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <HighlightBadge>
            <Typography sx={{ color: "text.primary", fontSize: "0.875rem", fontWeight: 600 }}>
              Highlights
            </Typography>
          </HighlightBadge>
        </Box>

        {/* Main headline */}
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2.5rem", md: "2.75rem" },
            fontWeight: 400,
            textAlign: "center",
            mb: 6,
            color: "text.primary",
            letterSpacing: "-0.01em",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          Publish High-Impact Work, Faster.
        </Typography>

        {/* Highlight cards */}
        <Grid container spacing={3}>
          {/* Card 1 - Research Time */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <HighlightCard elevation={0}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                  <CalendarSimulation />
                </Box>
                <Box sx={{ mt: "auto" }}>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      fontSize: { xs: "1rem", md: "1.15rem" },
                      fontWeight: 800,
                      mb: 2,
                      mx: 5,
                      color: "text.primary",
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    Regain Critical Research Time
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      mb: 1,
                      mx: 5,
                      lineHeight: 1.5,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                    }}
                  >
                    Free up your schedule for deep thinking, not tedious manual work.
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                      lineHeight: 1.5,
                      mx: 5,
                      fontSize: "0.8rem",
                    }}
                  >
                    Our agent automates the entire literature discovery and drafting process so you can focus on core ideas.
                  </Typography>
                </Box>
              </Box>
            </HighlightCard>
          </Grid>

          {/* Card 2 - Funding Precision */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <HighlightCard elevation={0}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                  <ProposalSimulation />
                </Box>
                <Box sx={{ mt: "auto" }}>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      fontSize: { xs: "1rem", md: "1.15rem" },
                      fontWeight: 800,
                      mb: 2,
                      mx: 5,
                      color: "text.primary",
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    Secure Funding with Precision
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      mb: 1,
                      mx: 5,
                      lineHeight: 1.5,
                      fontSize: "0.8rem", 
                      fontWeight: 700,
                    }}
                  >
                    Course-correct your proposal in real-time, not after rejection.
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                      lineHeight: 1.5,
                      mx: 5,
                      fontSize: "0.8rem",
                    }}
                  >
                    The agent crafts compelling, data-rich proposals and identifies gaps in your argument before you even submit.
                  </Typography>
                </Box>
              </Box>
            </HighlightCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
