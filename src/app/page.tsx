import { Typography, Container, Box, Grid, Card, CardContent, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  const socials = [
    { linkUrl: "https://www.linkedin.com/in/rdugue/", imageUrl: "/img/socials/linkedin.svg", alt: "Visit my LinkedIn" },
    { linkUrl: "https://github.com/rdugue", imageUrl: "/img/socials/github.svg", alt: "Visit my Github" },
    { linkUrl: "https://www.twitch.tv/kingphito", imageUrl: "/img/socials/twitch.svg", alt: "Visit my Twitch channel" },
    { linkUrl: "https://twitter.com/KingPhito", imageUrl: "/img/socials/twitter.svg", alt: "Vist my Twitter account" },
  ];

  return (
    <Box>
      <Box sx={{
        position: 'relative',
        py: { xs: 8, md: 14 },
        px: 2,
        display: 'flex',
        alignItems: 'center',
        background: 'radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)',
        overflow: 'hidden'
      }}>
        <Container maxWidth="md">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }} display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <Box 
                component="img" 
                src="/img/profile.jpg" 
                alt="Ralph Dugue" 
                sx={{ 
                  width: { xs: 200, md: 250 }, 
                  height: { xs: 200, md: 250 }, 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  border: '4px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                }} 
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }} textAlign={{ xs: 'center', md: 'left' }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 900, letterSpacing: '-0.02em', background: 'linear-gradient(45deg, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Ralph Dugue
              </Typography>
              <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
                Software Engineer
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4, lineHeight: 1.8, fontSize: '1.1rem' }}>
                I'm a software engineer, and quadriplegic wheelchair user. I'm passionate about accessibility, and creating software that improves the lives of others. Professionally, I have been a software engineer for over a decade, doing full-stack mobile and web development for small to medium, fast growing businesses. More recently I have been working a lot with machine learning and generative AI. I enjoy working with Kotlin and Python. I also have experience with TypeScript and modern web frameworks like Next.js. In my free time I am a videogame nerd, basketball nerd, and chess nerd.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
                <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" size="large" sx={{ background: 'linear-gradient(45deg, #3B82F6 30%, #8B5CF6 90%)', px: 4 }}>
                    Resume
                  </Button>
                </Link>
                <Link href="/blog" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" size="large" sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', px: 4 }}>
                    Read the Blog
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 8, mb: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom textAlign="center" sx={{ mb: 6, fontWeight: 800 }}>
          Connect With Me
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {socials.map((social) => (
            <Grid size={{ xs: 6, sm: 3 }} key={social.linkUrl} display="flex" justifyContent="center">
              <Link href={social.linkUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Card sx={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  width: 100, height: 100, borderRadius: '50%',
                  '&:hover': { transform: 'translateY(-4px)', borderColor: 'primary.main', boxShadow: '0 8px 30px rgba(59, 130, 246, 0.2)' }
                }}>
                  <Box component="img" src={social.imageUrl} alt={social.alt} sx={{ width: 40, height: 40 }} />
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
