import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'
import { DM_Sans } from "next/font/google";
import "./globals.css";

const DMSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Mentor | Character counter",
  description: "Character counter challenge from Frontend Mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${DMSans.variable} antialiased bg-center bg-cover bg-light-theme dark:bg-dark-theme text-neutral-900 dark:text-neutral-200`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  );
}
