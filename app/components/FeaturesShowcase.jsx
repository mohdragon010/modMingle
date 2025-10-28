'use client';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  Settings,
  Bolt,
  Shield,
  People,
} from '@mui/icons-material';

export default function FeaturesShowcase() {
  const features = [
    {
      icon: <Search sx={{ fontSize: 48, color: '#00bcd4' }} />,
      title: 'Advanced Search',
      description: 'Find exactly what you need with powerful search and filtering capabilities.',
    },
    {
      icon: <Download sx={{ fontSize: 48, color: '#3f51b5' }} />,
      title: 'Easy Downloads',
      description: 'Download mods directly with version and loader selection.',
    },
    {
      icon: <Settings sx={{ fontSize: 48, color: '#f50057' }} />,
      title: 'Version Control',
      description: 'Choose specific versions and mod loaders for your setup.',
    },
    {
      icon: <Bolt sx={{ fontSize: 48, color: '#ffc107' }} />,
      title: 'Lightning Fast',
      description: 'Optimized performance for smooth browsing experience.',
    },
    {
      icon: <Shield sx={{ fontSize: 48, color: '#4caf50' }} />,
      title: 'Safe & Secure',
      description: 'All mods sourced from trusted Modrinth API.',
    },
    {
      icon: <People sx={{ fontSize: 48, color: '#ff9800' }} />,
      title: 'Community Driven',
      description: 'Discover mods loved by the Minecraft community.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Box
      sx={{
        py: 10,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
      
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{ textAlign: 'center', mb: 6 }}
          >
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #00bcd4, #3f51b5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ✨ Why Choose ModMingle?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Everything you need for the ultimate mod discovery experience
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      minHeight: '280px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: 4,
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}

