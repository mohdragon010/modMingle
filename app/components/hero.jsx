'use client';
import { Box, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
        bgcolor: '#111',
        color: '#fff',
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
          filter: 'blur(20px)',
          zIndex: 1,
        },
        '@keyframes gradientAnimation': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          p: 4,
          borderRadius: '12px',
          bgcolor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography
          component={motion.h1}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          variant="h2"
          fontWeight="bold"
          mb={2}
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            letterSpacing: '1px',
          }}
        >
          Your Ultimate Modding Hub
        </Typography>

        <Typography
          component={motion.p}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          variant="h6"
          color="text.secondary"
          mb={4}
          sx={{ maxWidth: 650, color: '#ccc' }}
        >
          Dive into a universe of mods. Discover, share, and elevate your Minecraft experience with the largest mod library.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Link href="/popular" passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, #00bcd4, #3f51b5)',
                  color: '#fff',
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  animation: 'pulse 2s infinite',
                  boxShadow: '0 8px 24px rgba(0, 188, 212, 0.3)',
                }}
              >
                Explore Mods
              </Button>
            </motion.div>
          </Link>

          <Link href="/about" passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderColor: '#00bcd4',
                  color: '#00bcd4',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 188, 212, 0.1)',
                    borderColor: '#00bcd4',
                  },
                }}
              >
                About Us
              </Button>
            </motion.div>
          </Link>
        </Stack>
      </Box>

      <style jsx global>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 188, 212, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(0, 188, 212, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 188, 212, 0);
          }
        }
      `}</style>
    </Box>
  );
}
