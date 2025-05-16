"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  useTheme,
  alpha,
  Chip
} from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SchemaOutlinedIcon from "@mui/icons-material/SchemaOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: "100%",
  minHeight: "280px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
  background: `linear-gradient(135deg, ${alpha('#fff', 0.95)} 0%, ${alpha('#f0f9ff', 0.95)} 100%)`,
  backdropFilter: "blur(8px)",
  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "56px",
  height: "56px",
  borderRadius: "12px",
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2.5),
}));

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

const GradientBorder = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "16px",
  padding: "1px",
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.6)} 100%)`,
  "& > div": {
    borderRadius: "15px",
    backgroundColor: "rgba(17, 24, 39, 0.7)",
    position: "relative",
    zIndex: 1,
  }
}));

const features = [
  {
    icon: <SmartToyOutlinedIcon sx={{ fontSize: 32 }} />,
    title: "AI-Powered Agents",
    description: "Intelligent agents that connect to your existing dashboards and databases to gather model metrics autonomously."
  },
  {
    icon: <InsightsOutlinedIcon sx={{ fontSize: 32 }} />,
    title: "Automated Analytics",
    description: "Automatically extract, analyze and interpret model performance metrics from platforms like Arize, Watsonx, and ClearML."
  },
  {
    icon: <DescriptionOutlinedIcon sx={{ fontSize: 32 }} />,
    title: "Custom Reports",
    description: "Generate comprehensive governance reports tracing your model lifecycle from training to deployment, tailored to meet regulatory requirements for any industry."
  },
  {
    icon: <SchemaOutlinedIcon sx={{ fontSize: 32 }} />,
    title: "Streamlined Workflow",
    description: "Reduce manual effort with one-click report generation pending data scientist approval before delivery."
  }
];

export function Features() {
  const theme = useTheme();

  return (
    <Box
      id="features"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
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
          top: "30%",
          left: "-10%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 70%)",
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
              label="Features"
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
              Simplify Model Governance Reporting
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
              Our platform integrates with your existing tools to automate the entire reporting process.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{ height: "100%" }}
              >
                <FeatureCard elevation={0}>
                  <IconWrapper>
                    {feature.icon}
                  </IconWrapper>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                      color: "#1F2937",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#4B5563",
                      lineHeight: 1.6,
                      flexGrow: 1,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginTop: "64px", display: "flex", justifyContent: "center" }}
        >
          <GradientBorder>
            <Box sx={{ py: 3, px: 4, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: "white" }}>
                Ready to streamline your reporting process?
              </Typography>
              <Link href="#contact" style={{ textDecoration: 'none' }}>
                <StyledButton
                  variant="contained"
                  disableElevation
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                    }
                  }}
                >
                  Get Started
                </StyledButton>
              </Link>
            </Box>
          </GradientBorder>
        </motion.div>
      </Container>
    </Box>
  );
} 