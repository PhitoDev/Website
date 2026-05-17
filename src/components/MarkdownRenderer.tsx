"use client";

import React from "react";
import Markdown from "markdown-to-jsx";
import { Box, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
    className?: string;
    children?: React.ReactNode;
};

function CodeBlock({ className, children }: CodeBlockProps) {
    const languageMatch = /lang(?:uage)?-([\w-]+)/.exec(className ?? "");
    const language = languageMatch?.[1] ?? "text";
    const code = React.Children.toArray(children).join("").replace(/\n$/, "");

    return (
        <Box
            sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                p: 2,
                my: 2,
                overflow: "auto",
                backgroundColor: "#282c34",
            }}
        >
            <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{
                    margin: 0,
                    padding: 0,
                    background: "transparent",
                    fontSize: "0.95rem",
                }}
                PreTag="div"
            >
                {code}
            </SyntaxHighlighter>
        </Box>
    );
}

type PreProps = {
    children?: React.ReactNode;
};

function Pre({ children }: PreProps) {
    // markdown-to-jsx renders fenced code as <pre><code class="lang-xxx">...</code></pre>.
    // After our `code` override runs, the child element's `type` is our custom
    // function rather than the string "code", so we can't rely on type checks.
    // Instead, unwrap whatever element is inside <pre> and forward its props.
    if (React.isValidElement<CodeBlockProps>(children)) {
        return (
            <CodeBlock className={children.props.className}>
                {children.props.children}
            </CodeBlock>
        );
    }
    return <CodeBlock>{children}</CodeBlock>;
}

export default function MarkdownRenderer({ content }: { content: string }) {
    return (
        <Markdown
            options={{
                overrides: {
                    h1: {
                        component: Typography,
                        props: {
                            variant: "h3",
                            gutterBottom: true,
                            sx: { fontWeight: 800, mt: 4 },
                        },
                    },
                    h2: {
                        component: Typography,
                        props: {
                            variant: "h4",
                            gutterBottom: true,
                            sx: { fontWeight: 700, mt: 4 },
                        },
                    },
                    h3: {
                        component: Typography,
                        props: {
                            variant: "h5",
                            gutterBottom: true,
                            sx: { fontWeight: 600, mt: 3 },
                        },
                    },
                    p: {
                        component: Typography,
                        props: {
                            variant: "body1",
                            paragraph: true,
                            sx: {
                                lineHeight: 1.8,
                                color: "text.secondary",
                                fontSize: "1.1rem",
                            },
                        },
                    },
                    li: {
                        component: Typography,
                        props: {
                            component: "li",
                            sx: {
                                lineHeight: 1.8,
                                color: "text.secondary",
                                fontSize: "1.1rem",
                            },
                        },
                    },
                    pre: {
                        component: Pre,
                    },
                    code: {
                        component: ({
                            className,
                            children,
                        }: {
                            className?: string;
                            children?: React.ReactNode;
                        }) => {
                            // Inline code (no language class) – render as styled <code>
                            if (!className) {
                                return (
                                    <Box
                                        component="code"
                                        sx={{
                                            px: 0.75,
                                            py: 0.25,
                                            borderRadius: 1,
                                            border: 1,
                                            borderColor: "divider",
                                            backgroundColor:
                                                "action.hover",
                                            fontFamily: "monospace",
                                            fontSize: "0.95em",
                                        }}
                                    >
                                        {children}
                                    </Box>
                                );
                            }
                            // Block code is handled by <Pre> wrapper
                            return (
                                <code className={className}>{children}</code>
                            );
                        },
                    },
                },
            }}
        >
            {content}
        </Markdown>
    );
}
