'use client';
import {
  Box,
  Container,
  Typography,
  Card,
  Button,
  Skeleton,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ModCard from './modCard';
import Link from 'next/link';
import { ArrowForward, TrendingUp } from '@mui/icons-material';

export default function FeaturedSection() {
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedMods() {
      try {
        const res = await fetch(
          'https://api.modrinth.com/v2/search?limit=6&index=downloads&facets=[["project_type:mod"]]'
        );
        const data = await res.json();
        const modProjects = data.hits.filter(p => p.project_type === 'mod');
        setMods(modProjects || []);
      } catch (error) {
        console.error('Failed to fetch featured mods:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedMods();
  }, []);

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
          {/* Header */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{ textAlign: 'center', mb: 6 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
              <TrendingUp sx={{ fontSize: 36, color: '#00bcd4' }} />
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
                Featured Mods
              </Typography>
            </Box>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}
            >
              Explore the most popular and highly-rated mods from the community
            </Typography>
            <Chip 
              label="Trending Now" 
              color="primary" 
              size="small"
              icon={<TrendingUp />}
            />
          </Box>

          {/* Mods List */}
          <Box sx={{ mb: 4, maxWidth: 1200, mx: 'auto' }}>
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Box key={i} sx={{ mb: 2 }}>
                    <Card sx={{ display: 'flex', gap: 2, p: 2, height: '140px' }}>
                      <Skeleton variant="rectangular" width={100} height={100} sx={{ borderRadius: 1.5 }} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" height={24} width="60%" />
                        <Skeleton variant="text" height={16} width="40%" sx={{ mt: 1 }} />
                        <Skeleton variant="text" height={16} width="80%" sx={{ mt: 1 }} />
                      </Box>
                      <Box sx={{ minWidth: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton variant="text" height={16} width="80%" sx={{ mt: 1 }} />
                      </Box>
                    </Card>
                  </Box>
                ))
              : mods
                  .slice(0, 3)
                  .map((project, index) => (
                    <motion.div
                      key={project.project_id}
                      variants={itemVariants}
                      style={{ marginBottom: '16px' }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        {/* Trending Badge */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            zIndex: 10,
                            bgcolor: 'primary.main',
                            color: '#fff',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 8px rgba(0,188,212,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          <TrendingUp sx={{ fontSize: 14 }} />
                          #{index + 1}
                        </Box>
                        
                        <ModCard
                          title={project.title}
                          description={
                            project.description?.length > 150
                              ? project.description.slice(0, 150) + '...'
                              : project.description ||
                                'No description available.'
                          }
                          author={project.author}
                          downloads={project.downloads.toLocaleString()}
                          icon={project.icon_url}
                          slug={project.slug}
                        />
                      </Box>
                    </motion.div>
                  ))}
          </Box>

          {/* Footer Button */}
          <Box 
            component={motion.div}
            variants={itemVariants}
            sx={{ textAlign: 'center' }}
          >
            <Link href="/popular" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                size="large"
                sx={{
                  bgcolor: 'primary.main',
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 14px rgba(0,188,212,0.4)',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    boxShadow: '0 6px 20px rgba(0,188,212,0.5)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                View All Popular Mods
              </Button>
            </Link>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}