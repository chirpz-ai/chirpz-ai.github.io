"use client";

import { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Snackbar,
  useTheme
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import emailjs from '@emailjs/browser';

// Badge component exactly like features component
const ContactBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 16px",
  borderRadius: "24px",
  fontSize: "0.875rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    padding: "1px",
    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%)",
    borderRadius: "inherit",
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "xor",
    WebkitMaskComposite: "xor",
  }
}));

// Contact form container with transparent background
const ContactFormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "transparent",
  padding: "0px",
}));

export function Contact() {
  const theme = useTheme();
  const form = useRef<HTMLFormElement>(null);
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    university: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const result = await emailjs.sendForm(
        'service_32mbd4b',
        'template_9lx6rdi',
        form.current!,
        'OnLmLboXYyT4rGfVW'
      );
      
      console.log('Email sent successfully:', result.text);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", university: "", message: "" });
    } catch (error: any) {
      console.error('Email sending failed:', error);
      setError("Failed to send your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setIsSubmitted(false);
  };

  return (
    <Box
      id="contact"
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        mx: { xs: 2, sm: 3, md: 4 },
        my: { xs: 4, md: 6 },
        borderRadius: 5,
        borderLeft: "1px solid transparent",
        borderRight: "1px solid transparent", 
        borderBottom: "1px solid transparent",
        background: (theme) => 
          `linear-gradient(180deg, transparent 0%, ${theme.palette.mode === 'dark' 
            ? 'rgba(18, 18, 18, 0.3)' 
            : 'rgba(255, 255, 255, 0.3)'} 15%, ${theme.palette.background.paper} 40%)`,
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <ContactBadge>
            <Typography sx={{ color: "text.primary", fontSize: "0.875rem", fontWeight: 600 }}>
              Contact Us
            </Typography>
          </ContactBadge>
        </Box>

        <Grid container spacing={8} alignItems="flex-start">
          {/* Left Side - Contact Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ pr: { md: 4 } }}>
              {/* Headline */}
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  fontWeight: 400,
                  mb: 3,
                  color: "text.primary",
                  letterSpacing: "-0.02em",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                Let's talk.
              </Typography>

              {/* Sub-headline */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  color: "text.secondary",
                  mb: 6,
                  lineHeight: 1.6,
                  maxWidth: "400px",
                }}
              >
                Interested in a demo for your institution or have a question? Reach out.
              </Typography>

              {/* Contact Info */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Email */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <EmailIcon sx={{ fontSize: 20, color: "text.secondary" }} />
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      color: "text.secondary",
                      fontFamily: "monospace",
                    }}
                  >
                    info@chirpz.ai
                  </Typography>
                </Box>

                {/* Location */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <LocationOnIcon sx={{ fontSize: 20, color: "text.secondary" }} />
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      color: "text.secondary",
                    }}
                  >
                    Chicago, IL
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Contact Form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ContactFormContainer>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    color: "error.main"
                  }}
                >
                  {error}
                </Alert>
              )}

              <Box component="form" ref={form} onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {/* Name Field */}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: "text.primary",
                        mb: 0.5,
                        fontWeight: 500,
                      }}
                    >
                      Name
                    </Typography>
                    <TextField
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Jane Smith"
                      required
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.02)",
                          borderRadius: "10px",
                          height: "38px",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.contrastText",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "text.primary",
                          fontSize: "0.9rem",
                          "&::placeholder": {
                            color: "text.disabled",
                            opacity: 0.7,
                            fontSize: "0.9rem",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* University Field */}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: "text.primary",
                        mb: 0.5,
                        fontWeight: 500,
                      }}
                    >
                      University / Institution
                    </Typography>
                    <TextField
                      name="university"
                      value={formState.university}
                      onChange={handleInputChange}
                      placeholder="Stanford University"
                      required
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.02)",
                          borderRadius: "10px",
                          height: "38px",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.contrastText",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "text.primary",
                          fontSize: "0.9rem",
                          "&::placeholder": {
                            color: "text.disabled",
                            opacity: 0.7,
                            fontSize: "0.9rem",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Email Field */}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: "text.primary",
                        mb: 0.5,
                        fontWeight: 500,
                      }}
                    >
                      Email
                    </Typography>
                    <TextField
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="jane@chirpz.ai"
                      required
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.02)",
                          borderRadius: "10px",
                          height: "38px",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.contrastText",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "text.primary",
                          fontSize: "0.9rem",
                          "&::placeholder": {
                            color: "text.disabled",
                            opacity: 0.7,
                            fontSize: "0.9rem",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Message Field */}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: "text.primary",
                        mb: 0.5,
                        fontWeight: 500,
                      }}
                    >
                      Message <span style={{ color: theme.palette.text.disabled }}>(optional)</span>
                    </Typography>
                    <TextField
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Hi, I am reaching out for..."
                      multiline
                      rows={2.5}
                      fullWidth
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.02)",
                          borderRadius: "10px",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.contrastText",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "text.primary",
                          fontSize: "0.9rem",
                          "&::placeholder": {
                            color: "text.disabled",
                            opacity: 0.7,
                            fontSize: "0.9rem",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    fullWidth
                    sx={{
                      mt: 1.5,
                      py: 1,
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "10px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textTransform: "none",
                      height: "38px",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        transform: "translateY(-1px)",
                      },
                      "&:disabled": {
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        color: "rgba(0, 0, 0, 0.5)",
                      },
                    }}
                  >
                    {isSubmitting ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CircularProgress size={16} sx={{ color: "black" }} />
                        <span>Sending...</span>
                      </Box>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Box>
              </Box>
            </ContactFormContainer>
          </Grid>
        </Grid>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={isSubmitted}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 8 }}
      >
        <Alert 
          onClose={handleCloseSnackbar}
          severity="success" 
          sx={{ 
            backgroundColor: "success.main",
            border: "1px solid success.dark",
            color: "white",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            fontWeight: 500,
            "& .MuiAlert-icon": {
              color: "white"
            },
            "& .MuiIconButton-root": {
              color: "white"
            }
          }}
        >
          Thank you! Your message has been sent successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
}