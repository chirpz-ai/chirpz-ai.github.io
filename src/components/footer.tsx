"use client";

import Link from "next/link";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Divider,
  Stack,
  useTheme,
  alpha
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import FavoriteIcon from "@mui/icons-material/Favorite";

const FooterLink = styled(Link)(({ theme }) => ({
  color: alpha("#fff", 0.6),
  textDecoration: "none",
  transition: "color 0.2s ease",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha("#fff", 0.05),
  color: alpha("#fff", 0.6),
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  transition: "all 0.2s ease",
}));

export function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0F172A",
        color: "white",
        pt: { xs: 8, md: 10 },
        pb: 4,
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
          opacity: 0.03,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Top section with logo and navigation */}
        <Grid container spacing={4} sx={{ pb: 6 }}>
          <Grid size={{ xs: 12, md: 5, lg: 4 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  display: "inline-block",
                  fontWeight: 700,
                  mb: 3,
                  color: "white",
                  letterSpacing: "-0.025em",
                }}
              >
                Chirpz <Box component="span" sx={{ color: "#60A5FA" }}>AI</Box>
              </Typography>
            </Link>
            <Typography
              variant="body2"
              sx={{
                color: alpha("#fff", 0.6),
                mb: 4,
                maxWidth: "md",
                lineHeight: 1.6,
              }}
            >
              Streamlining AI model governance with AI agents that automate compliance reporting for enterprises across any observability platform.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <Link href="https://github.com/chirpz-ai" target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
                <SocialIconButton aria-label="GitHub">
                  <GitHubIcon fontSize="small" />
                </SocialIconButton>
              </Link>
              <SocialIconButton aria-label="LinkedIn">
                <LinkedInIcon fontSize="small" />
              </SocialIconButton>
              <SocialIconButton aria-label="Twitter">
                <TwitterIcon fontSize="small" />
              </SocialIconButton>
            </Stack>
          </Grid>
          
          <Grid size={{ xs: 12, md: 7, lg: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 2.5,
                  color: "white",
                }}
              >
                Product
              </Typography>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={{ xs: 1.5, sm: 4 }}
                sx={{ flexWrap: 'wrap' }}
              >
                <FooterLink href="#features">Features</FooterLink>
                <FooterLink href="#workflow">How it Works</FooterLink>
                <FooterLink href="#about">About</FooterLink>
                <FooterLink href="#contact">Contact</FooterLink>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ borderColor: alpha("#fff", 0.1) }} />
        
        {/* Bottom section with copyright */}
        <Box
          sx={{
            pt: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: alpha("#fff", 0.4),
            }}
          >
            &copy; {currentYear} Chirpz AI. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 