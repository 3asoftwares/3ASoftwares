import './globals.css';
import 'aos/dist/aos.css';
import AosInit from '@/components/AosInit';

export const metadata = {
    title: '3A Softwares',
    description: '3A Softwares - Your trusted partner in web and mobile app development.',
    icons: {
        icon: '/favicon.ico',
        apple: '/logo192.png',
    },
    manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <AosInit />
                {children}
            </body>
        </html>
    );
}
