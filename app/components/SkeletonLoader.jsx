'use client';
import { Box, Skeleton, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

export function ModCardSkeleton() {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2.5,
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        cursor: 'pointer',
        overflow: 'hidden',
        height: '140px',
        width: '100%',
      }}
    >
      {/* Left - Icon skeleton */}
      <Box sx={{ flexShrink: 0 }}>
        <Skeleton variant="rectangular" width={100} height={100} sx={{ borderRadius: 1.5 }} />
      </Box>

      {/* Middle - Content skeleton */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.8, minWidth: 0 }}>
        {/* Title skeleton */}
        <Skeleton variant="text" height={20} width="70%" />

        {/* Author skeleton */}
        <Skeleton variant="text" height={14} width="40%" />

        {/* Description skeleton */}
        <Skeleton variant="text" height={16} width="100%" />
      </Box>

      {/* Right - Downloads skeleton */}
      <Box sx={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, px: 2, minWidth: '100px' }}>
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton variant="text" height={14} width="80%" />
        <Skeleton variant="text" height={12} width="70%" />
      </Box>
    </Card>
  );
}

export function ModCardGridSkeleton({ count = 9 }) {
  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <ModCardSkeleton />
        </Box>
      ))}
    </Box>
  );
}

export function ModDetailsSkeleton() {
  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Hero Section */}
      <Box sx={{ mb: 4, display: 'flex', gap: 3, alignItems: 'center' }}>
        <Skeleton variant="circular" width={150} height={150} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" height={48} width="60%" />
          <Skeleton variant="text" height={24} width="80%" sx={{ mt: 2 }} />
          <Skeleton variant="text" height={20} width="40%" sx={{ mt: 2 }} />
        </Box>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid item xs={6} sm={3} key={i}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Skeleton variant="text" height={40} width="60%" sx={{ mx: 'auto' }} />
                <Skeleton variant="text" height={20} width="80%" sx={{ mx: 'auto', mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Description */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Skeleton variant="text" height={32} width="30%" sx={{ mb: 2 }} />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="text" height={20} sx={{ mb: 1 }} />
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}

export function SearchLoadingSkeleton() {
  return (
    <Box sx={{ mb: 4 }}>
      <Skeleton variant="text" height={48} width="100%" sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {Array.from({ length: 9 }).map((_, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <ModCardSkeleton />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

