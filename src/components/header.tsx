"use client";

import { useState, useEffect, ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  useScrollTrigger,
  Slide,
  IconButton,
  Collapse,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "block",
});

const navItems = [
  { name: "Highlights", link: "highlight" },
  { name: "Features", link: "features" },
  { name: "How it Works", link: "workflow" },
  { name: "Contact", link: "contact" }
];

interface Props {
  window?: () => Window;
  children?: ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children || <div />}
    </Slide>
  );
}

export function Header(props: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate dynamic width based on scroll position
  const getDynamicWidth = () => {
    if (isMobile) {
      return '100%'; // Keep mobile unchanged
    }
    
    // Define the scroll range where the shrinking happens
    const maxScroll = 300; // Pixels to complete the transition
    const minWidth = 700; // Minimum width in pixels
    const maxWidth = 1200; // Maximum width in pixels
    
    // Calculate the progress of shrinking (0 to 1)
    const progress = Math.min(scrollY / maxScroll, 1);
    
    // Apply easing function for smoother transition
    const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
    
    // Calculate the current width
    const currentWidth = maxWidth - (maxWidth - minWidth) * easedProgress;
    
    return `${Math.round(currentWidth)}px`;
  };

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          top: { xs: 0, md: 24 },
          left: { xs: 0, md: '50%' },
          transform: { xs: 'none', md: 'translateX(-50%)' },
          width: { xs: '100%', lg: getDynamicWidth() },
          backgroundColor: "rgba(28, 28, 28, 0.75)",
          backdropFilter: "blur(12px)",
          border: { xs: "none", md: "1px solid rgba(255, 255, 255, 0.1)" },
          borderRadius: { xs: 0, md: 3 },
          boxShadow: { xs: "0 2px 8px rgba(0, 0, 0, 0.3)", md: "0 8px 32px rgba(0, 0, 0, 0.3)" },
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth width transition
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ px: { xs: 2, md: 1 }, py: 0.5 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <StyledLink href="/">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box 
                    sx={{
                      position: 'relative',
                      width: 40, 
                      height: 40, 
                      mr: 1,
                      backgroundColor: 'primary.contrastText',
                      borderRadius: '10px',
                      maskImage: 'url("/assets/logo.svg")',
                      WebkitMaskImage: 'url("/assets/logo.svg")',
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: "-0.025em",
                      mr: 2,
                      fontSize: { xs: "1.5rem", md: "1.5rem" },
                      color: "text.primary",
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: "info.main",
                      }
                    }}
                  >
                    Chirpz <Box component="span" sx={{ color: "info.main" }}>AI</Box>
                  </Typography>
                </Box>
              </StyledLink>
            </motion.div>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: 'center' }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Button
                    component={StyledLink}
                    href={`#${item.link}`}
                    sx={{ 
                      my: 1, 
                      mx: 0.5,
                      color: "text.primary",
                      display: "block",
                      borderRadius: "16px",
                      px: 1.5,
                      py: 0.75,
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      minWidth: "auto",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        backgroundColor: "action.hover",
                        transform: "translateY(-1px)",
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * navItems.length }}
              >
                <IconButton 
                  component="a"
                  href="https://github.com/chirpz-ai"
                  target="_blank"
                  rel="noopener"
                  sx={{ 
                    color: "text.primary",
                    ml: 1,
                    backgroundColor: "transparent",
                    border: "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundColor: "action.hover",
                      transform: "translateY(-1px)",
                    }
                  }}
                >
                  <GitHubIcon />
                </IconButton>
              </motion.div>
            </Box>

            {/* Mobile menu button */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-controls="mobile-menu"
                aria-haspopup="true"
                onClick={handleToggleMobileMenu}
                sx={{
                  color: "text.primary",
                  backgroundColor: "transparent",
                  border: "none",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  }
                }}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile expanded menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <Box
              sx={{
                position: "fixed",
                top: "56px",
                left: 0,
                right: 0,
                backgroundColor: "rgba(28, 28, 28, 0.95)",
                backdropFilter: "blur(12px)",
                borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                zIndex: 1099,
                display: { xs: "block", md: "none" }
              }}
            >
                             <Container maxWidth="lg">
                 <Box sx={{ py: 1, px: 2 }}>
                   {navItems.map((item, index) => (
                     <motion.div
                       key={item.name}
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.3, delay: 0.1 * index }}
                     >
                       <Button
                         component={StyledLink}
                         href={`#${item.link}`}
                         onClick={handleCloseMobileMenu}
                         fullWidth
                         sx={{
                           justifyContent: "flex-start",
                           py: 0.75,
                           px: 2,
                           mb: 0.5,
                           color: "text.primary",
                           fontWeight: 500,
                           fontSize: "0.95rem",
                           borderRadius: "8px",
                           transition: "all 0.2s ease",
                           "&:hover": {
                             backgroundColor: "rgba(255, 255, 255, 0.08)",
                           }
                         }}
                       >
                         {item.name}
                       </Button>
                     </motion.div>
                   ))}
                   <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.3, delay: 0.1 * navItems.length }}
                   >
                     <Button
                       component="a"
                       href="https://github.com/chirpz-ai"
                       target="_blank"
                       rel="noopener"
                       onClick={handleCloseMobileMenu}
                       fullWidth
                       sx={{
                         justifyContent: "flex-start",
                         py: 0.75,
                         px: 2,
                         color: "text.primary",
                         fontWeight: 500,
                         fontSize: "0.95rem",
                         borderRadius: "8px",
                         transition: "all 0.2s ease",
                         "&:hover": {
                           backgroundColor: "rgba(255, 255, 255, 0.08)",
                         }
                       }}
                     >
                       <GitHubIcon fontSize="small" sx={{ mr: 1 }} />
                       GitHub
                     </Button>
                   </motion.div>
                 </Box>
               </Container>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 