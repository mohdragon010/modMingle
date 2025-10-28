'use client';
import { Box, Skeleton, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

export function ModCardSkeleton() {
  return (
    <Card
      sx={{
        height: '100%',
        minHeight: '420px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, height: '100%', gap: 2 }}>
        {/* Icon skeleton */}
        <Skeleton variant="circular" width={96} height={96} />

        {/* Title skeleton */}
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Skeleton variant="text" height={28} width="90%" sx={{ mx: 'auto', mb: 1 }} />
          <Skeleton variant="text" height={16} width="70%" sx={{ mx: 'auto' }} />
        </Box>

        {/* Downloads skeleton */}
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Skeleton variant="text" width={16} height={16} />
          <Skeleton variant="text" width={80} height={16} />
        </Box>

        {/* Description skeleton - grows to fill space */}
        <Box sx={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: 1, minHeight: 0 }}>
          <Skeleton variant="text" height={16} width="100%" />
          <Skeleton variant="text" height={16} width="95%" />
          <Skeleton variant="text" height={16} width="85%" />
        </Box>
      </Box>
    </Card>
  );
}

export function ModCardGridSkeleton({ count = 9 }) {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <ModCardSkeleton />
        </Grid>
      ))}
    </Grid>
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

