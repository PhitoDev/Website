import { Typography, Container, Box, Grid, Card, CardContent } from '@mui/material';
import { fetchProjects, getThumbnail } from '@/lib/github';
import Link from 'next/link';

export default async function Projects() {
  const projects = await fetchProjects();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 6, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #F3F4F6, #9CA3AF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Showcase & Projects
      </Typography>
      <Grid container spacing={4}>
        {projects.length > 0 ? projects.map((project) => (
          <Grid size={{ xs: 12, md: 4 }} key={project.name}>
            <Link href={project.html_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    boxShadow: '0 8px 30px rgba(139, 92, 246, 0.15)',
                    transform: 'translateY(-4px)'
                  }
               }}>
                <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box 
                    component="img" 
                    src={getThumbnail(project.topics || [])} 
                    alt={project.name}
                    loading="lazy"
                    sx={{ width: 48, height: 48, objectFit: 'contain', mb: 3 }} 
                  />
                  <Typography variant="h5" gutterBottom color="text.primary" sx={{ fontWeight: 700 }}>
                    {project.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2, flexGrow: 1 }}>
                    {project.description || 'No description provided for this repository.'}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    Created: {new Date(project.created_at).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        )) : (
          <Grid size={{ xs: 12 }}>
            <Typography variant="body1" color="text.secondary">Loading or no projects found from GitHub org.</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
