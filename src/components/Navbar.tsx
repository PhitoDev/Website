'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import Link from 'next/link';

export default function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Box component="img" src="/brand.svg" alt="Ralph Dugue Logo" sx={{ height: { xs: 40, md: 50 }, width: 'auto', filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' }} />
        </Link>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} href="/blog" color="inherit" sx={{ '&:hover': { background: 'rgba(255,255,255,0.05)' } }}>
            Blog
          </Button>
          <Button component={Link} href="/projects" color="inherit" sx={{ '&:hover': { background: 'rgba(255,255,255,0.05)' } }}>
            Projects
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
