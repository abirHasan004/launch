import React from 'react';
import { Box, Container, Typography, Link, IconButton, Grid, Divider, Button } from '@mui/material';
import mainLogo from '../../public/mainlogo-3-2.png';

// Inline SVG Icons
const FaMapMarkerAlt = ({ color = "#ff6b6b", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={color}/>
  </svg>
);

const FaPhoneAlt = ({ color = "#ff6b6b", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill={color}/>
  </svg>
);

const FaEnvelope = ({ color = "#ff6b6b", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill={color}/>
  </svg>
);

const FaFacebookF = ({ color = "#ff6b6b", size = 20 }) => ( // Adjusted size for consistency in IconButton
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.021 21.998V12.623H16.09L16.551 9.17H13.021V7.059C13.021 6.019 13.304 5.301 14.648 5.301L16.699 5.298V2.144C16.367 2.101 15.246 2 13.93 2C11.19 2 9.275 3.685 9.275 6.716V9.17H6.204V12.623H9.275V21.998H13.021Z" fill={color}/>
  </svg>
);

const FaInstagram = ({ color = "#ff6b6b", size = 20 }) => ( // Adjusted size
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.205.054 1.93.24 2.47.454a4.65 4.65 0 011.732 1.017 4.65 4.65 0 011.017 1.732c.213.54.401 1.265.454 2.47.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.205-.24 1.93-.454 2.47a4.65 4.65 0 01-1.017 1.732 4.65 4.65 0 01-1.732 1.017c-.54.213-1.265.401-2.47.454-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.205-.054-1.93-.24-2.47-.454a4.65 4.65 0 01-1.732-1.017A4.65 4.65 0 012.68 19.5c-.213-.54-.401-1.265-.454-2.47-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.205.24-1.93.454-2.47a4.65 4.65 0 011.017-1.732A4.65 4.65 0 014.5 2.68c.54-.213 1.265-.401 2.47-.454C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.143 0-3.5.012-4.722.068-1.15.052-1.764.233-2.128.388a2.845 2.845 0 00-1.046.695 2.845 2.845 0 00-.695 1.046c-.155.364-.336.978-.388 2.128C3.012 8.5 3 8.857 3 12s.012 3.5.068 4.722c.052 1.15.233 1.764.388 2.128a2.845 2.845 0 00.695 1.046 2.845 2.845 0 001.046.695c.364.155.978.336 2.128.388C8.5 20.988 8.857 21 12 21s3.5-.012 4.722-.068c1.15-.052 1.764-.233 2.128-.388a2.845 2.845 0 001.046-.695 2.845 2.845 0 00.695-1.046c.155-.364.336-.978.388-2.128C20.988 15.5 21 15.143 21 12s-.012-3.5-.068-4.722c-.052-1.15-.233-1.764-.388-2.128a2.845 2.845 0 00-.695-1.046 2.845 2.845 0 00-1.046-.695c-.364-.155-.978-.336-2.128-.388C15.5 3.977 15.143 3.965 12 3.965zM12 7.302a4.698 4.698 0 100 9.396 4.698 4.698 0 000-9.396zm0 7.594a2.896 2.896 0 110-5.792 2.896 2.896 0 010 5.792zm5.203-7.935a1.099 1.099 0 100-2.198 1.099 1.099 0 000 2.198z" fill={color}/>
  </svg>
);

const FaStar = ({ color = "#00b67a", size = 18 }) => ( // Default color green for Trustpilot
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" fill={color}/>
  </svg>
);

// Stylized Logo Component
const ALaunchLogo = () => (
  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
    <span style={{ color: '#ff6b6b', fontSize: '1.5em', marginRight: '2px' }}>A</span>
    <span style={{ color: '#ffffff' }}>LAUNCH</span>
  </Typography>
);


const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#121212', // Dark background
        color: '#ffffff',
        py: 6, // Vertical padding
        px: { xs: 2, sm: 3, md: 4 }, // Horizontal padding
        fontFamily: 'Inter, sans-serif',
        minWidth:'100%'
      }}
    >
      <Container maxWidth="xll">
        <Grid container spacing={4} alignItems="flex-center">
          {/* Column 1: Logo and Address */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
            <img onClick={()=>window.location.href='/'} src={mainLogo} alt="Company Logo" />

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <FaMapMarkerAlt /> {/* Using inline SVG */}
              <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                10880 Wilshire Blvd, Suite 101-0048, Los Angeles, CA 90024
              </Typography>
            </Box>
          </Grid>

          {/* Column 2: Contact Info & Social Media */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <FaPhoneAlt /> {/* Using inline SVG */}
              <Link href="tel:+18446380802" color="inherit" underline="hover" sx={{ color: '#e0e0e0' }}>
                +1 (844) 638-0802
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FaEnvelope /> {/* Using inline SVG */}
              <Link href="mailto:customercare@launchmybiz.net" color="inherit" underline="hover" sx={{ color: '#e0e0e0' }}>
                customercare@launchmybiz.net
              </Link>
            </Box>
            <Box>
              <IconButton
                aria-label="Facebook"
                href="https://facebook.com" // Replace with your actual Facebook link
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  // color: '#ff6b6b', // Color is now handled by the SVG component
                  '&:hover': { backgroundColor: 'rgba(255, 107, 107, 0.1)' },
                  mr: 1,
                }}
              >
                <FaFacebookF /> {/* Using inline SVG */}
              </IconButton>
              <IconButton
                aria-label="Instagram"
                href="https://instagram.com" // Replace with your actual Instagram link
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  // color: '#ff6b6b', // Color is now handled by the SVG component
                  '&:hover': { backgroundColor: 'rgba(255, 107, 107, 0.1)' },
                }}
              >
                <FaInstagram /> {/* Using inline SVG */}
              </IconButton>
            </Box>
          </Grid>

          {/* Column 3: Trustpilot */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection:'column', alignItems: {xs: 'center', md: 'flex-end'} }}>
             <Button
              variant="contained"
              href="https://www.trustpilot.com/review/yourcompany.com" // Replace with your Trustpilot link
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<FaStar />} // Using inline SVG, default color is green
              sx={{
                backgroundColor: '#ffffff', // White background
                color: '#00b67a', // Green text
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
                maxWidth: '250px', // Max width for the button
                width: '100%', // Make button take available width up to max-width
                mt: { xs: 2, md: 0 } // Margin top on small screens
              }}
            >
              Review us on Trustpilot
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: '#424242' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Box sx={{ mb: { xs: 2, sm: 0 } }}>
            <Link href="/privacy-policy" color="inherit" underline="hover" sx={{ mr: 2, color: '#bdbdbd', fontSize: '0.875rem' }}>
              PRIVACY POLICY
            </Link>
            <Link href="/disclaimer" color="inherit" underline="hover" sx={{ color: '#bdbdbd', fontSize: '0.875rem' }}>
              DISCLAIMER
            </Link>
          </Box>
          <Typography variant="body2" sx={{ color: '#757575', fontSize: '0.875rem' }}>
            Copyright © 2004-2025 LaunchmyBiz - All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
