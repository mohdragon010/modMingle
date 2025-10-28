'use client';
import { useState, useEffect } from 'react';
import { Fab, Tooltip } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (typeof window !== 'undefined') {
      setIsVisible(window.scrollY > 300);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 1000,
          }}
        >
          <Tooltip title="Back to top">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Fab
                onClick={scrollToTop}
                color="primary"
                aria-label="back to top"
                sx={{
                  background: 'linear-gradient(45deg, #00bcd4, #3f51b5)',
                  boxShadow: '0 8px 24px rgba(0, 188, 212, 0.3)',
                  '&:hover': {
                    boxShadow: '0 12px 32px rgba(0, 188, 212, 0.4)',
                  },
                }}
              >
                <KeyboardArrowUp />
              </Fab>
            </motion.div>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

