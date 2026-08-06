'use client';

import Link from 'next/link';
import { COMPANY } from '@/lib/constants';

const links = [
    { href: '/#about', label: 'About' },
    { href: '/#services', label: 'Services' },
    { href: '/#products', label: 'Products' },
    { href: '/#portfolio', label: 'Portfolio' },
    { href: '/contact#contact', label: 'Contact' },
];

const NavLinks = () => {
    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.href}
                    className='text-fg-muted hover:text-fg px-3 py-1.5 text-sm font-medium transition-colors'
                    href={link.href}>
                    {link.label}
                </Link>
            ))}
            <a
                target='_blank'
                rel='noreferrer'
                href={COMPANY.calendlyUrl}
                className='ml-1 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-accent-400 px-4 py-1.5 text-sm font-semibold text-white transition-transform hover:scale-105'>
                Book a Call
            </a>
        </>
    );
};

export default NavLinks;
