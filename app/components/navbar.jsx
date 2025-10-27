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
} from '@mui/material';
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '../ThemeProvider';

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useColorMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navLinks = (
    <>
      <Link href="/" passHref>
        <Button color="inherit">Home</Button>
      </Link>
      <Link href="mods" passHref>
        <Button color="inherit">Mods</Button>
      </Link>
      <Link href="/popular" passHref>
        <Button color="inherit">Popular</Button>
      </Link>
      <Link href="/about" passHref>
        <Button color="inherit">About</Button>
      </Link>
    </>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>ModMingle</span>
          </Link>
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
              <List sx={{ width: 250 }}>
                {navLinks}
                <ListItem>
                  <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <>
            {navLinks}
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
