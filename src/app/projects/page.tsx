import { Typography, Container, Box, Grid, Card, CardContent } from '@mui/material';

export default function Projects() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 6, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #F3F4F6, #9CA3AF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Showcase & Projects
      </Typography>
      <Grid container spacing={4}>
        {[1, 2, 3].map((item) => (
          <Grid size={{ xs: 12, md: 4 }} key={item}>
            <Card sx={{ 
                height: '100%',
                '&:hover': {
                  borderColor: 'secondary.main',
                  boxShadow: '0 8px 30px rgba(139, 92, 246, 0.15)',
                  transform: 'translateY(-4px)'
                }
             }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)', mb: 3 }} />
                <Typography variant="h5" gutterBottom color="text.primary" sx={{ fontWeight: 700 }}>
                  Project Alpha {item}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  An innovative solution engineered with emerging technologies. Check back later for real project data injection!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
