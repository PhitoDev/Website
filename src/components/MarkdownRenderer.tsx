'use client';

import React from 'react';
import Markdown from 'markdown-to-jsx';
import { Typography } from '@mui/material';

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
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
      {content}
    </Markdown>
  );
}
