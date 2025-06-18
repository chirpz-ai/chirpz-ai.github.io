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
  useTheme
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import FavoriteIcon from "@mui/icons-material/Favorite";

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "none",
  transition: "color 0.3s ease",
  "&:hover": {
    color: theme.palette.info.main,
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  color: theme.palette.text.secondary,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "&:hover": {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.black,
    borderColor: theme.palette.info.main,
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}));

export function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        pt: { xs: 8, md: 10 },
        pb: 4,
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid",
        borderColor: "divider",
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
                  color: "text.primary",
                  letterSpacing: "-0.025em",
                }}
              >
                Chirpz <Box component="span" sx={{ color: "info.main" }}>AI</Box>
              </Typography>
            </Link>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 4,
                maxWidth: "md",
                lineHeight: 1.6,
              }}
            >
              AI agents that eliminate manual workflow bottlenecks by delivering actionable model intelligence from your development and observability stack.
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
                  color: "text.primary",
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
        
        <Divider sx={{ borderColor: "divider" }} />
        
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
              color: "text.disabled",
            }}
          >
            &copy; {currentYear} Chirpz AI. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 