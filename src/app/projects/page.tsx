import { Typography, Container } from '@mui/material';

export default function Projects() {
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Projects
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the projects portfolio section. New interactive content will be populated here soon.
      </Typography>
    </Container>
  );
}
