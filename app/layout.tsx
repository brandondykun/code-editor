import type { Metadata } from 'next';
import { Inter, Play, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Providers from './_context/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const play = Play({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-play',
});

const sourceCodePro = Source_Code_Pro({
  weight: '400',
  subsets: ['latin'],
  // display: "swap",
  variable: '--font-source-code-pro',
});

export const metadata: Metadata = {
  title: 'Code Editor',
  description: 'Browser Based Code Editor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${play.variable} ${inter.variable} ${sourceCodePro.variable} dark`}>
          <main>{children}</main>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
