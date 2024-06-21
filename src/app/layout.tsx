import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobConiq: Your Ultimate Job Board for Finding Jobs and Browsing Companies",
  description: "Discover your next career opportunity with JobConiq, the comprehensive job board that connects job seekers with top employers. Browse job listings, explore companies, and apply for your dream job today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-Epilogue">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
