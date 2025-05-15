"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

export function Hero() {
  const theme = useTheme();

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
                      mb: 5,
                      mx: { xs: "auto", lg: 0 },
                    }}
                  >
                    Autonomous AI agents handle your entire model governance pipeline. We connect to your tools, gather metrics, and deliver ready-to-submit reports for your model lifecycle.
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

                  {/* Content lines */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ height: 16, bgcolor: "#374151", borderRadius: 1, mb: 1.5, width: "100%" }} />
                    <Box sx={{ height: 16, bgcolor: "#374151", borderRadius: 1, mb: 1.5, width: "85%" }} />
                    <Box sx={{ height: 16, bgcolor: "#374151", borderRadius: 1, mb: 1.5, width: "70%" }} />
                  </Box>

                  {/* Card element */}
                  <Box sx={{ p: 2, bgcolor: "rgba(55, 65, 81, 0.5)", borderRadius: 1, mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box sx={{ 
                        width: 20, 
                        height: 20, 
                        borderRadius: "50%", 
                        bgcolor: "#3B82F6", 
                        mr: 1.5 
                      }} />
                      <Box sx={{ width: 100, height: 12, bgcolor: "#4B5563", borderRadius: 0.5 }} />
                    </Box>
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ height: 8, bgcolor: "#4B5563", borderRadius: 0.5, mb: 1, width: "100%" }} />
                      <Box sx={{ height: 8, bgcolor: "#4B5563", borderRadius: 0.5, width: "70%" }} />
                    </Box>
                  </Box>

                  {/* Action button */}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Box sx={{ width: 80, height: 32, bgcolor: "#3B82F6", borderRadius: 1 }} />
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