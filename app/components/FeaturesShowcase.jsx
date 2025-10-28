'use client';
import { Box, Container, Typography, Grid, Card, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  Settings,
  Bolt,
  Shield,
  People,
  AutoAwesome,
} from '@mui/icons-material';

export default function FeaturesShowcase() {
  const features = [
    {
      icon: <Search sx={{ fontSize: 48 }} />,
      title: 'Advanced Search',
      description: 'Find exactly what you need with powerful search and filtering capabilities.',
      color: '#00bcd4',
      gradient: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
    },
    {
      icon: <Download sx={{ fontSize: 48 }} />,
      title: 'Easy Downloads',
      description: 'Download mods directly with version and loader selection.',
      color: '#3f51b5',
      gradient: 'linear-gradient(135deg, #3f51b5 0%, #303f9f 100%)',
    },
    {
      icon: <Settings sx={{ fontSize: 48 }} />,
      title: 'Version Control',
      description: 'Choose specific versions and mod loaders for your setup.',
      color: '#f50057',
      gradient: 'linear-gradient(135deg, #f50057 0%, #c51162 100%)',
    },
    {
      icon: <Bolt sx={{ fontSize: 48 }} />,
      title: 'Lightning Fast',
      description: 'Optimized performance for smooth browsing experience.',
      color: '#ffc107',
      gradient: 'linear-gradient(135deg, #ffc107 0%, #ffa000 100%)',
    },
    {
      icon: <Shield sx={{ fontSize: 48 }} />,
      title: 'Safe & Secure',
      description: 'All mods sourced from trusted Modrinth API.',
      color: '#4caf50',
      gradient: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
    },
    {
      icon: <People sx={{ fontSize: 48 }} />,
      title: 'Community Driven',
      description: 'Discover mods loved by the Minecraft community.',
      color: '#ff9800',
      gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <Box
      sx={{
        py: 10,
        borderTop: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,188,212,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(63,81,181,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{ textAlign: 'center', mb: 8 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
              <AutoAwesome sx={{ fontSize: 36, color: '#00bcd4' }} />
              <Typography
                variant="h4"
                component="h2"
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(45deg, #00bcd4, #3f51b5)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Why Choose ModMingle?
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}
            >
              Everything you need for the ultimate mod discovery experience
            </Typography>
            <Chip 
              label="Trusted by thousands" 
              size="small"
              sx={{ 
                bgcolor: 'primary.main', 
                color: '#fff',
                fontWeight: 600,
              }}
            />
          </Box>

          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ width: '100%', display: 'flex' }}
                >
                  <Card
                    sx={{
                      width: '100%',
                      height: '100%',
                      minHeight: '300px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      p: 4,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 3,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s ease',
                      '&:hover': {
                        boxShadow: `0 12px 40px ${feature.color}30`,
                        borderColor: feature.color,
                        '&::before': {
                          transform: 'scale(1.2)',
                          opacity: 0.15,
                        },
                        '& .feature-icon': {
                          transform: 'scale(1.1) rotate(5deg)',
                        },
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: feature.gradient,
                        opacity: 0.05,
                        transform: 'scale(0.8)',
                        transition: 'all 0.6s ease',
                        borderRadius: '50%',
                      },
                    }}
                  >
                    {/* Icon with gradient background */}
                    <Box
                      className="feature-icon"
                      sx={{
                        mb: 2,
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: feature.gradient,
                        boxShadow: `0 8px 24px ${feature.color}40`,
                        color: '#fff',
                        position: 'relative',
                        zIndex: 2,
                        transition: 'transform 0.4s ease',
                      }}
                    >
                      {feature.icon}
                    </Box>

                    <Typography 
                      variant="h6" 
                      fontWeight="bold" 
                      gutterBottom
                      sx={{ 
                        position: 'relative', 
                        zIndex: 2,
                        color: 'text.primary',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        position: 'relative', 
                        zIndex: 2,
                        lineHeight: 1.7,
                      }}
                    >
                      {feature.description}
                    </Typography>

                    {/* Corner accent */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 60,
                        height: 60,
                        background: feature.gradient,
                        opacity: 0.1,
                        clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                      }}
                    />
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Bottom decorative text */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{ textAlign: 'center', mt: 8 }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontStyle: 'italic' }}
            >
              Join thousands of Minecraft players discovering amazing mods every day
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}