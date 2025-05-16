"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Chip,
  useTheme,
  alpha,
  List,
  ListItem,
  IconButton,
  CircularProgress,
  InputLabel,
  Link
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import emailjs from '@emailjs/browser';

const ContactCard = styled(Paper)(({ theme }) => ({
  borderRadius: "20px",
  background: `linear-gradient(135deg, ${alpha('#60A5FA', 0.15)} 0%, ${alpha('#3B82F6', 0.25)} 100%)`,
  backdropFilter: "blur(8px)",
  padding: theme.spacing(4),
  height: "100%",
  color: "white",
  border: "1px solid rgba(255, 255, 255, 0.1)",
}));

const FormCard = styled(Paper)(({ theme }) => ({
  borderRadius: "20px",
  background: `linear-gradient(135deg, ${alpha('#fff', 0.95)} 0%, ${alpha('#f0f9ff', 0.95)} 100%)`,
  backdropFilter: "blur(8px)",
  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  padding: theme.spacing(4),
  height: "100%",
}));

const IconBox = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  backgroundColor: "white",
  color: theme.palette.primary.main,
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  marginRight: theme.spacing(2),
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "white",
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(1.2),
}));

const SuccessCircle = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.success.main, 0.15),
  color: theme.palette.success.main,
  marginBottom: theme.spacing(3),
}));

export function Contact() {
  const theme = useTheme();
  const form = useRef<HTMLFormElement>(null);
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const result = await emailjs.sendForm(
        'service_qa5wj29',
        'template_9lx6rdi',
        form.current!,
        'OnLmLboXYyT4rGfVW'
      );
      
      console.log('Email sent successfully:', result.text);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", company: "", message: "" });
    } catch (error: any) {
      console.error('Email sending failed:', error);
      setError("Failed to send your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 10, md: 12 },
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
          right: "-10%",
          width: "30vw",
          height: "30vw",
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
              label="Contact Us"
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
              Get in Touch
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
              Interested in automating your model governance reporting? Contact us to learn more about how Chirpz AI can help your business.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5, lg: 4 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ height: "100%" }}
            >
              <ContactCard elevation={0}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 4, 
                    color: "white"
                  }}
                >
                  Contact Information
                </Typography>
                
                <Box sx={{ mb: 4, display: "flex", flexDirection: "column", gap: 3 }}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <IconBox>
                        <EmailOutlinedIcon sx={{ fontSize: 20 }} />
                      </IconBox>
                      <Box>
                        <Typography 
                          variant="subtitle2" 
                          component="h4" 
                          sx={{ fontWeight: 600, color: "white" }}
                        >
                          Email
                        </Typography>
                        <Link 
                          href="mailto:info@chirpz.ai" 
                          sx={{ 
                            color: alpha("#fff", 0.8),
                            textDecoration: "none",
                            "&:hover": {
                              color: theme.palette.primary.main,
                            },
                            transition: "0.2s",
                          }}
                        >
                          info@chirpz.ai
                        </Link>
                      </Box>
                    </Box>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {/* <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <IconBox>
                        <PhoneOutlinedIcon sx={{ fontSize: 20 }} />
                      </IconBox>
                      <Box>
                        <Typography 
                          variant="subtitle2" 
                          component="h4" 
                          sx={{ fontWeight: 600, color: "white" }}
                        >
                          Phone
                        </Typography>
                        <Link 
                          href="tel:+15551234567" 
                          sx={{ 
                            color: alpha("#fff", 0.8),
                            textDecoration: "none",
                            "&:hover": {
                              color: theme.palette.primary.main,
                            },
                            transition: "0.2s",
                          }}
                        >
                          +1 (555) 123-4567
                        </Link>
                      </Box>
                    </Box> */}
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <IconBox>
                        <LocationOnOutlinedIcon sx={{ fontSize: 20 }} />
                      </IconBox>
                      <Box>
                        <Typography 
                          variant="subtitle2" 
                          component="h4" 
                          sx={{ fontWeight: 600, color: "white" }}
                        >
                          Location
                        </Typography>
                        <Typography sx={{ color: alpha("#fff", 0.8) }}>
                          San Francisco, CA · Chicago, IL
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Box>
                
                <Box>
                  <Typography 
                    variant="subtitle2" 
                    component="h4" 
                    sx={{ fontWeight: 600, color: "white", mb: 2 }}
                  >
                    Connect with Us
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <SocialIconButton aria-label="LinkedIn">
                      <LinkedInIcon />
                    </SocialIconButton>
                    <SocialIconButton aria-label="Twitter">
                      <TwitterIcon />
                    </SocialIconButton>
                  </Box>
                </Box>
              </ContactCard>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 7, lg: 8 }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FormCard elevation={0}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 4, 
                    color: "#1F2937"
                  }}
                >
                  Send us a Message
                </Typography>
                
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "3rem 1rem",
                      textAlign: "center"
                    }}
                  >
                    <SuccessCircle>
                      <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />
                    </SuccessCircle>
                    <Typography
                      variant="h5"
                      component="h4"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: "#1F2937",
                      }}
                    >
                      Thank You!
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#4B5563",
                        maxWidth: "500px",
                        mb: 4,
                      }}
                    >
                      Your message has been sent successfully. We'll get back to you shortly.
                    </Typography>
                    <Button 
                      variant="contained"
                      disableElevation
                      onClick={() => setIsSubmitted(false)}
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        py: 1.5,
                        px: 3,
                        fontWeight: 600,
                        boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
                        "&:hover": {
                          bgcolor: theme.palette.primary.dark,
                          boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                        }
                      }}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <Box component="form" ref={form} onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box>
                          <InputLabel 
                            htmlFor="name"
                            sx={{ 
                              fontSize: "0.875rem", 
                              fontWeight: 500, 
                              color: "#4B5563", 
                              mb: 0.5
                            }}
                          >
                            Full Name <Box component="span" sx={{ color: "error.main" }}>*</Box>
                          </InputLabel>
                          <TextField
                            id="name"
                            name="name"
                            fullWidth
                            value={formState.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            variant="outlined"
                            size="small"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "white",
                                borderRadius: 2,
                                "& fieldset": {
                                  borderColor: "rgba(209, 213, 219, 0.8)",
                                },
                                "&:hover fieldset": {
                                  borderColor: "rgba(59, 130, 246, 0.5)",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "rgba(59, 130, 246, 0.8)",
                                }
                              },
                              "& .MuiOutlinedInput-input": {
                                padding: "14px 16px",
                              }
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box>
                          <InputLabel 
                            htmlFor="email"
                            sx={{ 
                              fontSize: "0.875rem", 
                              fontWeight: 500, 
                              color: "#4B5563", 
                              mb: 0.5
                            }}
                          >
                            Email Address <Box component="span" sx={{ color: "error.main" }}>*</Box>
                          </InputLabel>
                          <TextField
                            id="email"
                            name="email"
                            type="email"
                            fullWidth
                            value={formState.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            variant="outlined"
                            size="small"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "white",
                                borderRadius: 2,
                                "& fieldset": {
                                  borderColor: "rgba(209, 213, 219, 0.8)",
                                },
                                "&:hover fieldset": {
                                  borderColor: "rgba(59, 130, 246, 0.5)",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "rgba(59, 130, 246, 0.8)",
                                }
                              },
                              "& .MuiOutlinedInput-input": {
                                padding: "14px 16px",
                              }
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Box>
                      <InputLabel 
                        htmlFor="company"
                        sx={{ 
                          fontSize: "0.875rem", 
                          fontWeight: 500, 
                          color: "#4B5563", 
                          mb: 0.5
                        }}
                      >
                        Company
                      </InputLabel>
                      <TextField
                        id="company"
                        name="company"
                        fullWidth
                        value={formState.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        variant="outlined"
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                            borderRadius: 2,
                            "& fieldset": {
                              borderColor: "rgba(209, 213, 219, 0.8)",
                            },
                            "&:hover fieldset": {
                              borderColor: "rgba(59, 130, 246, 0.5)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "rgba(59, 130, 246, 0.8)",
                            }
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "14px 16px",
                          }
                        }}
                      />
                    </Box>
                    
                    <Box>
                      <InputLabel 
                        htmlFor="message"
                        sx={{ 
                          fontSize: "0.875rem", 
                          fontWeight: 500, 
                          color: "#4B5563", 
                          mb: 0.5
                        }}
                      >
                        Message <Box component="span" sx={{ color: "error.main" }}>*</Box>
                      </InputLabel>
                      <TextField
                        id="message"
                        name="message"
                        fullWidth
                        multiline
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        required
                        placeholder="How can we help you?"
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                            borderRadius: 2,
                            "& fieldset": {
                              borderColor: "rgba(209, 213, 219, 0.8)",
                            },
                            "&:hover fieldset": {
                              borderColor: "rgba(59, 130, 246, 0.5)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "rgba(59, 130, 246, 0.8)",
                            }
                          }
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ mt: 1 }}>
                      {error && (
                        <Typography color="error" sx={{ mb: 2 }}>
                          {error}
                        </Typography>
                      )}
                      <Button
                        type="submit"
                        variant="contained"
                        disableElevation
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                        sx={{
                          py: 1.5,
                          px: 3,
                          borderRadius: 2,
                          fontWeight: 600,
                          bgcolor: theme.palette.primary.main,
                          transition: "all 0.3s ease",
                          boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
                          "&:hover": {
                            bgcolor: theme.palette.primary.dark,
                            boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                          },
                          width: { xs: "100%", sm: "auto" }
                        }}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </Box>
                  </Box>
                )}
              </FormCard>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 