'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import NavLinks from './NavLinks';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { COMPANY } from '@/lib/constants';
import logoWhite from '../../images/logo-white.png';

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const scrollHandler = () => {
            setScrolled(window.pageYOffset > 10);
        };
        scrollHandler();
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    return (
        <nav
            className={`fixed top-0 z-40 w-full transition-all duration-300 ${
                scrolled ? 'border-hairline border-b bg-canvas/85 backdrop-blur-lg' : 'bg-transparent'
            }`}>
            <div className='mx-auto flex h-14 w-[calc(100%-2rem)] max-w-7xl items-center justify-between'>
                <Link href='/#hero' className='flex items-center gap-2'>
                    <img src={logoWhite.src} alt={COMPANY.name} className='h-8 w-8 rounded-md' />
                    <span className='font-display text-fg text-sm font-bold'>{COMPANY.name}</span>
                </Link>

                <div className='hidden items-center gap-1 lg:flex'>
                    <NavLinks />
                    <ThemeToggle />
                </div>

                <div className='flex items-center gap-1 lg:hidden'>
                    <ThemeToggle />
                    <button
                        className='text-fg rounded-lg p-1.5'
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label='Toggle navigation menu'>
                        <svg className='h-5 w-5 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                            {isOpen ? (
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z'
                                />
                            ) : (
                                <path fillRule='evenodd' d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z' />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className='border-hairline bg-canvas overflow-hidden border-b lg:hidden'>
                        <div className='flex flex-col items-start gap-1 px-6 py-4'>
                            <NavLinks />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default NavBar;
