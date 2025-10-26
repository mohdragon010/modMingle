'use client';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 3,
      }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src="/404.svg"
          alt="404 Illustration"
          width={280}
          height={280}
          style={{ marginBottom: '1rem' }}
        />
      </motion.div>

      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Oops! Page not found
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>

      <Link href="/" passHref>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Home
        </Button>
      </Link>
    </Box>
  );
}
