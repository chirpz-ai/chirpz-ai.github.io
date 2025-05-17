"use client";

import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  useTheme,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useRef, useEffect } from "react";

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  background: `linear-gradient(135deg, ${alpha('#fff', 0.95)} 0%, ${alpha('#f0f9ff', 0.95)} 100%)`,
  backdropFilter: "blur(8px)",
  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  padding: theme.spacing(4),
  height: "100%",
  transition: "all 0.3s ease",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  maxWidth: 420,
  width: '100%',
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    maxWidth: 540,
  },
}));

const NumberCircle = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  fontSize: "1.125rem",
  borderRadius: 10,
  backgroundColor: theme.palette.primary.main,
  color: "white",
  marginRight: theme.spacing(2),
}));

const MissionCard = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  padding: theme.spacing(8),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
  "&:before": {
    content: '""',
    position: "absolute",
    top: -24,
    left: -24,
    width: "100%",
    height: "100%",
    background: alpha(theme.palette.primary.main, 0.2),
    borderRadius: 16,
    transform: "rotate(-3deg)",
    zIndex: 0,
  },
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: -24,
    right: -24,
    width: "100%",
    height: "100%",
    background: alpha(theme.palette.primary.main, 0.1),
    borderRadius: 16,
    transform: "rotate(3deg)",
    zIndex: 0,
  },
  maxWidth: 420,
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    maxWidth: 540,
  },
}));

export function About() {
  const theme = useTheme();
  
  const benefits = [
    "Faster reporting cycles",
    "Reduced manual workload",
    "Improved report explainability",
    "Better data visualization",
  ];

  // Auto-scroll logic for mobile chips
  const chipScrollRef = useRef<HTMLDivElement>(null);
  const autoScrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = chipScrollRef.current;
    if (!container) return;
    if (window.innerWidth >= 600) return; // Only run on mobile

    let currentChip = 0;
    const chips = Array.from(container.querySelectorAll('[data-chip]'));
    if (chips.length === 0) return;

    function scrollToChip(idx: number) {
      const chip = chips[idx] as HTMLElement;
      if (chip && container) {
        // Use scrollLeft instead of scrollIntoView to prevent page jumps
        const chipLeft = chip.offsetLeft;
        container.scrollTo({
          left: chipLeft - (container.offsetWidth / 2) + (chip.offsetWidth / 2),
          behavior: 'smooth'
        });
      }
    }

    function startAutoScroll() {
      autoScrollInterval.current = setInterval(() => {
        currentChip = (currentChip + 1) % chips.length;
        scrollToChip(currentChip);
      }, 2000);
    }

    startAutoScroll();

    // Pause auto-scroll on user scroll, resume after 3s
    function handleUserScroll() {
      if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
      if (autoScrollTimeout.current) clearTimeout(autoScrollTimeout.current);
      autoScrollTimeout.current = setTimeout(() => {
        // Find the chip most in view
        if (!container) return;
        const containerRect = container.getBoundingClientRect();
        let bestIdx = 0;
        let bestVisible = 0;
        chips.forEach((chip, idx) => {
          const chipRect = chip.getBoundingClientRect();
          const visibleWidth = Math.max(0, Math.min(chipRect.right, containerRect.right) - Math.max(chipRect.left, containerRect.left));
          if (visibleWidth > bestVisible) {
            bestVisible = visibleWidth;
            bestIdx = idx;
          }
        });
        currentChip = bestIdx;
        startAutoScroll();
      }, 3000);
    }
    container.addEventListener('scroll', handleUserScroll);

    return () => {
      if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
      if (autoScrollTimeout.current) clearTimeout(autoScrollTimeout.current);
      container.removeEventListener('scroll', handleUserScroll);
    };
  }, []);

  return (
    <Box
      id="about"
      component="section"
      sx={{
        py: { xs: 10, md: 12 },
        background: "linear-gradient(135deg, #111827 0%, #1F2937 100%)",
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
          opacity: 0.05,
          zIndex: 0,
        }}
      />

      {/* Gradient blur effect */}
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "-5%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 70%)",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Box 
            sx={{ 
              textAlign: "center", 
              maxWidth: "800px", 
              mx: "auto", 
              mb: { xs: 6, md: 8 } 
            }}
          >
            <Chip
              label="About Us"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: "#60A5FA",
                bgcolor: alpha("#60A5FA", 0.15),
                py: 0.5,
                px: 1,
              }}
            />
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 2,
                color: "white",
              }}
            >
              About Chirpz AI
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.125rem" },
                color: alpha("#fff", 0.8),
                maxWidth: "650px",
                mx: "auto",
              }}
            >
              We're building advanced AI agents that automate model governance reporting
              for enterprises that build and ship AI-powered solutions.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ position: "relative" }}>
                <MissionCard>
                  <StyledPaper elevation={0} sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <RocketLaunchIcon sx={{ color: theme.palette.primary.main, fontSize: 32, mr: 1 }} />
                      <Typography
                        variant="h3"
                        component="h3"
                        sx={{
                          fontWeight: 800,
                          background: "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)",
                          backgroundClip: "text",
                          color: "transparent",
                          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.7rem' },
                        }}
                      >
                        Our Mission
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#4B5563",
                        mb: { xs: 2, sm: 4 },
                        lineHeight: 1.6,
                        fontSize: { xs: '0.98rem', sm: '1.08rem', md: '1.15rem' },
                      }}
                    >
                      Our mission is to eliminate the bottlenecks that slow down AI innovation while ensuring
                      compliance with critical regulations through transparent, consistent reporting.
                    </Typography>
                    {/* Horizontal scrollable chips for mobile, vertical list for desktop */}
                    <Box
                      ref={chipScrollRef}
                      sx={{
                        position: 'relative',
                        display: { xs: 'flex', sm: 'none' },
                        overflowX: 'auto',
                        gap: 2,
                        pb: 1,
                        mt: 1,
                        px: 1,
                        scrollBehavior: 'smooth',
                      }}
                    >
                      {benefits.map((benefit, idx) => (
                        <Box
                          key={idx}
                          data-chip
                          sx={{
                            display: 'inline-flex',
                            flexShrink: 0,
                            // No maxWidth, let chip grow
                          }}
                        >
                          <Chip
                            icon={<CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />}
                            label={benefit}
                            sx={{
                              bgcolor: alpha(theme.palette.primary.main, 0.08),
                              color: "#4B5563",
                              fontWeight: 500,
                              px: 2,
                              fontSize: '0.98rem',
                              whiteSpace: 'nowrap',
                              overflow: 'visible',
                              minWidth: 'unset',
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                    <List disablePadding sx={{ display: { xs: 'none', sm: 'block' } }}>
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.1 * index }}
                        >
                          <ListItem disablePadding sx={{ mb: { xs: 0.5, sm: 1 } }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={benefit} 
                              primaryTypographyProps={{ 
                                color: "#4B5563",
                                fontWeight: 500,
                                fontSize: { xs: '0.98rem', sm: '1.08rem' },
                              }} 
                            />
                          </ListItem>
                        </motion.div>
                      ))}
                    </List>
                  </StyledPaper>
                </MissionCard>
              </Box>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                <StyledPaper elevation={0} sx={{ maxWidth: { xs: 420, md: 540 }, width: '100%', margin: '0 auto' }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                    <NumberCircle>1</NumberCircle>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        color: "#1F2937",
                      }}
                    >
                      The Challenge
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#4B5563",
                      lineHeight: 1.6,
                      pl: 7,
                    }}
                  >
                    Organizations delivering AI solutions struggle with the manual, 
                    time-consuming, and expensive process of creating governance reports. Data scientists spend valuable time 
                    collecting metrics instead of building better models.
                  </Typography>
                </StyledPaper>

                <StyledPaper elevation={0} sx={{ maxWidth: { xs: 420, md: 540 }, width: '100%', margin: '0 auto' }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                    <NumberCircle>2</NumberCircle>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        color: "#1F2937",
                      }}
                    >
                      Our Solution
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#4B5563",
                      lineHeight: 1.6,
                      pl: 7,
                    }}
                  >
                    Chirpz AI's agents integrate with your existing tools, automatically collect and analyze 
                    model metrics and lifecycle data on schedule or per request, and generate comprehensive, regulation-compliant reports ready for 
                    review.
                  </Typography>
                </StyledPaper>

                <StyledPaper elevation={0} sx={{ maxWidth: { xs: 420, md: 540 }, width: '100%', margin: '0 auto' }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                    <NumberCircle>3</NumberCircle>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        color: "#1F2937",
                      }}
                    >
                      The Impact
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#4B5563",
                      lineHeight: 1.6,
                      pl: 7,
                    }}
                  >
                    By automating the reporting process, we help enterprises save time, reduce costs, enhance 
                    compliance, and ultimately deliver a better experience to their customers across any industry.
                  </Typography>
                </StyledPaper>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}