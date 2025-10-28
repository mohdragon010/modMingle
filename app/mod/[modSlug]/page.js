'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Chip,
  Button,
  Card,
  CardContent,
  Divider,
  Alert,
  Stack,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ModDetailsSkeleton } from '../../components/SkeletonLoader';
import ModCard from '../../components/modCard';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UpdateIcon from '@mui/icons-material/Update';
import CategoryIcon from '@mui/icons-material/Category';
import CodeIcon from '@mui/icons-material/Code';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import BugReportIcon from '@mui/icons-material/BugReport';
import LanguageIcon from '@mui/icons-material/Language';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';

export default function ModDetails() {
  const params = useParams();
  const modSlug = params.modSlug;
  const [data, setData] = useState(null);
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedLoader, setSelectedLoader] = useState('');
  const [filteredVersions, setFilteredVersions] = useState([]);
  const [versionSearch, setVersionSearch] = useState('');
  const [versionSort, setVersionSort] = useState('newest'); // 'newest' or 'oldest'
  const [relatedMods, setRelatedMods] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  useEffect(() => {
    const fetchModDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch project details
        const projectRes = await fetch(`https://api.modrinth.com/v2/project/${modSlug}`);
        if (!projectRes.ok) throw new Error('Failed to fetch mod details');
        const projectData = await projectRes.json();

        // Fetch versions
        const versionsRes = await fetch(`https://api.modrinth.com/v2/project/${modSlug}/version`);
        if (versionsRes.ok) {
          const versionsData = await versionsRes.json();
          setVersions(versionsData);
          setFilteredVersions(versionsData);

          // Set default loader to first available
          if (projectData.loaders && projectData.loaders.length > 0) {
            setSelectedLoader(projectData.loaders[0]);
          }

          // Set default version to latest
          if (versionsData.length > 0) {
            setSelectedVersion(versionsData[0]);
          }
        }

        setData(projectData);

        // Fetch related mods based on categories
        if (projectData.categories && projectData.categories.length > 0) {
          try {
            setRelatedLoading(true);
            const relatedRes = await fetch(
              `https://api.modrinth.com/v2/search?query=${projectData.categories[0]}&limit=6`
            );
            if (relatedRes.ok) {
              const relatedData = await relatedRes.json();
              setRelatedMods(relatedData.hits?.filter(m => m.slug !== modSlug).slice(0, 6) || []);
            }
          } catch (e) {
            console.error('Failed to fetch related mods:', e);
          } finally {
            setRelatedLoading(false);
          }
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (modSlug) {
      fetchModDetails();
    }
  }, [modSlug]);

  // Filter and sort versions based on selected loader, search, and sort order
  useEffect(() => {
    let filtered = versions;

    // Filter by loader
    if (selectedLoader && versions.length > 0) {
      filtered = filtered.filter(version =>
        version.loaders.includes(selectedLoader)
      );
    }

    // Filter by search query
    if (versionSearch.trim()) {
      const searchLower = versionSearch.toLowerCase();
      filtered = filtered.filter(version =>
        version.name.toLowerCase().includes(searchLower) ||
        version.version_number.toLowerCase().includes(searchLower) ||
        version.game_versions?.some(gv => gv.toLowerCase().includes(searchLower))
      );
    }

    // Sort versions
    const sortVersions = (a, b) => {
      // Helper to check if version is snapshot/pre-release
      const isSnapshot = (version) => {
        const versionStr = version.version_number.toLowerCase();
        return versionStr.includes('snapshot') ||
               versionStr.includes('pre') ||
               versionStr.includes('rc') ||
               versionStr.includes('alpha') ||
               versionStr.includes('beta');
      };

      const aIsSnapshot = isSnapshot(a);
      const bIsSnapshot = isSnapshot(b);

      // If one is snapshot and other isn't, official comes first
      if (aIsSnapshot !== bIsSnapshot) {
        return aIsSnapshot ? 1 : -1;
      }

      // Otherwise sort by date
      const dateA = new Date(a.date_published);
      const dateB = new Date(b.date_published);

      return versionSort === 'newest' ? dateB - dateA : dateA - dateB;
    };

    filtered = [...filtered].sort(sortVersions);
    setFilteredVersions(filtered);

    // Update selected version if current one doesn't match filters
    if (selectedVersion) {
      const stillValid = filtered.find(v => v.id === selectedVersion.id);
      if (!stillValid) {
        setSelectedVersion(filtered[0] || null);
      }
    } else if (filtered.length > 0) {
      setSelectedVersion(filtered[0]);
    }
  }, [selectedLoader, versions, versionSearch, versionSort, selectedVersion]);

  if (loading) {
    return (
      <Container sx={{ py: 8 }}>
        <ModDetailsSkeleton />
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h6">Failed to load mod details</Typography>
          <Typography>{error || 'Mod not found'}</Typography>
        </Alert>
      </Container>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatNumber = (num) => {
    return num?.toLocaleString() || '0';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(63, 81, 181, 0.1) 100%)',
            borderRadius: 3,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md="auto">
              {data.icon_url && (
                <Box
                  sx={{
                    width: { xs: 120, md: 150 },
                    height: { xs: 120, md: 150 },
                    mx: { xs: 'auto', md: 0 },
                  }}
                >
                  <Image
                    loader={() => data.icon_url}
                    src={data.icon_url}
                    alt={`${data.title} icon`}
                    width={150}
                    height={150}
                    className="rounded-xl shadow-lg"
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md>
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                {data.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {data.description}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 2 }}>
                <Chip
                  icon={<CategoryIcon />}
                  label={data.project_type || 'mod'}
                  color="primary"
                  variant="outlined"
                />
                {data.client_side && (
                  <Chip label={`Client: ${data.client_side}`} size="small" />
                )}
                {data.server_side && (
                  <Chip label={`Server: ${data.server_side}`} size="small" />
                )}
                {data.license?.id && (
                  <Chip label={data.license.id} size="small" color="secondary" />
                )}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Statistics
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <DownloadIcon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h6" fontWeight="bold">
                        {formatNumber(data.downloads)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Downloads
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <FavoriteIcon color="error" sx={{ fontSize: 40 }} />
                      <Typography variant="h6" fontWeight="bold">
                        {formatNumber(data.followers)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Followers
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <CalendarTodayIcon color="success" sx={{ fontSize: 40 }} />
                      <Typography variant="h6" fontWeight="bold">
                        {formatDate(data.published).split(',')[0]}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Published
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <UpdateIcon color="info" sx={{ fontSize: 40 }} />
                      <Typography variant="h6" fontWeight="bold">
                        {formatDate(data.updated).split(',')[0]}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Updated
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>

          {/* Description Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  About
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box
                  sx={{
                    '& img': {
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: 2,
                      my: 2,
                    },
                    '& a': {
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                      mt: 3,
                      mb: 2,
                      fontWeight: 'bold',
                    },
                    '& ul, & ol': {
                      pl: 3,
                      my: 2,
                    },
                    '& li': {
                      mb: 1,
                    },
                    '& p': {
                      mb: 2,
                    },
                    '& code': {
                      backgroundColor: 'action.hover',
                      padding: '2px 6px',
                      borderRadius: 1,
                      fontFamily: 'monospace',
                    },
                  }}
                  dangerouslySetInnerHTML={{
                    __html: data.body || data.description || 'No detailed description available.',
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Gallery Section */}
          {data.gallery && data.gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Gallery
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    {data.gallery.map((image, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box
                          sx={{
                            position: 'relative',
                            width: '100%',
                            height: 200,
                            borderRadius: 2,
                            overflow: 'hidden',
                            '&:hover': {
                              transform: 'scale(1.02)',
                              transition: 'transform 0.3s',
                            },
                          }}
                        >
                          <Image
                            loader={() => image.url}
                            src={image.url}
                            alt={image.title || `Gallery image ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </Box>
                        {image.title && (
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                            {image.title}
                          </Typography>
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Download Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Download
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {versions.length > 0 ? (
                  <>
                    {/* Loader Selection */}
                    {data.loaders && data.loaders.length > 0 && (
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Mod Loader</InputLabel>
                        <Select
                          value={selectedLoader}
                          label="Mod Loader"
                          onChange={(e) => setSelectedLoader(e.target.value)}
                        >
                          {data.loaders.map((loader) => (
                            <MenuItem key={loader} value={loader}>
                              {loader.charAt(0).toUpperCase() + loader.slice(1)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}

                    {/* Version Search */}
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Search versions..."
                      value={versionSearch}
                      onChange={(e) => setVersionSearch(e.target.value)}
                      InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                      sx={{ mb: 2 }}
                    />

                    {/* Sort Toggle */}
                    <ToggleButtonGroup
                      value={versionSort}
                      exclusive
                      onChange={(e, newSort) => {
                        if (newSort !== null) setVersionSort(newSort);
                      }}
                      fullWidth
                      size="small"
                      sx={{ mb: 2 }}
                    >
                      <ToggleButton value="newest">
                        <SortIcon sx={{ mr: 0.5, fontSize: 18 }} />
                        Newest First
                      </ToggleButton>
                      <ToggleButton value="oldest">
                        <SortIcon sx={{ mr: 0.5, fontSize: 18, transform: 'rotate(180deg)' }} />
                        Oldest First
                      </ToggleButton>
                    </ToggleButtonGroup>

                    {/* Version Selection */}
                    {filteredVersions.length > 0 ? (
                      <>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                          <InputLabel>Version</InputLabel>
                          <Select
                            value={selectedVersion?.id || ''}
                            label="Version"
                            onChange={(e) => {
                              const version = filteredVersions.find(v => v.id === e.target.value);
                              setSelectedVersion(version);
                            }}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 400,
                                },
                              },
                            }}
                          >
                            {filteredVersions.map((version) => (
                              <MenuItem key={version.id} value={version.id}>
                                {version.name} ({version.version_number})
                                {version.game_versions && version.game_versions.length > 0 &&
                                  ` - ${version.game_versions[0]}${version.game_versions.length > 1 ? ` - ${version.game_versions[version.game_versions.length - 1]}` : ''}`
                                }
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                          Showing {filteredVersions.length} of {versions.length} versions
                        </Typography>

                        {selectedVersion && (
                          <>
                            <Button
                              variant="contained"
                              fullWidth
                              startIcon={<DownloadIcon />}
                              href={selectedVersion.files?.[0]?.url}
                              target="_blank"
                              disabled={!selectedVersion.files?.[0]?.url}
                              sx={{
                                background: 'linear-gradient(45deg, #00bcd4, #3f51b5)',
                                '&:hover': {
                                  background: 'linear-gradient(45deg, #0097a7, #303f9f)',
                                },
                              }}
                            >
                              Download {selectedVersion.version_number}
                            </Button>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                              Released: {formatDate(selectedVersion.date_published)}
                            </Typography>
                            {selectedVersion.downloads !== undefined && (
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                Downloads: {formatNumber(selectedVersion.downloads)}
                              </Typography>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <Alert severity="info" sx={{ mt: 2 }}>
                        No versions available for {selectedLoader}
                      </Alert>
                    )}
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No versions available
                  </Typography>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Categories
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {data.categories?.map((category) => (
                    <Chip key={category} label={category} size="small" color="primary" />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>

          {/* Loaders */}
          {data.loaders && data.loaders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    <CodeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Mod Loaders
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {data.loaders.map((loader) => (
                      <Chip key={loader} label={loader} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Game Versions */}
          {data.game_versions && data.game_versions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Supported Versions
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {data.game_versions.slice(0, 10).map((version) => (
                      <Chip key={version} label={version} size="small" />
                    ))}
                    {data.game_versions.length > 10 && (
                      <Chip label={`+${data.game_versions.length - 10} more`} size="small" />
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* External Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Links
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1}>
                  {data.source_url && (
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<GitHubIcon />}
                      href={data.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source Code
                    </Button>
                  )}
                  {data.issues_url && (
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<BugReportIcon />}
                      href={data.issues_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Issue Tracker
                    </Button>
                  )}
                  {data.wiki_url && (
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<LanguageIcon />}
                      href={data.wiki_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Wiki
                    </Button>
                  )}
                  {data.discord_url && (
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<OpenInNewIcon />}
                      href={data.discord_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Discord
                    </Button>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Related Mods Section */}
      {relatedMods.length > 0 && (
        <Box sx={{ mt: 12, mb: 8 }}>
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
              mb: 4,
            }}
          >
            🔗 Related Mods
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Explore other mods in the <strong>{data.categories?.[0]}</strong> category
          </Typography>
          <Grid container spacing={3}>
            {relatedLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Box sx={{ minHeight: '420px', bgcolor: 'action.hover', borderRadius: 2, animation: 'pulse 2s infinite' }} />
                  </Grid>
                ))
              : relatedMods.map((mod) => (
                  <Grid item xs={12} sm={6} md={4} key={mod.project_id} sx={{ height: '100%' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      style={{ height: '100%', display: 'flex' }}
                    >
                      <ModCard
                        title={mod.title}
                        description={
                          mod.description?.length > 150
                            ? mod.description.slice(0, 150) + '...'
                            : mod.description || 'No description available.'
                        }
                        author={mod.author}
                        downloads={mod.downloads.toLocaleString()}
                        icon={mod.icon_url}
                        slug={mod.slug}
                      />
                    </motion.div>
                  </Grid>
                ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}