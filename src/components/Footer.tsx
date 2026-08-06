import Link from 'next/link';
import { COMPANY } from '@/lib/constants';
import logoWhite from '../images/logo-white.png';

const Footer = () => {
    return (
        <footer className='bg-surface border-hairline relative border-t py-12'>
            <div className='mx-auto max-w-6xl px-6'>
                <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
                    <div className='sm:col-span-2 lg:col-span-1'>
                        <div className='flex items-center gap-2'>
                            <img src={logoWhite.src} alt={COMPANY.name} className='h-7 w-7 rounded-md' />
                            <h3 className='text-fg font-display text-base font-bold'>{COMPANY.name}</h3>
                        </div>
                        <p className='text-fg-muted mt-3 text-sm'>
                            {COMPANY.address.line1}
                            <br />
                            {COMPANY.address.line2},
                            <br />
                            {COMPANY.address.line3}
                            <br />
                            {COMPANY.address.line4}
                        </p>
                    </div>

                    <div>
                        <h6 className='mb-3 text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400'>Links</h6>
                        <ul className='space-y-1.5 text-sm'>
                            <li>
                                <Link href='/#about' className='text-fg-muted hover:text-fg transition-colors'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href='/#services' className='text-fg-muted hover:text-fg transition-colors'>
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href='/contact#contact' className='text-fg-muted hover:text-fg transition-colors'>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h6 className='mb-3 text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400'>Our Services</h6>
                        <ul className='space-y-1.5 text-sm'>
                            <li>
                                <Link href='/#services' className='text-fg-muted hover:text-fg transition-colors'>
                                    Web Development
                                </Link>
                            </li>
                            <li>
                                <Link href='/#services' className='text-fg-muted hover:text-fg transition-colors'>
                                    Mobile App Development
                                </Link>
                            </li>
                            <li>
                                <Link href='/#services' className='text-fg-muted hover:text-fg transition-colors'>
                                    Domain and Hosting
                                </Link>
                            </li>
                            <li>
                                <Link href='/#services' className='text-fg-muted hover:text-fg transition-colors'>
                                    General IT Consultations
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h6 className='mb-3 text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400'>Follow Us</h6>
                        <div className='flex gap-2'>
                            <a
                                href={COMPANY.social.facebook}
                                target='_blank'
                                rel='noreferrer'
                                aria-label='Facebook'
                                className='text-fg flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/5 transition-colors hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/20'>
                                <svg className='h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                                    <path d='M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z' />
                                </svg>
                            </a>
                            <a
                                href={COMPANY.social.linkedin}
                                target='_blank'
                                rel='noreferrer'
                                aria-label='LinkedIn'
                                className='text-fg flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/5 transition-colors hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/20'>
                                <svg className='h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                                    <circle cx='4.983' cy='5.009' r='2.188' />
                                    <path d='M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z' />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className='border-hairline text-fg-muted mt-8 border-t pt-6 text-center text-xs'>
                    Copyright &copy; 2026{' '}
                    <Link href='/' className='hover:text-fg'>
                        {COMPANY.name}
                    </Link>
                    . All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
