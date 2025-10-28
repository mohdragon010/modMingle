'use client';
import { Box, Container, Typography, Stack, Link as MuiLink, Divider, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { GitHub, WhatsApp, Mail, Favorite } from '@mui/icons-material';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <GitHub />, href: 'https://github.com', label: 'GitHub' },
    { icon: <WhatsApp />, href: 'https://wa.me/1234567890', label: 'WhatsApp' },
    { icon: <Mail />, href: 'mailto:contact@modmingle.com', label: 'Email' },
  ];

  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Mods', href: '/mods' },
    { label: 'Popular', href: '/popular' },
    { label: 'About', href: '/about' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 12,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Stack spacing={4}>
            {/* Main Footer Content */}
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={4}
              justifyContent="space-between"
              alignItems={{ xs: 'center', md: 'flex-start' }}
            >
              {/* Brand Section */}
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    background: 'linear-gradient(45deg, #00bcd4, #3f51b5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                  }}
                >
                  ModMingle
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your ultimate Minecraft mod discovery platform
                </Typography>
              </Box>

              {/* Quick Links */}
              <Stack direction="row" spacing={3}>
                {footerLinks.map((link) => (
                  <MuiLink
                    key={link.label}
                    href={link.href}
                    component={motion.a}
                    whileHover={{ scale: 1.05 }}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Stack>

              {/* Social Links */}
              <Stack direction="row" spacing={1}>
                {socialLinks.map((social) => (
                  <Tooltip key={social.label} title={social.label}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconButton
                        component="a"
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{
                          color: 'text.secondary',
                          '&:hover': {
                            color: 'primary.main',
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

            <Divider />

            {/* Bottom Section */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              sx={{ textAlign: { xs: 'center', sm: 'left' } }}
            >
              <Typography variant="body2" color="text.secondary">
                © {currentYear} ModMingle. Created by{' '}
                <Typography
                  component="span"
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    background: 'linear-gradient(45deg, #00bcd4, #3f51b5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Mohamed Ayman
                </Typography>
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Made with
                </Typography>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Favorite sx={{ fontSize: 18, color: '#f50057' }} />
                </motion.div>
              </Stack>
            </Stack>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}

