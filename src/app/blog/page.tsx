import { getAllPosts } from '@/lib/markdown';
import { Typography, Container, Card, CardContent, Grid, Box } from '@mui/material';
import Link from 'next/link';

export default function BlogList() {
  const posts = getAllPosts();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 6, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #F3F4F6, #9CA3AF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Articles & Thoughts
      </Typography>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid size={{ xs: 12, md: 6 }} key={`${post.collection}-${post.slug}`}>
            <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 8px 30px rgba(59, 130, 246, 0.15)',
                  transform: 'translateY(-4px)'
                }
               }}>
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Typography variant="overline" color="secondary.main" sx={{ fontWeight: 700, letterSpacing: 1 }}>
                    {post.collection.toUpperCase()}
                  </Typography>
                  <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 1, fontWeight: 700, color: 'text.primary' }}>
                    {post.frontmatter.title || post.slug}
                  </Typography>
                  {post.frontmatter.date && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                  )}
                  {post.frontmatter.description && (
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2, lineHeight: 1.7 }}>
                      {post.frontmatter.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
