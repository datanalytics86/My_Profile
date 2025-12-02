import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'QAQC Framework - Quality Assurance & Quality Control',
    template: '%s | QAQC Framework',
  },
  description:
    'Comprehensive Quality Assurance and Quality Control framework for software development. Includes standards, best practices, templates, and automation.',
  keywords: [
    'QAQC',
    'Quality Assurance',
    'Quality Control',
    'Software Development',
    'CI/CD',
    'Security',
    'OWASP',
    'Testing',
    'Code Review',
  ],
  authors: [{ name: 'QAQC Framework Team' }],
  creator: 'QAQC Framework',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'QAQC Framework',
    description: 'Comprehensive Quality Assurance and Quality Control framework',
    siteName: 'QAQC Framework',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QAQC Framework',
    description: 'Comprehensive Quality Assurance and Quality Control framework',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen antialiased')}>
        {children}
      </body>
    </html>
  );
}
