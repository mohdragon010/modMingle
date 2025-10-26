'use client';
import { Box, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      sx={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        px: 3,
        py: { xs: 8, md: 12 },
      }}
    >
      <Typography
        component={motion.h1}
        variant="h2"
        fontWeight="bold"
        mb={2}
        sx={{
          fontSize: { xs: '2rem', md: '3.5rem' },
          background: 'linear-gradient(90deg, #00bcd4, #3f51b5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Discover and Share Minecraft Mods
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        mb={4}
        sx={{ maxWidth: 600 }}
      >
        Explore a world of creativity — browse, search, and favorite the best Minecraft mods from the community.
      </Typography>

      <Stack direction="row" spacing={2}>
        <Link href="/popular" passHref>
          <Button
            variant="contained"
            size="large"
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Mods
          </Button>
        </Link>

        <Link href="/about" passHref>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
