"use client";

import { useState, useEffect, ReactElement } from "react";
import Link from "next/link";
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

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "block",
});

const navItems = ["Features", "About", "Contact"];

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
                ChirpZ<Box component="span" sx={{ color: "#60a5fa" }}>.ai</Box>
              </Typography>
            </StyledLink>
          </motion.div>

          <Box sx={{ flexGrow: 1 }} />

          {/* Navigation menu */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {navItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Button
                  component={StyledLink}
                  href={`#${item.toLowerCase()}`}
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
                  {item}
                </Button>
              </motion.div>
            ))}
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
            >
              {navItems.map((item) => (
                <MenuItem key={item} onClick={handleCloseNavMenu}>
                  <StyledLink href={`#${item.toLowerCase()}`}>
                    <Typography textAlign="center">{item}</Typography>
                  </StyledLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
} 