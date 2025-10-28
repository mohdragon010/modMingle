'use client';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Skeleton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ModCard from './modCard';
import Link from 'next/link';
import { ArrowForward } from '@mui/icons-material';

export default function FeaturedSection() {
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedMods() {
      try {
        const res = await fetch(
          'https://api.modrinth.com/v2/search?limit=6&sort=downloads'
        );
        const data = await res.json();
        setMods(data.hits || []);
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
        bgcolor: 'background.default',
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
              🌟 Featured Mods
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Explore the most popular and highly-rated mods from the community
            </Typography>
          </Box>

          {/* Mods Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Skeleton
                          variant="circular"
                          width={96}
                          height={96}
                          sx={{ mx: 'auto', mb: 2 }}
                        />
                        <Skeleton variant="text" height={32} />
                        <Skeleton variant="text" height={20} sx={{ mt: 1 }} />
                        <Skeleton
                          variant="text"
                          height={20}
                          width="80%"
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : mods.map((project) =>
                  project.project_type !== 'mod' ? null : (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={project.project_id}
                      sx={{ display: 'flex' }}
                    >
                      <motion.div
                        variants={itemVariants}
                        style={{ flexGrow: 1, width: '100%' }}
                      >
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
                      </motion.div>
                    </Grid>
                  )
                )}
          </Grid>

          {/* Footer Button */}
          <Box sx={{ textAlign: 'center' }}>
            <Link href="/popular" passHref>
              <Button
                variant="outlined"
                endIcon={<ArrowForward />}
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: '#fff',
                  },
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
