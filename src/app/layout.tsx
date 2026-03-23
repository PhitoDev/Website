import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Modern Digital Space",
  description: "A redesigned technical portfolio and blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0A0A0A' }}>
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
