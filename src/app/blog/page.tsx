import { getAllPosts } from '@/lib/markdown';
import { Typography, Container, Card, CardContent, CardActionArea, Grid } from '@mui/material';
import Link from 'next/link';

export default function BlogList() {
  const posts = getAllPosts();

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Blog & Articles
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {posts.map((post) => (
          <Grid size={{ xs: 12, md: 6 }} key={`${post.collection}-${post.slug}`}>
            <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ '&:hover': { boxShadow: 6, cursor: 'pointer' }, height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom color="text.primary">
                    {post.frontmatter.title || post.slug}
                  </Typography>
                  {post.frontmatter.date && (
                    <Typography variant="body2" color="text.secondary">
                      {new Date(post.frontmatter.date).toLocaleDateString()}
                    </Typography>
                  )}
                  {post.frontmatter.description && (
                    <Typography variant="body1" sx={{ mt: 2 }} color="text.primary">
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
