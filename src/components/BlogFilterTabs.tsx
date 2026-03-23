'use client';

import React, { useState } from 'react';
import { Typography, Card, CardContent, Grid, Box, Button } from '@mui/material';
import Link from 'next/link';

interface Post {
    slug: string;
    collection: string;
    frontmatter: any;
}

const CATEGORIES = ["All", "Android", "Go", "Kotlin", "Machine Learning", "Opinion", "Poetry", "Python"];

export default function BlogFilterTabs({ initialPosts }: { initialPosts: Post[] }) {
    const [selectedTab, setSelectedTab] = useState("All");

    const filteredPosts = initialPosts.filter((post) => {
        if (selectedTab === "All") return true;
        const matchMap: Record<string, string> = {
            "Android": "android",
            "Go": "go",
            "Kotlin": "kotlin",
            "Machine Learning": "ml",
            "Opinion": "opinion",
            "Poetry": "poetry",
            "Python": "python"
        };
        return post.collection === matchMap[selectedTab];
    });

    return (
        <Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 6, justifyContent: 'center' }}>
                {CATEGORIES.map((category) => (
                    <Button 
                        key={category} 
                        variant={selectedTab === category ? "contained" : "outlined"}
                        onClick={() => setSelectedTab(category)}
                        sx={{ 
                            borderRadius: 20, 
                            px: 3, 
                            textTransform: 'none',
                            borderColor: selectedTab === category ? 'primary.main' : 'rgba(255,255,255,0.2)',
                            color: selectedTab === category ? 'white' : 'text.secondary'
                        }}
                    >
                        {category}
                    </Button>
                ))}
            </Box>

            <Grid container spacing={4}>
                {filteredPosts.map((post) => (
                    <Grid size={{ xs: 12, md: 6 }} key={`${post.collection}-${post.slug}`}>
                        <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                            <Card sx={{ 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column',
                                cursor: 'pointer',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    boxShadow: '0 8px 30px rgba(253, 185, 39, 0.15)',
                                    transform: 'translateY(-4px)'
                                }
                            }}>
                                {post.frontmatter.thumbnail && (
                                    <Box 
                                        component="img" 
                                        src={post.frontmatter.thumbnail} 
                                        alt={post.frontmatter.title}
                                        sx={{ 
                                            width: '100%', 
                                            height: 200, 
                                            objectFit: 'contain',
                                            p: 3,
                                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                                            backgroundColor: 'rgba(0,0,0,0.2)'
                                        }} 
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                )}
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
                {filteredPosts.length === 0 && (
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mt: 8 }}>
                            No entries found for this category.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}
