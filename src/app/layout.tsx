import type { Metadata } from "next";
import "./globals.css";
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
      <body style={{ margin: 0, padding: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ThemeRegistry>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
