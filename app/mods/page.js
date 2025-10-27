'use client';
import { useState, useEffect } from 'react';
import {
  Container,

  Pagination,
  CircularProgress,
  Alert,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import ModCard from '../components/modCard';

export default function Mods() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const modsPerPage = 27;

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
        setError('Failed to fetch mods. Please try again later.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchMods();
  }, [currentPage, searchQuery]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          Discover Mods
        </Typography>
        <TextField
          label="Search Mods"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: '100%', maxWidth: 500, mx: 'auto' }}
        />
      </Box>
      {loading ? null : <Mypag totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange}/>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 4 }}>
          {error}
        </Alert>
      ) : projects.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ my: 4 }}>
          No mods found. Try adjusting your search query.
        </Typography>
      ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                project.project_type !== "mod" ? null : 
                <ModCard
                  key={project.project_id}
                  title={project.title}
                  description={
                    project.description?.length > 150
                      ? project.description.slice(0, 150) + "..."
                      : project.description || "No description available."
                  }
                  author={project.author}
                  downloads={project.downloads.toLocaleString()}
                  icon={project.icon_url}
                />
              ))}
            </div>
        )}
        {loading ? null : <Mypag totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange}/>}
    </Container>
  );
}
function Mypag({totalPages,currentPage,handlePageChange}){
    return(
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }} className={"mb-2"}>
            <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            />
      </Box>
    )
}