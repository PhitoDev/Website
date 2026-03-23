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
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
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
      <Box sx={{ mt: 4 }}>
        <Markdown
          options={{
            overrides: {
              h1: { component: Typography, props: { variant: 'h4', gutterBottom: true } },
              h2: { component: Typography, props: { variant: 'h5', gutterBottom: true, mt: 4 } },
              h3: { component: Typography, props: { variant: 'h6', gutterBottom: true, mt: 3 } },
              p: { component: Typography, props: { variant: 'body1', paragraph: true } },
            },
          }}
        >
          {post.content}
        </Markdown>
      </Box>
    </Container>
  );
}
