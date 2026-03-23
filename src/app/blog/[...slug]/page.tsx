import { getPostBySlug, getAllPosts } from '@/lib/markdown';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: [post.slug],
  }));
}

import { notFound } from 'next/navigation';
import { Typography, Box, Container } from '@mui/material';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return {};
  return {
    title: `Ralph Dugue | ${post.frontmatter.title}`,
    description: post.frontmatter.description || 'Blog post by Ralph Dugue',
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
        {post.frontmatter.title}
      </Typography>
      {post.frontmatter.date && (
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {new Date(post.frontmatter.date).toLocaleDateString()}
        </Typography>
      )}
      {post.frontmatter.thumbnail && (
        <Box component="img" src={post.frontmatter.thumbnail} alt={post.frontmatter.title} sx={{ width: '100%', borderRadius: 2, mb: 4 }} />
      )}
      <Box sx={{ mt: 6 }}>
        <MarkdownRenderer content={post.content} />
      </Box>
    </Container>
  );
}
