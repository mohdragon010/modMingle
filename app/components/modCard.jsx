'use client';
import { Card, Typography, Box, Chip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Download as DownloadIcon, Person, TrendingUp } from '@mui/icons-material';

export default function ModCard({ title, description, icon, author, downloads, slug }) {
  // Determine if it's a trending mod (high downloads)
  const downloadCount = parseInt(downloads.replace(/,/g, ''));
  const isTrending = downloadCount > 1000000;
  const isPopular = downloadCount > 500000;

  return (
    <Link
      href={`/mod/${slug}`}
      style={{
        textDecoration: 'none',
        width: '100%',
        display: 'block'
      }}
    >
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2.5,
          p: 2.5,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          height: '150px',
          position: 'relative',
          bgcolor: 'background.paper',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #00bcd4, #3f51b5)',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.4s ease',
          },
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: '0 12px 32px rgba(0, 188, 212, 0.25)',
            transform: 'translateX(8px) translateY(-2px)',
            bgcolor: 'action.hover',
            '&::before': {
              transform: 'scaleX(1)',
            },
            '& .mod-icon': {
              transform: 'scale(1.1) rotate(5deg)',
            },
            '& .download-icon': {
              transform: 'scale(1.2)',
              color: '#00bcd4',
            },
          },
        }}
      >
        {/* Trending Badge */}
        {isTrending && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 10,
            }}
          >
            <Chip
              icon={<TrendingUp sx={{ fontSize: 14 }} />}
              label="Trending"
              size="small"
              sx={{
                height: 20,
                fontSize: '0.7rem',
                fontWeight: 'bold',
                bgcolor: 'rgba(255, 87, 34, 0.9)',
                color: '#fff',
                '& .MuiChip-icon': {
                  color: '#fff',
                  fontSize: 14,
                },
              }}
            />
          </Box>
        )}

        {/* Left Section - Icon */}
        <Box
          className="mod-icon"
          sx={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '110px',
            height: '110px',
            borderRadius: 2,
            bgcolor: 'action.hover',
            overflow: 'hidden',
            position: 'relative',
            transition: 'transform 0.4s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            border: '2px solid',
            borderColor: 'divider',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(0,188,212,0.1) 0%, rgba(63,81,181,0.1) 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            },
            '&:hover::after': {
              opacity: 1,
            },
          }}
        >
          {icon ? (
            <Image
              loader={() => icon}
              src={icon}
              alt={`${title} icon`}
              width={110}
              height={110}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Box 
              sx={{ 
                width: '100%', 
                height: '100%', 
                bgcolor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                color: 'text.disabled',
              }}
            >
              📦
            </Box>
          )}
        </Box>

        {/* Middle Section - Title, Author, Description */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            minWidth: 0,
            py: 0.5,
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.1rem',
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'text.primary',
              transition: 'color 0.3s ease',
            }}
          >
            {title}
          </Typography>

          {/* Author */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Person sx={{ fontSize: '1rem', color: 'text.secondary' }} />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontSize: '0.85rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontWeight: 500,
              }}
            >
              {author}
            </Typography>
            {isPopular && !isTrending && (
              <Chip 
                label="Popular" 
                size="small"
                sx={{
                  height: 18,
                  fontSize: '0.65rem',
                  fontWeight: 'bold',
                  bgcolor: 'rgba(63, 81, 181, 0.1)',
                  color: '#3f51b5',
                  ml: 0.5,
                }}
              />
            )}
          </Box>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: '0.9rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.5,
              opacity: 0.8,
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Right Section - Downloads */}
        <Box
          sx={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.8,
            px: 2.5,
            py: 2,
            borderLeft: '2px solid',
            borderColor: 'divider',
            minWidth: '120px',
            textAlign: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: -2,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '2px',
              height: '0%',
              background: 'linear-gradient(180deg, #00bcd4, #3f51b5)',
              transition: 'height 0.4s ease',
            },
            '&:hover::before': {
              height: '80%',
            },
          }}
        >
          <DownloadIcon 
            className="download-icon"
            sx={{ 
              fontSize: '2rem', 
              color: 'primary.main',
              transition: 'all 0.3s ease',
            }} 
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
              color: 'text.primary',
              background: 'linear-gradient(135deg, #00bcd4, #3f51b5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {downloads}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ 
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Downloads
          </Typography>
        </Box>
      </Card>
    </Link>
  );
}