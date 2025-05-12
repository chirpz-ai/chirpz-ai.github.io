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
  List,
  ListItem,
  useTheme,
  alpha,
  Stack
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
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
                ChirpZ<Box component="span" sx={{ color: "#60A5FA" }}>.ai</Box>
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
              Automating model governance reporting for insurance SaaS companies with AI agents that turn complex metrics into ready-to-ship reports.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <SocialIconButton aria-label="LinkedIn">
                <LinkedInIcon fontSize="small" />
              </SocialIconButton>
              <SocialIconButton aria-label="Twitter">
                <TwitterIcon fontSize="small" />
              </SocialIconButton>
            </Stack>
          </Grid>
          
          <Grid size={{ xs: 12, md: 7, lg: 8 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 4 }}>
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
                <List dense disablePadding>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <FooterLink href="#features">Features</FooterLink>
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <FooterLink href="#about">About</FooterLink>
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <FooterLink href="#contact">Contact</FooterLink>
                  </ListItem>
                </List>
              </Grid>
              
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 2.5,
                    color: "white",
                  }}
                >
                  Legal
                </Typography>
                <List dense disablePadding>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <FooterLink href="#">Privacy Policy</FooterLink>
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <FooterLink href="#">Terms of Service</FooterLink>
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <FooterLink href="#">Cookie Policy</FooterLink>
                  </ListItem>
                </List>
              </Grid>
              
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 2.5,
                    color: "white",
                  }}
                >
                  Company
                </Typography>
                <List dense disablePadding>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <FooterLink href="#">Blog</FooterLink>
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <FooterLink href="#">Careers</FooterLink>
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <FooterLink href="#">Partners</FooterLink>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
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
              mb: { xs: 2, md: 0 },
            }}
          >
            &copy; {currentYear} ChirpZ.ai. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="caption"
              sx={{
                color: alpha("#fff", 0.4),
                mr: 0.5,
              }}
            >
              Made with
            </Typography>
            <FavoriteIcon sx={{ fontSize: 14, color: "#F87171", mx: 0.5 }} />
            <Typography
              variant="caption"
              sx={{
                color: alpha("#fff", 0.4),
                ml: 0.5,
              }}
            >
              in San Francisco
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 