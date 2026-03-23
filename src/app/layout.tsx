import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Phito | ML Engineer",
  description:
    "Ralph Dugue is a quadriplegic wheelchair user, software engineer, and machine learning engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a080d",
        }}
      >
        <AppRouterCacheProvider>
          <ThemeRegistry>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
