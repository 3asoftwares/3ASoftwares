'use client';

import React from 'react';
import Link from 'next/link';

const NavLinks = () => {
    return (
        <>
            <Link className='px-4 font-extrabold text-gray-500 hover:text-black' href='/#about'>
                About
            </Link>
            <Link className='px-4 font-extrabold text-gray-500 hover:text-black' href='/#services'>
                Services
            </Link>
            <Link className='px-4 font-extrabold text-gray-500 hover:text-black' href='/#products'>
                Products
            </Link>
            <Link className='px-4 font-extrabold text-gray-500 hover:text-black' href='/#portfolio'>
                Portfolio
            </Link>
            <Link className='px-4 font-extrabold text-gray-500 hover:text-black' href='/contact#contact'>
                Contact Us
            </Link>
            <a
                target='_blank'
                rel='noreferrer'
                href='https://calendly.com/3asoftwares/30min'
                className='text-white bg-black hover:bg-blue-800 rounded-lg inline-flex items-center justify-center w-auto px-5 py-2 shadow-xl'>
                Schedule Book
            </a>
        </>
    );
};

export default NavLinks;
