'use client';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowForward, Explore } from '@mui/icons-material';

export default function CallToAction() {
  return (
    <Box
      sx={{
        py: 12,
        background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(63, 81, 181, 0.1))',
        borderTop: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 188, 212, 0.1), transparent)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(63, 81, 181, 0.1), transparent)',
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h2"
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
              Ready to Enhance Your Minecraft?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
            >
              Join thousands of players discovering amazing mods and transforming their Minecraft experience.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: 4 }}
            >
              <Link href="/popular" passHref>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<Explore />}
                    sx={{
                      background: 'linear-gradient(45deg, #00bcd4, #3f51b5)',
                      color: '#fff',
                      borderRadius: '50px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      textTransform: 'none',
                    }}
                  >
                    Explore Popular Mods
                  </Button>
                </motion.div>
              </Link>

              <Link href="/mods" passHref>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      borderRadius: '50px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: '#fff',
                      },
                    }}
                  >
                    Browse All Mods
                  </Button>
                </motion.div>
              </Link>
            </Stack>

            <Typography variant="body2" color="text.secondary">
              No account needed. Start exploring instantly.
            </Typography>
          </Box>
        </motion.div>
      </Container>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
        }
      `}</style>
    </Box>
  );
}

