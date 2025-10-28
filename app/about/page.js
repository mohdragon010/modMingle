'use client';
import { Box, Container, Typography, Grid, Card, CardContent, Stack, Button, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { GitHub, WhatsApp, Mail, Code, Bolt, People } from '@mui/icons-material';
import Link from 'next/link';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const features = [
    {
      icon: <Code sx={{ fontSize: 40, color: '#00bcd4' }} />,
      title: 'Clean Code',
      description: 'Built with modern technologies and best practices for maintainability and performance.',
    },
    {
      icon: <Bolt sx={{ fontSize: 40, color: '#3f51b5' }} />,
      title: 'Fast & Responsive',
      description: 'Optimized for speed with smooth animations and responsive design across all devices.',
    },
    {
      icon: <People sx={{ fontSize: 40, color: '#f50057' }} />,
      title: 'User-Focused',
      description: 'Designed with user experience in mind, making mod discovery intuitive and enjoyable.',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              textAlign: 'center',
              mb: 8,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #00bcd4, #3f51b5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              About ModMingle
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Discover the story behind your ultimate Minecraft mod discovery platform
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Author Section */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              mb: 8,
              p: 4,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              👋 Meet the Creator
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Mohamed Ayman</strong> is a passionate developer dedicated to creating intuitive and powerful web applications. With a focus on user experience and clean code, Mohamed built ModMingle to revolutionize how Minecraft enthusiasts discover and manage their favorite mods.
            </Typography>
            <Typography variant="body1" paragraph>
              ModMingle combines modern web technologies with a deep understanding of the gaming community's needs, resulting in a platform that's both powerful and easy to use.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                startIcon={<GitHub />}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Button>
              <Button
                variant="outlined"
                startIcon={<WhatsApp />}
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </Button>
              <Button
                variant="outlined"
                startIcon={<Mail />}
                href="mailto:contact@modmingle.com"
              >
                Contact
              </Button>
            </Stack>
          </Box>

          {/* Mission Section */}
          <Box component={motion.div} variants={itemVariants} sx={{ mb: 8 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              🎯 Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              ModMingle exists to simplify the mod discovery experience. We believe that finding the perfect mods shouldn't be complicated. Our platform provides a seamless, intuitive interface to explore thousands of mods, compare versions, and enhance your Minecraft gameplay.
            </Typography>
          </Box>

          {/* Features Grid */}
          <Box component={motion.div} variants={itemVariants} sx={{ mb: 8 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
              ✨ What Makes Us Special
            </Typography>
            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
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
                          boxShadow: 3,
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
          </Box>

          {/* Technology Stack */}
          <Box component={motion.div} variants={itemVariants} sx={{ mb: 8 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
              🛠️ Built With
            </Typography>
            <Grid container spacing={2}>
              {['Next.js 16', 'React 19', 'Material-UI', 'Tailwind CSS', 'Framer Motion', 'Modrinth API'].map((tech, index) => (
                <Grid item xs={6} sm={4} md={2} key={index}>
                  <Card
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {tech}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* CTA Section */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              textAlign: 'center',
              p: 4,
              borderRadius: 2,
              background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(63, 81, 181, 0.1))',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Ready to Explore?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Start discovering amazing mods and elevate your Minecraft experience today.
            </Typography>
            <Link href="/popular" passHref>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, #00bcd4, #3f51b5)',
                  color: '#fff',
                  borderRadius: '50px',
                  px: 4,
                }}
              >
                Explore Mods
              </Button>
            </Link>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

