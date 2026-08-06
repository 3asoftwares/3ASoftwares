import Link from 'next/link';
import NavBar from './Navbar/NavBar';
import Reveal from './motion/Reveal';
import heroImg from '../images/web-dev.svg';

const Hero = () => {
    return (
        <div className='bg-canvas relative overflow-hidden' id='hero'>
            <div className='section-glow' />

            <NavBar />

            <div className='relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 pt-24 pb-14 lg:flex-row lg:items-center lg:justify-between lg:pt-28 lg:pb-20'>
                <div className='flex flex-col text-center lg:w-1/2 lg:text-left'>
                    <Reveal>
                        <span className='border-hairline text-fg-muted mb-4 inline-flex w-fit items-center gap-2 self-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide lg:self-start'>
                            Web · Mobile · Business Software
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className='text-fg font-display text-2xl font-bold leading-[1.15] sm:text-3xl lg:text-4xl'>
                            Custom software, built around <span className='text-gradient'>how your business actually works.</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className='text-fg-muted mx-auto mt-4 max-w-md text-base lg:mx-0'>
                            We're a full-stack team that designs, builds, and supports websites, mobile apps, and internal tools — from the first release
                            through the day you outgrow them.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <div className='mx-auto mt-6 flex flex-col gap-3 sm:flex-row lg:mx-0'>
                            <Link
                                href='/contact'
                                className='inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-500 to-accent-400 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]'>
                                Start a project
                                <svg className='h-3.5 w-3.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                    <path
                                        fillRule='evenodd'
                                        d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </Link>
                            <Link
                                href='#portfolio'
                                className='border-hairline text-fg inline-flex items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-900/5 dark:hover:bg-white/5'>
                                See our work
                            </Link>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.2} className='w-full max-w-sm lg:w-1/2'>
                    <img alt='Illustration of a web developer building an application' className='mx-auto w-full' src={heroImg.src} />
                </Reveal>
            </div>
        </div>
    );
};

export default Hero;
