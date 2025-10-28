'use client';
import { Container, Typography, Box, Alert, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Whatshot as FireIcon } from '@mui/icons-material';
import ModCard from "../components/modCard";
import { ModCardSkeleton } from "../components/SkeletonLoader";
import { useEffect, useState } from 'react';

export default function Popular() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ totalDownloads: 0, modCount: 0 });

  useEffect(() => {
    async function fetchPopularMods() {
      try {
        const res = await fetch(
          'https://api.modrinth.com/v2/search?query=&limit=51&index=downloads&facets=[["project_type:mod"]]'
        );

        if (!res.ok) {
          throw new Error("Failed to fetch mods data.");
        }

        const data = await res.json();
        const modProjects = data.hits.filter(p => p.project_type === 'mod');
        
        // Calculate stats
        const totalDownloads = modProjects.reduce((sum, mod) => sum + mod.downloads, 0);
        
        setProjects(modProjects);
        setStats({
          totalDownloads,
          modCount: modProjects.length
        });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularMods();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (error) {
    return (
      <Box sx={{ py: 8 }}>
        <Container>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Title Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: 6 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <FireIcon sx={{ fontSize: 40, color: '#ff6b35' }} />
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Most Popular Mods
            </Typography>
          </Box>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}
          >
            Discover the most downloaded and loved mods in the Minecraft community
          </Typography>

          {/* Stats Chips */}
          {!loading && (
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Chip
                label={`${stats.modCount} Top Mods`}
                color="primary"
                sx={{ fontWeight: 'bold' }}
              />
              <Chip
                label={`${stats.totalDownloads.toLocaleString()} Total Downloads`}
                variant="outlined"
                color="primary"
                sx={{ fontWeight: 'bold' }}
              />
            </Box>
          )}
        </Box>

        {/* Mods List */}
        {loading ? (
          <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <ModCardSkeleton />
              </Box>
            ))}
          </Box>
        ) : projects.length === 0 ? (
          <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto' }}>
            No mods found at this time.
          </Alert>
        ) : (
          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.project_id}
                variants={itemVariants}
                style={{ marginBottom: '16px' }}
              >
                <Box sx={{ position: 'relative' }}>
                  {/* Top 3 Badge */}
                  {index < 3 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -8,
                        left: -8,
                        zIndex: 10,
                        bgcolor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32',
                        color: '#000',
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      }}
                    >
                      #{index + 1}
                    </Box>
                  )}
                  
                  <ModCard
                    title={project.title}
                    description={
                      project.description?.length > 150
                        ? project.description.slice(0, 150) + '...'
                        : project.description || 'No description available.'
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
        )}
      </Container>
    </Box>
  );
}