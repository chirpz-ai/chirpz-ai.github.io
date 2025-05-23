"use client";

import { useState, useEffect, ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "block",
});

const navItems = [
  { name: "Features", link: "features" },
  { name: "How it Works", link: "workflow" },
  { name: "About", link: "about" },
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
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        bgcolor: "rgba(17, 24, 39, 0.95)",
        backdropFilter: "blur(8px)",
        transition: "all 0.3s"
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1.5 }}>
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
                    width: 50, 
                    height: 50, 
                    mr: 1,
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    maskImage: 'url("/assets/logo.svg")',
                    WebkitMaskImage: 'url("/assets/logo.svg")',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                  }}
                >
                </Box>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    mr: 2,
                    fontSize: { xs: "1.5rem", md: "1.75rem" }
                  }}
                >
                  Chirpz <Box component="span" sx={{ color: "#60a5fa" }}>AI</Box>
                </Typography>
              </Box>
            </StyledLink>
          </motion.div>

          <Box sx={{ flexGrow: 1 }} />

          {/* Navigation menu */}
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
                    my: 2, 
                    mx: 1,
                    color: "white",
                    display: "block",
                    borderRadius: "8px",
                    px: 2,
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
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
                  color: "white",
                  ml: 1,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  }
                }}
              >
                <GitHubIcon />
              </IconButton>
            </motion.div>
          </Box>

          {/* Mobile menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              PaperProps={{
                sx: {
                  bgcolor: "rgba(31, 41, 55, 0.95)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                }
              }}
            >
              {navItems.map((item) => (
                <MenuItem key={item.name} onClick={handleCloseNavMenu} sx={{ py: 1 }}>
                  <StyledLink href={`#${item.link}`}>
                    <Typography textAlign="center" sx={{ color: "white", fontWeight: 500 }}>
                      {item.name}
                    </Typography>
                  </StyledLink>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu} sx={{ py: 1 }}>
                <StyledLink href="https://github.com/chirpz-ai" target="_blank" rel="noopener">
                  <Typography textAlign="center" sx={{ display: 'flex', alignItems: 'center', color: "white", fontWeight: 500 }}>
                    <GitHubIcon fontSize="small" sx={{ mr: 1 }} /> GitHub
                  </Typography>
                </StyledLink>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
} 