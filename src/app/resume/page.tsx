import { getResumeContent } from "@/lib/markdown";
import { notFound } from "next/navigation";
import { Typography, Box, Container } from "@mui/material";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ralph Dugue | Resume",
  description: "Professional resume of Ralph Dugue, Machine Learning Engineer.",
};

export default async function ResumePage() {
  const resume = getResumeContent();

  if (!resume) {
    notFound();
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 800, letterSpacing: "-0.02em", mb: 4 }}
      >
        Resume
      </Typography>
      <Box sx={{ mt: 2 }}>
        <MarkdownRenderer content={resume.content} />
      </Box>
    </Container>
  );
}
