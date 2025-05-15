"use client";

import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  alpha,
  Chip
} from "@mui/material";
import Image from "next/image";

export function Workflow() {
  const theme = useTheme();

  return (
    <Box
      id="workflow"
      component="section"
      sx={{
        py: { xs: 10, md: 12 },
        background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
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
          top: "40%",
          right: "10%",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)",
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
              label="How it Works"
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
              Our Agentic Workflow
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
              Intelligent agents that seamlessly connect to your enterprise tools, extract key metrics, and transform them into comprehensive governance reports.
            </Typography>
          </Box>
        </motion.div>

        <Grid container justifyContent="center">
          <Grid size={12}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: "300px", sm: "400px", md: "500px" },
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  border: "1px solid rgba(75, 85, 99, 0.3)",
                }}
              >
                <Image
                  src="/assets/agent.svg"
                  alt="ChirpZ.ai Agentic Workflow"
                  fill
                  style={{
                    objectFit: "contain",
                    padding: "20px",
                  }}
                  priority
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 