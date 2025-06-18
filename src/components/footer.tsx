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

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.disabled,
  textDecoration: "none",
  transition: "color 0.3s ease",
  "&:hover": {
    color: theme.palette.text.secondary,
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
        pt: { xs: 4, md: 6 },
        pb: 3,
        position: "relative",
        overflow: "hidden",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Top section with logo and navigation */}
        <Grid container spacing={4} sx={{ pb: 4 }}>
          <Grid size={{ xs: 12, md: 7, lg: 8 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  display: "inline-block",
                  fontWeight: 700,
                  mb: 2,
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
                mb: 0,
                maxWidth: "100%",
                lineHeight: 1.6,
                pr: { xs: 0, md: 4 },
              }}
            >
              The AI research scientist for busy researchers.
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, md: 5, lg: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              justifyContent: { xs: 'flex-start', md: 'flex-start' },
              height: '100%',
              mt: { xs: 2, md: 0 }
            }}>
              <Stack 
                direction="row"
                spacing={2}
                sx={{ 
                  flexWrap: 'wrap',
                  mt: { xs: 0, md: 0 }
                }}
              >
                <FooterLink href="#highlight">Highlights</FooterLink>
                <FooterLink href="#features">Features</FooterLink>
                <FooterLink href="#workflow">How it Works</FooterLink>
                <FooterLink href="#contact">Contact</FooterLink>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ borderColor: "divider" }} />
        
        {/* Bottom section with copyright */}
        <Box
          sx={{
            pt: 3,
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