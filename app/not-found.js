'use client';
import { Box, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 3,
      }}
    >
      <Paper
        component={motion.div}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        elevation={6}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: 500,
        }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Image
            src="/404.svg"
            alt="404 Illustration"
            width={250}
            height={250}
            style={{ marginBottom: '1.5rem' }}
          />
        </motion.div>

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Lost in the Void
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          It seems you've stumbled upon a page that doesn't exist. Let's get you back on track.
        </Typography>

        <Link href="/" passHref>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={motion.button}
            whileHover={{ scale: 1.05, boxShadow: '0px 4px 20px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.95 }}
            sx={{ borderRadius: '50px', px: 4 }}
          >
            Return to Base
          </Button>
        </Link>
      </Paper>
    </Box>
  );
}
