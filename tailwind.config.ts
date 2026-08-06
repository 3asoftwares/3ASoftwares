import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                display: ['var(--font-space-grotesk)', 'sans-serif'],
            },
            colors: {
                ink: {
                    950: '#05070f',
                    900: '#0a0e1a',
                    800: '#0f1424',
                    700: '#161c30',
                },
                brand: {
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                },
                accent: {
                    400: '#22d3ee',
                    500: '#06b6d4',
                    600: '#0891b2',
                },
            },
            boxShadow: {
                glow: '0 0 32px -12px rgba(99, 102, 241, 0.45)',
            },
        },
    },
    plugins: [],
};

export default config;
