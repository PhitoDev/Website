import { getPostBySlug } from '@/lib/markdown';
import Markdown from 'markdown-to-jsx';
import { notFound } from 'next/navigation';
import { Typography, Box, Container } from '@mui/material';

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
        <Markdown
          options={{
            overrides: {
              h1: { component: Typography, props: { variant: 'h3', gutterBottom: true, sx: { fontWeight: 800, mt: 4 } } },
              h2: { component: Typography, props: { variant: 'h4', gutterBottom: true, sx: { fontWeight: 700, mt: 4 } } },
              h3: { component: Typography, props: { variant: 'h5', gutterBottom: true, sx: { fontWeight: 600, mt: 3 } } },
              p: { component: Typography, props: { variant: 'body1', paragraph: true, sx: { lineHeight: 1.8, color: 'text.secondary', fontSize: '1.1rem' } } },
              li: { component: Typography, props: { component: 'li', sx: { lineHeight: 1.8, color: 'text.secondary', fontSize: '1.1rem' } } },
            },
          }}
        >
          {post.content}
        </Markdown>
      </Box>
    </Container>
  );
}
