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

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  background: `linear-gradient(135deg, ${alpha('#fff', 0.95)} 0%, ${alpha('#f0f9ff', 0.95)} 100%)`,
  backdropFilter: "blur(8px)",
  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  padding: theme.spacing(4),
  height: "100%",
  transition: "all 0.3s ease",
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
}));

export function About() {
  const theme = useTheme();
  
  const benefits = [
    "Faster reporting cycles",
    "Enhanced regulatory compliance",
    "Reduced manual workload",
    "Better data visualization"
  ];

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
              About ChirpZ.AI
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
              for SaaS companies providing AI solutions to the insurance industry.
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
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: "#1F2937",
                      }}
                    >
                      Our Mission
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#4B5563",
                        mb: 4,
                        lineHeight: 1.6,
                      }}
                    >
                      Our mission is to eliminate the bottlenecks that slow down AI innovation while ensuring
                      compliance with critical regulations through transparent, consistent reporting.
                    </Typography>
                    
                    <List disablePadding>
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.1 * index }}
                        >
                          <ListItem disablePadding sx={{ mb: 1 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={benefit} 
                              primaryTypographyProps={{ 
                                color: "#4B5563",
                                fontWeight: 500
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
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <StyledPaper elevation={0}>
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
                    SaaS companies providing AI solutions to insurance carriers struggle with the manual, 
                    time-consuming process of creating governance reports. Data scientists spend valuable time 
                    collecting metrics instead of building better models.
                  </Typography>
                </StyledPaper>

                <StyledPaper elevation={0}>
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
                    ChirpZ.AI's agents integrate with your existing tools, automatically collect and analyze 
                    model performance data, and generate comprehensive, regulation-compliant reports ready for 
                    review.
                  </Typography>
                </StyledPaper>

                <StyledPaper elevation={0}>
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
                    By automating the reporting process, we help SaaS companies save time, reduce costs, enhance 
                    compliance, and ultimately deliver a better experience to their insurance industry customers.
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