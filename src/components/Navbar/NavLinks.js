import React from 'react';
import { HashLink } from 'react-router-hash-link';

const NavLinks = () => {
    return (
        <>
            <HashLink className='px-4 font-extrabold text-gray-500 hover:text-black' smooth to='/#about'>
                About
            </HashLink>
            <HashLink className='px-4 font-extrabold text-gray-500 hover:text-black' smooth to='/#services'>
                Services
            </HashLink>
            <HashLink className='px-4 font-extrabold text-gray-500 hover:text-black' smooth to='/#products'>
                Products
            </HashLink>
            <HashLink className='px-4 font-extrabold text-gray-500 hover:text-black' smooth to='/#products'>
                Products
            </HashLink>
            <HashLink className='px-4 font-extrabold text-gray-500 hover:text-black' smooth to='/#products'>
                Products
            </HashLink>
            <HashLink className='px-4 font-extrabold text-gray-500 hover:text-black' to='/contact#contact'>
                Contact Us
            </HashLink>
            <HashLink
                smooth
                target='_blank'
                to='https://calendly.com/3asoftwares/30min'
                className='text-white bg-black hover:bg-blue-800 rounded-lg inline-flex items-center justify-center w-auto px-5 py-2 shadow-xl'>
                Schedule Book
            </HashLink>
        </>
    );
}

export default NavLinks;
