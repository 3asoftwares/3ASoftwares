import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { COMPANY } from '@/lib/constants';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

export const metadata: Metadata = {
    title: `${COMPANY.name} | Custom Web, Mobile & IT Solutions`,
    description:
        'A team of full-stack developers who design, build, and support custom websites, mobile apps, and business software — from first release to long-term scale.',
    icons: {
        icon: '/favicon.ico',
        apple: '/logo192.png',
    },
    manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='en' className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
            <body className='bg-canvas text-fg font-sans text-[15px] antialiased'>
                <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
