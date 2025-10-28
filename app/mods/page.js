'use client';
import { useState, useEffect } from 'react';
import {
  Container,
  Pagination,
  Alert,
  TextField,
  Box,
  Typography,
  InputAdornment,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from '@mui/icons-material';
import ModCard from '../components/modCard';
import { ModCardGridSkeleton } from '../components/SkeletonLoader';

export default function Mods() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const modsPerPage = 27;

  // Fetch mods from Modrinth API
  useEffect(() => {
    async function fetchMods() {
      setLoading(true);
      setError(null);
      try {
        const offset = (currentPage - 1) * modsPerPage;
        const res = await fetch(
          `https://api.modrinth.com/v2/search?query=${searchQuery}&limit=${modsPerPage}&offset=${offset}`
        );
        const data = await res.json();
        setProjects(data.hits || []);
        setTotalPages(Math.ceil(data.total_hits / modsPerPage));
      } catch (e) {
        console.error(e);
        setError('Failed to fetch mods. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchMods();
  }, [currentPage, searchQuery]);

  const handlePageChange = (event, value) => setCurrentPage(value);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

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

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Header and search bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 6, textAlign: 'center' }}>
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
              🔍 Discover Mods
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Search through thousands of mods and find exactly what you need
            </Typography>

            <TextField
              label="Search Mods"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3 },
              }}
            />
          </Box>
        </motion.div>

        {/* Main content */}
        {loading ? (
          <ModCardGridSkeleton count={27} />
        ) : error ? (
          <Alert severity="error" sx={{ my: 4 }}>
            {error}
          </Alert>
        ) : projects.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ my: 4 }}>
            No mods found. Try adjusting your search query.
          </Typography>
        ) : (
          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}
          >
            {projects.map((project) =>
              project.project_type !== 'mod' ? null : (
                <motion.div
                  key={project.project_id}
                  variants={itemVariants}
                  style={{ marginBottom: '16px' }}
                >
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
                </motion.div>
              )
            )}
          </Box>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
