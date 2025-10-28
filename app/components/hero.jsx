'use client';
import { Box, Typography, Button, Stack, Container, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Explore, Info, TrendingUp } from '@mui/icons-material';

export default function Hero() {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#0a0a0a',
        color: '#fff',
        // Animated gradient background
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, #00bcd4, #3f51b5, #f50057, #ffc107)',
          backgroundSize: '400% 400%',
          animation: 'gradientAnimation 15s ease infinite',
          opacity: 0.3,
          filter: 'blur(60px)',
          zIndex: 1,
        },
        // Floating particles effect
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(2px 2px at 20% 30%, rgba(0, 188, 212, 0.4), transparent),
                            radial-gradient(2px 2px at 60% 70%, rgba(63, 81, 181, 0.4), transparent),
                            radial-gradient(2px 2px at 50% 50%, rgba(245, 0, 87, 0.4), transparent),
                            radial-gradient(2px 2px at 80% 10%, rgba(255, 193, 7, 0.4), transparent),
                            radial-gradient(2px 2px at 90% 60%, rgba(0, 188, 212, 0.4), transparent),
                            radial-gradient(2px 2px at 33% 80%, rgba(63, 81, 181, 0.4), transparent),
                            radial-gradient(2px 2px at 15% 90%, rgba(245, 0, 87, 0.4), transparent)`,
          backgroundSize: '200% 200%',
          animation: 'floatParticles 20s ease-in-out infinite',
          zIndex: 1,
        },
        '@keyframes gradientAnimation': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        '@keyframes floatParticles': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(30px, -30px)' },
          '66%': { transform: 'translate(-20px, 20px)' },
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          component={motion.div}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: '24px',
            bgcolor: 'rgba(15, 15, 15, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #00bcd4, #3f51b5, transparent)',
              animation: 'shimmer 3s ease-in-out infinite',
            },
            '@keyframes shimmer': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(100%)' },
            },
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Chip
              icon={<TrendingUp />}
              label="🔥 Trending Now"
              sx={{
                mb: 3,
                bgcolor: 'rgba(0, 188, 212, 0.15)',
                color: '#00bcd4',
                border: '1px solid rgba(0, 188, 212, 0.3)',
                fontWeight: 600,
                fontSize: '0.9rem',
                py: 2.5,
                '& .MuiChip-icon': {
                  color: '#00bcd4',
                },
              }}
            />
          </motion.div>

          {/* Main Title */}
          <Typography
            component={motion.h1}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            variant="h1"
            fontWeight="900"
            mb={2}
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
              letterSpacing: '-2px',
              lineHeight: 1.1,
              background: 'linear-gradient(135deg, #00bcd4 0%, #3f51b5 50%, #f50057 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px rgba(0, 188, 212, 0.3)',
            }}
          >
            Your Ultimate
            <br />
            <Box component="span" sx={{ 
              background: 'linear-gradient(135deg, #f50057 0%, #ffc107 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Modding Hub
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography
            component={motion.p}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            variant="h6"
            mb={2}
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: { xs: '1rem', md: '1.3rem' },
              lineHeight: 1.6,
            }}
          >
            Dive into a universe of mods. Discover, share, and elevate your Minecraft experience with the largest mod library.
          </Typography>

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Stack 
              direction="row" 
              spacing={3} 
              justifyContent="center" 
              mb={4}
              flexWrap="wrap"
              sx={{ gap: 2 }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="#00bcd4">
                  50K+
                </Typography>
                <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
                  Mods Available
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="#3f51b5">
                  2M+
                </Typography>
                <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
                  Downloads
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="#f50057">
                  100%
                </Typography>
                <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
                  Free & Safe
                </Typography>
              </Box>
            </Stack>
          </motion.div>

          {/* CTA Buttons */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            component={motion.div}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link href="/popular" passHref style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Explore />}
                  sx={{
                    background: 'linear-gradient(135deg, #00bcd4 0%, #3f51b5 100%)',
                    color: '#fff',
                    borderRadius: '50px',
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: '0 10px 40px rgba(0, 188, 212, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '0',
                      height: '0',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translate(-50%, -50%)',
                      transition: 'width 0.6s, height 0.6s',
                    },
                    '&:hover::before': {
                      width: '300px',
                      height: '300px',
                    },
                    '&:hover': {
                      boxShadow: '0 15px 50px rgba(0, 188, 212, 0.6)',
                    },
                  }}
                >
                  Explore Mods
                </Button>
              </motion.div>
            </Link>

            <Link href="/about" passHref style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Info />}
                  sx={{
                    borderRadius: '50px',
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderColor: 'rgba(0, 188, 212, 0.5)',
                    borderWidth: '2px',
                    color: '#00bcd4',
                    backdropFilter: 'blur(10px)',
                    bgcolor: 'rgba(0, 188, 212, 0.05)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 188, 212, 0.15)',
                      borderColor: '#00bcd4',
                      borderWidth: '2px',
                      boxShadow: '0 10px 40px rgba(0, 188, 212, 0.3)',
                    },
                  }}
                >
                  Learn More
                </Button>
              </motion.div>
            </Link>
          </Stack>

          {/* Bottom hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                mt: 4, 
                display: 'block',
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '0.85rem',
              }}
            >
              ✨ Powered by Modrinth API • Trusted by the community
            </Typography>
          </motion.div>
        </Box>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.5, 
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.5,
          }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Box
            sx={{
              width: '30px',
              height: '50px',
              border: '2px solid rgba(0, 188, 212, 0.5)',
              borderRadius: '25px',
              display: 'flex',
              justifyContent: 'center',
              pt: 1,
            }}
          >
            <Box
              sx={{
                width: '4px',
                height: '8px',
                bgcolor: '#00bcd4',
                borderRadius: '2px',
                animation: 'scrollDown 1.5s ease-in-out infinite',
                '@keyframes scrollDown': {
                  '0%': { transform: 'translateY(0)', opacity: 1 },
                  '100%': { transform: 'translateY(20px)', opacity: 0 },
                },
              }}
            />
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}