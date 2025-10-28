'use client';
import { Container, Typography, Grid, Box, Alert, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ModCard from "../components/modCard";
import { ModCardSkeleton } from "../components/SkeletonLoader";
import { useEffect, useState } from 'react';

export default function Popular() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme(); // For theme-aware background

  useEffect(() => {
    async function fetchPopularMods() {
      try {
        const res = await fetch(
          "https://api.modrinth.com/v2/search?query=&limit=51&index=downloads"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch mods data.");
        }

        const data = await res.json();
        console.log("Fetched projects:", data.hits); // Debug
        setProjects(data.hits || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularMods();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 8, backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        {/* Title Section */}
        <Box
          component={motion.div}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          sx={{ textAlign: 'center', mb: 8 }}
        >
          <Typography
            variant="h3"
            component="h1"
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
            🔥 Most Popular Mods
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Discover the most downloaded and loved mods in the Minecraft community
          </Typography>
        </Box>

        {/* Mods Grid */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {loading
              ? Array.from({ length: 9 }).map((_, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Box sx={{ width: '100%' }}>
                      <ModCardSkeleton />
                    </Box>
                  </Grid>
                ))
              : projects.map((project) => (
                  <Grid item xs={12} sm={6} md={4} key={project.project_id} sx={{ height: '100%' }}>
                    <motion.div
                      variants={itemVariants}
                      style={{ height: '100%', display: 'flex' }}
                    >
                      <ModCard
                        title={project.title}
                        description={
                          project.description?.length > 150
                            ? project.description.slice(0, 150) + "..."
                            : project.description || "No description available."
                        }
                        author={
                          project.authors?.map(a => a.username).join(", ") || "Unknown"
                        }
                        downloads={project.downloads?.toLocaleString() || "0"}
                        icon={project.icon_url || "/default-icon.png"}
                        slug={project.slug}
                      />
                    </motion.div>
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
