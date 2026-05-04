import { getAllPosts } from '@/lib/markdown';
import { Typography, Container } from '@mui/material';
import BlogFilterTabs from '@/components/BlogFilterTabs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phito | Blog',
  description: 'Writings by Ralph Dugue',
};

export default function BlogList() {
  const posts = getAllPosts();

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 6, textAlign: 'center', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #F3F4F6, #9CA3AF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Articles & Thoughts
      </Typography>
      <BlogFilterTabs initialPosts={posts} />
    </Container>
  );
}
