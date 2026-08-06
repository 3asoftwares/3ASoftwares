'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return <span className='h-8 w-8' aria-hidden='true' />;
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <button
            type='button'
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className='flex h-8 w-8 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-slate-900/5 hover:text-fg dark:hover:bg-white/10'>
            {isDark ? (
                <svg className='h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                    <circle cx='12' cy='12' r='4' />
                    <path
                        strokeLinecap='round'
                        d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41'
                    />
                </svg>
            ) : (
                <svg className='h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.14 8.59 8.59 0 0 1 .25-2.16A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 13.66 12.86 1 1 0 0 0-.02-1.22z' />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggle;
