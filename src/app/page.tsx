import { Typography, Container, Box, Grid, Card, CardContent, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box>
      <Box sx={{
        position: 'relative',
        py: { xs: 12, md: 20 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        overflow: 'hidden'
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h1" gutterBottom sx={{ 
            fontWeight: 900, 
            fontSize: { xs: '3rem', md: '5rem' },
            background: 'linear-gradient(to right, #60A5FA, #A78BFA)',
             WebkitBackgroundClip: 'text',
             WebkitTextFillColor: 'transparent',
          }}>
            Welcome to the Future.
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4, maxWidth: '80%', mx: 'auto', fontWeight: 400, lineHeight: 1.6 }}>
            This digital space has been completely reimagined utilizing Next.js App Router, Material UI v6, and modern glassmorphic design principles.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
            <Link href="/blog" style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="large" sx={{ background: 'linear-gradient(45deg, #3B82F6 30%, #8B5CF6 90%)' }}>
                Read the Blog
              </Button>
            </Link>
            <Link href="/projects" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" size="large" sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                View Projects
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h3" component="h2" gutterBottom textAlign="center" sx={{ mb: 6, fontWeight: 800 }}>
          Featured Highlights
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', '&:hover': { borderColor: 'primary.main', transform: 'translateY(-4px)' } }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom color="primary.light" sx={{ fontWeight: 700 }}>Performance</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Lightning fast delivery engineered via Next.js Server Components and advanced Edge caching parameters.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', '&:hover': { borderColor: 'secondary.main', transform: 'translateY(-4px)' } }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom color="secondary.light" sx={{ fontWeight: 700 }}>Aesthetics</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Premium responsive layout adhering to Material 3 specs, infused with sleek dark mode contrast and glassmorphism.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', '&:hover': { borderColor: 'primary.main', transform: 'translateY(-4px)' } }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom color="primary.main" sx={{ fontWeight: 700 }}>Accessibility</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  WCAG compliant contrast ratios and deeply semantic HTML ensuring everyone can participate standardly.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
