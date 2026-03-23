'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import Link from 'next/link';

export default function Navbar() {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              fontWeight: 800,
              color: 'text.primary',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Digital Space
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={Link} href="/blog" color="inherit" sx={{ '&:hover': { background: 'rgba(255,255,255,0.05)' } }}>
              Blog
            </Button>
            <Button component={Link} href="/projects" color="inherit" sx={{ '&:hover': { background: 'rgba(255,255,255,0.05)' } }}>
              Projects
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
