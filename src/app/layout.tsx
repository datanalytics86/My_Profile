import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'QAQC Framework - Quality Assurance & Quality Control',
    template: '%s | QAQC Framework',
  },
  description:
    'World-class Quality Assurance and Quality Control framework for software development. Features modern UI/UX, comprehensive documentation, CI/CD templates, and OWASP Top 10 security coverage.',
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
    'Modern UI',
    'Web Application',
    'Next.js',
  ],
  authors: [{ name: 'QAQC Framework Team' }],
  creator: 'QAQC Framework',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'QAQC Framework - World-Class Quality Assurance',
    description: 'Modern Quality Assurance framework with stunning UI/UX',
    siteName: 'QAQC Framework',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QAQC Framework',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QAQC Framework',
    description: 'World-class Quality Assurance framework',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, 'min-h-screen antialiased font-sans')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
