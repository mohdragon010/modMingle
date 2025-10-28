'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
  Tooltip,
  Box,
} from '@mui/material';
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '../ThemeProvider';
import { motion } from 'framer-motion';

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useColorMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navLinkStyle = {
    position: 'relative',
    mx: 0.5,
    px: 2,
    py: 1,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: '2px',
      backgroundColor: 'primary.main',
      transition: 'width 0.3s ease',
    },
    '&:hover::after': {
      width: 'calc(100% - 16px)',
    },
  };

  const navLinks = (
    <>
      <Link href="/" passHref>
        <Button
          color="inherit"
          component={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          sx={navLinkStyle}
        >
          Home
        </Button>
      </Link>
      <Link href="/mods" passHref>
        <Button
          color="inherit"
          component={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          sx={navLinkStyle}
        >
          Mods
        </Button>
      </Link>
      <Link href="/popular" passHref>
        <Button
          color="inherit"
          component={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          sx={navLinkStyle}
        >
          Popular
        </Button>
      </Link>
      <Link href="/about" passHref>
        <Button
          color="inherit"
          component={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          sx={navLinkStyle}
        >
          About
        </Button>
      </Link>
    </>
  );

  return (
    <AppBar
      position="sticky"
      component={motion.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" passHref>
          <Typography
            variant="h6"
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #00bcd4, #3f51b5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              minWidth: 'fit-content',
            }}
          >
            ModMingle
          </Typography>
        </Link>

        {isMobile ? (
          <>
            <Tooltip title="Menu">
              <IconButton color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
              <List sx={{ width: 250, pt: 2 }}>
                {navLinks}
                <ListItem sx={{ justifyContent: 'center', mt: 2 }}>
                  <Tooltip title={theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
                    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                      {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                  </Tooltip>
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
              {navLinks}
              <Tooltip title={theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
                <IconButton
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                  component={motion.button}
                  whileHover={{ rotate: 20 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
