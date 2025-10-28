'use client';
import { Box, Container, Typography, Stack, Link as MuiLink, Divider, IconButton, Tooltip, Grid, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  GitHub, 
  WhatsApp, 
  Mail, 
  Favorite, 
  Rocket,
  TrendingUp,
  Star,
  AutoAwesome,
  KeyboardArrowUp
} from '@mui/icons-material';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <GitHub />, href: 'https://github.com/mohdragon010', label: 'GitHub', color: '#333' },
    { icon: <WhatsApp />, href: 'https://wa.me/+201027118875', label: 'WhatsApp', color: '#25D366' },
    { icon: <Mail />, href: 'mailto:mohammed.ayman152433@gmail.com', label: 'Email', color: '#EA4335' },
  ];

  const footerSections = [
    {
      title: 'Explore',
      links: [
        { label: 'Home', href: '/' },
        { label: 'All Mods', href: '/mods' },
        { label: 'Popular', href: '/popular' },
        { label: 'About', href: '/about' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'API Docs', href: 'https://docs.modrinth.com' },
        { label: 'Guidelines', href: '/about' },
      ]
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '2px solid',
        borderColor: 'divider',
        mt: 12,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #00bcd4, #3f51b5, #f50057, #ffc107)',
        },
      }}
    >
      {/* Decorative background */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,188,212,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(63,81,181,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ py: 8 }}>
            {/* Top Section */}
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {/* Brand Section */}
              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rocket sx={{ fontSize: 32, color: 'primary.main' }} />
                      <Typography
                        variant="h5"
                        fontWeight="900"
                        sx={{
                          background: 'linear-gradient(135deg, #00bcd4, #3f51b5)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        ModMingle
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280, lineHeight: 1.7 }}>
                      Your ultimate Minecraft mod discovery platform. Find, explore, and download thousands of amazing mods.
                    </Typography>
                    
                    {/* Stats */}
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip 
                        icon={<TrendingUp sx={{ fontSize: 16 }} />}
                        label="50K+ Mods" 
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(0, 188, 212, 0.1)',
                          color: 'primary.main',
                          fontWeight: 600,
                        }}
                      />
                      <Chip 
                        icon={<Star sx={{ fontSize: 16 }} />}
                        label="Trusted" 
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(255, 193, 7, 0.1)',
                          color: '#ffc107',
                          fontWeight: 600,
                        }}
                      />
                    </Stack>

                    {/* Social Links */}
                    <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
                      {socialLinks.map((social) => (
                        <Tooltip key={social.label} title={social.label}>
                          <motion.div
                            whileHover={{ scale: 1.15, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <IconButton
                              component="a"
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="medium"
                              sx={{
                                bgcolor: 'action.hover',
                                color: 'text.secondary',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  bgcolor: social.color,
                                  color: '#fff',
                                  boxShadow: `0 4px 12px ${social.color}40`,
                                },
                              }}
                            >
                              {social.icon}
                            </IconButton>
                          </motion.div>
                        </Tooltip>
                      ))}
                    </Stack>
                  </Stack>
                </motion.div>
              </Grid>

              {/* Links Sections */}
              {footerSections.map((section, index) => (
                <Grid item xs={6} sm={4} md={2.66} key={section.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Typography 
                      variant="subtitle1" 
                      fontWeight="bold" 
                      gutterBottom
                      sx={{ mb: 2, color: 'text.primary' }}
                    >
                      {section.title}
                    </Typography>
                    <Stack spacing={1.5}>
                      {section.links.map((link) => (
                        <MuiLink
                          key={link.label}
                          href={link.href}
                          component={motion.a}
                          whileHover={{ x: 5 }}
                          sx={{
                            color: 'text.secondary',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            transition: 'color 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            '&:hover': {
                              color: 'primary.main',
                            },
                            '&::before': {
                              content: '"→"',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                            },
                            '&:hover::before': {
                              opacity: 1,
                            },
                          }}
                        >
                          {link.label}
                        </MuiLink>
                      ))}
                    </Stack>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Bottom Section */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={{ xs: 1, sm: 3 }}
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  © {currentYear} ModMingle. All rights reserved.
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Created by
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    background: 'linear-gradient(135deg, #00bcd4, #3f51b5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Mohamed Ayman
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  with
                </Typography>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Favorite sx={{ fontSize: 18, color: '#f50057' }} />
                </motion.div>
              </Stack>
            </Stack>

            {/* Powered by */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                <AutoAwesome sx={{ fontSize: 16, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.disabled">
                  Powered by Modrinth API
                </Typography>
              </Stack>
            </Box>
          </Box>
        </motion.div>
      </Container>

      {/* Scroll to Top Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
      >
        <Tooltip title="Back to top">
          <IconButton
            onClick={scrollToTop}
            sx={{
              bgcolor: 'primary.main',
              color: '#fff',
              width: 48,
              height: 48,
              boxShadow: '0 4px 12px rgba(0, 188, 212, 0.4)',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 20px rgba(0, 188, 212, 0.5)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <KeyboardArrowUp />
          </IconButton>
        </Tooltip>
      </motion.div>
    </Box>
  );
}
