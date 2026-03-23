import { Typography, Container, Box } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to the New Website
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        This site has been completely rewritten using Next.js App Router and Material UI configuration.
      </Typography>
    </Container>
  );
}
