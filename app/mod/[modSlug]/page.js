'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Utility function to strip HTML tags and clean text
const stripHtmlTags = (html) => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
};

// Utility function to convert markdown to HTML
const markdownToHtml = (text) => {
  if (!text) return '';

  // First, strip any existing HTML tags from the input
  let html = stripHtmlTags(text);

  // Handle code blocks before other replacements to avoid conflicts
  const codeBlocks = [];
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // Escape HTML special characters
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Headers (must be before other replacements)
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  // Links (must be before bold/italic)
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />');

  // Bold (must be before italic)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Unordered lists
  html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>')
    .replace(/^- (.*?)$/gm, '<li>$1</li>');

  // Ordered lists
  html = html.replace(/^(\d+)\. (.*?)$/gm, '<li>$1. $2</li>');

  // Wrap consecutive list items in ul tags
  html = html.replace(/(<li>.*?<\/li>)/s, (match) => {
    return '<ul>' + match + '</ul>';
  });

  // Clean up multiple ul tags
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />');

  // Blockquotes
  html = html.replace(/^&gt; (.*?)$/gm, '<blockquote style="border-left: 4px solid #ccc; padding-left: 16px; margin: 16px 0; color: #666;">$1</blockquote>');

  // Paragraph wrapping (split by double newlines)
  const paragraphs = html.split(/\n\n+/);
  html = paragraphs.map(para => {
    // Skip if already wrapped in tags
    if (para.match(/^<[a-z]/i)) {
      return para;
    }
    // Skip empty paragraphs
    if (!para.trim()) {
      return '';
    }
    return '<p>' + para.replace(/\n/g, '<br/>') + '</p>';
  }).join('\n');

  // Restore code blocks
  codeBlocks.forEach((block, index) => {
    const codeContent = block
      .replace(/^```[\s\S]*?\n/, '') // Remove opening ```
      .replace(/\n```$/, ''); // Remove closing ```
    html = html.replace(
      `__CODE_BLOCK_${index}__`,
      `<pre><code>${codeContent}</code></pre>`
    );
  });

  return html;
};

// Utility function to extract plain text from markdown (for preview)
// const extractPlainText = (markdown) => {
//   if (!markdown) return '';

//   return markdown
//     // Remove markdown syntax
//     .replace(/[#*_`\[\]()]/g, '')
//     // Remove URLs
//     .replace(/https?:\/\/[^\s]+/g, '')
//     // Remove extra whitespace
//     .replace(/\s+/g, ' ')
//     .trim()
//     .substring(0, 200) + '...';
// };
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
import BugReportIcon from '@mui/icons-material/BugReport';
import LanguageIcon from '@mui/icons-material/Language';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedIcon from '@mui/icons-material/Verified';
import PersonIcon from '@mui/icons-material/Person';

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
  const [versionSort, setVersionSort] = useState('newest');
  const [relatedMods, setRelatedMods] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  useEffect(() => {
    const fetchModDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const projectRes = await fetch(`https://api.modrinth.com/v2/project/${modSlug}`);
        if (!projectRes.ok) throw new Error('Failed to fetch mod details');
        const projectData = await projectRes.json();

        const versionsRes = await fetch(`https://api.modrinth.com/v2/project/${modSlug}/version`);
        if (versionsRes.ok) {
          const versionsData = await versionsRes.json();
          setVersions(versionsData);
          setFilteredVersions(versionsData);

          if (projectData.loaders && projectData.loaders.length > 0) {
            setSelectedLoader(projectData.loaders[0]);
          }

          if (versionsData.length > 0) {
            setSelectedVersion(versionsData[0]);
          }
        }

        setData(projectData);

        if (projectData.categories && projectData.categories.length > 0) {
          try {
            setRelatedLoading(true);
            const relatedRes = await fetch(
              `https://api.modrinth.com/v2/search?query=${projectData.categories[0]}&limit=6&facets=[["project_type:mod"]]`
            );
            if (relatedRes.ok) {
              const relatedData = await relatedRes.json();
              setRelatedMods(relatedData.hits?.filter(m => m.slug !== modSlug && m.project_type === 'mod').slice(0, 6) || []);
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

  useEffect(() => {
    let filtered = versions;

    if (selectedLoader && versions.length > 0) {
      filtered = filtered.filter(version =>
        version.loaders.includes(selectedLoader)
      );
    }

    if (versionSearch.trim()) {
      const searchLower = versionSearch.toLowerCase();
      filtered = filtered.filter(version =>
        version.name.toLowerCase().includes(searchLower) ||
        version.version_number.toLowerCase().includes(searchLower) ||
        version.game_versions?.some(gv => gv.toLowerCase().includes(searchLower))
      );
    }

    const sortVersions = (a, b) => {
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

      if (aIsSnapshot !== bIsSnapshot) {
        return aIsSnapshot ? 1 : -1;
      }

      const dateA = new Date(a.date_published);
      const dateB = new Date(b.date_published);

      return versionSort === 'newest' ? dateB - dateA : dateA - dateB;
    };

    filtered = [...filtered].sort(sortVersions);
    setFilteredVersions(filtered);

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

  const isTrending = data.downloads > 1000000;
  const isPopular = data.downloads > 500000;

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, rgba(0,188,212,0.03) 0%, transparent 50%)',
    }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              mb: 4,
              background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.08) 0%, rgba(63, 81, 181, 0.08) 100%)',
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #00bcd4, #3f51b5, #f50057)',
              },
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md="auto">
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: 140, md: 180 },
                    height: { xs: 140, md: 180 },
                    mx: { xs: 'auto', md: 0 },
                  }}
                >
                  {data.icon_url ? (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                        border: '3px solid',
                        borderColor: 'background.paper',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(135deg, rgba(0,188,212,0.2) 0%, rgba(63,81,181,0.2) 100%)',
                          opacity: 0,
                          transition: 'opacity 0.3s',
                        },
                        '&:hover::after': {
                          opacity: 1,
                        },
                      }}
                    >
                      <Image
                        loader={() => data.icon_url}
                        src={data.icon_url}
                        alt={`${data.title} icon`}
                        width={180}
                        height={180}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 4,
                        bgcolor: 'action.hover',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '4rem',
                      }}
                    >
                      📦
                    </Box>
                  )}
                  {isTrending && (
                    <Chip
                      icon={<TrendingUpIcon />}
                      label="Trending"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        bgcolor: '#ff5722',
                        color: '#fff',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 12px rgba(255,87,34,0.4)',
                      }}
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    fontWeight="900" 
                    sx={{
                      fontSize: { xs: '2rem', md: '3rem' },
                      background: 'linear-gradient(135deg, #00bcd4 0%, #3f51b5 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      flex: 1,
                    }}
                  >
                    {data.title}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  gutterBottom
                  sx={{ 
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    fontWeight: 400,
                    mb: 2,
                  }}
                >
                  {data.description}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2, gap: 1 }}>
                  <Chip
                    icon={<CategoryIcon />}
                    label={data.project_type || 'mod'}
                    sx={{
                      background: 'linear-gradient(135deg, #00bcd4 0%, #3f51b5 100%)',
                      color: '#fff',
                      fontWeight: 600,
                    }}
                  />
                  {isPopular && !isTrending && (
                    <Chip
                      icon={<VerifiedIcon />}
                      label="Popular"
                      sx={{
                        bgcolor: 'rgba(63, 81, 181, 0.15)',
                        color: '#3f51b5',
                        fontWeight: 600,
                        border: '1px solid',
                        borderColor: 'rgba(63, 81, 181, 0.3)',
                      }}
                    />
                  )}
                  {data.client_side && (
                    <Chip 
                      label={`Client: ${data.client_side}`} 
                      size="small"
                      variant="outlined"
                    />
                  )}
                  {data.server_side && (
                    <Chip 
                      label={`Server: ${data.server_side}`} 
                      size="small"
                      variant="outlined"
                    />
                  )}
                  {data.license?.id && (
                    <Chip 
                      label={data.license.id} 
                      size="small" 
                      sx={{
                        bgcolor: 'rgba(245, 0, 87, 0.1)',
                        color: '#f50057',
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Stack>

                {/* Author Info */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                  <PersonIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">
                    Created by <strong>{data.team || 'Unknown'}</strong>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card 
                sx={{ 
                  mb: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  overflow: 'hidden',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    📊 Statistics
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                      <Box 
                        textAlign="center"
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'rgba(0, 188, 212, 0.08)',
                          transition: 'transform 0.3s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                          },
                        }}
                      >
                        <DownloadIcon sx={{ fontSize: 40, color: '#00bcd4', mb: 1 }} />
                        <Typography variant="h5" fontWeight="bold" color="primary">
                          {formatNumber(data.downloads)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          Downloads
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box 
                        textAlign="center"
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'rgba(245, 0, 87, 0.08)',
                          transition: 'transform 0.3s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                          },
                        }}
                      >
                        <FavoriteIcon sx={{ fontSize: 40, color: '#f50057', mb: 1 }} />
                        <Typography variant="h5" fontWeight="bold" sx={{ color: '#f50057' }}>
                          {formatNumber(data.followers)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          Followers
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box 
                        textAlign="center"
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'rgba(76, 175, 80, 0.08)',
                          transition: 'transform 0.3s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                          },
                        }}
                      >
                        <CalendarTodayIcon sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                        <Typography variant="body1" fontWeight="bold" sx={{ color: '#4caf50' }}>
                          {formatDate(data.published).split(',')[0]}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          Published
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box 
                        textAlign="center"
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'rgba(63, 81, 181, 0.08)',
                          transition: 'transform 0.3s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                          },
                        }}
                      >
                        <UpdateIcon sx={{ fontSize: 40, color: '#3f51b5', mb: 1 }} />
                        <Typography variant="body1" fontWeight="bold" sx={{ color: '#3f51b5' }}>
                          {formatDate(data.updated).split(',')[0]}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    📖 About
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
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
                        fontWeight: 500,
                        '&:hover': {
                          color: 'primary.dark',
                          textDecoration: 'underline',
                        },
                      },
                      '& h1': {
                        fontSize: '2em',
                        mt: 3,
                        mb: 2,
                        fontWeight: 'bold',
                        color: 'text.primary',
                      },
                      '& h2': {
                        fontSize: '1.5em',
                        mt: 3,
                        mb: 2,
                        fontWeight: 'bold',
                        color: 'text.primary',
                      },
                      '& h3': {
                        fontSize: '1.25em',
                        mt: 2,
                        mb: 1.5,
                        fontWeight: 'bold',
                        color: 'text.primary',
                      },
                      '& h4, & h5, & h6': {
                        mt: 2,
                        mb: 1,
                        fontWeight: 'bold',
                        color: 'text.primary',
                      },
                      '& ul, & ol': {
                        pl: 3,
                        my: 2,
                        '& li': {
                          mb: 1,
                          lineHeight: 1.8,
                        },
                      },
                      '& p': {
                        mb: 2,
                        lineHeight: 1.8,
                        color: 'text.secondary',
                      },
                      '& code': {
                        backgroundColor: 'action.hover',
                        padding: '2px 8px',
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        fontSize: '0.9em',
                        color: 'error.main',
                      },
                      '& pre': {
                        backgroundColor: 'action.hover',
                        padding: 2,
                        borderRadius: 2,
                        overflow: 'auto',
                        border: '1px solid',
                        borderColor: 'divider',
                        '& code': {
                          backgroundColor: 'transparent',
                          padding: 0,
                          color: 'text.primary',
                        },
                      },
                      '& strong': {
                        fontWeight: 'bold',
                        color: 'text.primary',
                      },
                      '& em': {
                        fontStyle: 'italic',
                      },
                    }}
                    dangerouslySetInnerHTML={{
                      __html: markdownToHtml(data.body || data.description || 'No detailed description available.'),
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Gallery Section */}
            {data.gallery && data.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card sx={{ mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      🖼️ Gallery
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={2}>
                      {data.gallery.map((image, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box
                            sx={{
                              position: 'relative',
                              width: '100%',
                              height: 240,
                              borderRadius: 2,
                              overflow: 'hidden',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                              transition: 'all 0.4s ease',
                              cursor: 'pointer',
                              '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: '0 8px 24px rgba(0,188,212,0.3)',
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
                            <Typography 
                              variant="caption" 
                              color="text.secondary" 
                              sx={{ mt: 1, display: 'block', fontWeight: 500 }}
                            >
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
              <Card 
                sx={{ 
                  mb: 3, 
                  borderRadius: 3,
                  border: '2px solid',
                  borderColor: 'primary.main',
                  boxShadow: '0 8px 24px rgba(0,188,212,0.15)',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DownloadIcon /> Download
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {versions.length > 0 ? (
                    <>
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
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <CodeIcon sx={{ fontSize: 18 }} />
                                  {loader.charAt(0).toUpperCase() + loader.slice(1)}
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}

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
                          Newest
                        </ToggleButton>
                        <ToggleButton value="oldest">
                          <SortIcon sx={{ mr: 0.5, fontSize: 18, transform: 'rotate(180deg)' }} />
                          Oldest
                        </ToggleButton>
                      </ToggleButtonGroup>

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
                                size="large"
                                startIcon={<DownloadIcon />}
                                href={selectedVersion.files?.[0]?.url}
                                target="_blank"
                                disabled={!selectedVersion.files?.[0]?.url}
                                sx={{
                                  background: 'linear-gradient(135deg, #00bcd4 0%, #3f51b5 100%)',
                                  py: 1.5,
                                  fontWeight: 'bold',
                                  fontSize: '1rem',
                                  boxShadow: '0 8px 24px rgba(0,188,212,0.4)',
                                  '&:hover': {
                                    background: 'linear-gradient(135deg, #0097a7 0%, #303f9f 100%)',
                                    boxShadow: '0 12px 32px rgba(0,188,212,0.5)',
                                    transform: 'translateY(-2px)',
                                  },
                                  transition: 'all 0.3s ease',
                                }}
                              >
                                Download {selectedVersion.version_number}
                              </Button>
                              <Box sx={{ mt: 2, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                                <Stack spacing={1}>
                                  <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <CalendarTodayIcon sx={{ fontSize: 14 }} />
                                    Released: {formatDate(selectedVersion.date_published)}
                                  </Typography>
                                  {selectedVersion.downloads !== undefined && (
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                      <DownloadIcon sx={{ fontSize: 14 }} />
                                      Downloads: {formatNumber(selectedVersion.downloads)}
                                    </Typography>
                                  )}
                                  {selectedVersion.files?.[0]?.size && (
                                    <Typography variant="caption" color="text.secondary">
                                      Size: {(selectedVersion.files[0].size / 1024 / 1024).toFixed(2)} MB
                                    </Typography>
                                  )}
                                </Stack>
                              </Box>
                            </>
                          )}
                        </>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                          No versions available for this loader
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                      No versions available
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Links Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    🔗 Links
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Stack spacing={1}>
                    {data.source_url && (
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<CodeIcon />}
                        href={data.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Source Code
                      </Button>
                    )}
                    {data.issues_url && (
                      <Button
                        fullWidth
                        variant="outlined"
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
                        fullWidth
                        variant="outlined"
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
                        fullWidth
                        variant="outlined"
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ mt: 8, pt: 6, borderTop: '2px solid', borderColor: 'divider' }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{
                  background: 'linear-gradient(135deg, #00bcd4 0%, #3f51b5 100%)',
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
              <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                {relatedLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <Box key={i} sx={{ mb: 2, height: '140px', bgcolor: 'action.hover', borderRadius: 2, animation: 'pulse 2s infinite' }} />
                    ))
                  : relatedMods.map((mod) => (
                      <motion.div
                        key={mod.project_id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        style={{ marginBottom: '16px' }}
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
                    ))}
              </Box>
            </Box>
          </motion.div>
        )}
      </Container>
    </Box>
  );
}