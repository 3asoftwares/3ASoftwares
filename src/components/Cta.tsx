import Link from 'next/link';
import Reveal from './motion/Reveal';

const Cta = () => {
    return (
        <div className='relative overflow-hidden bg-gradient-to-br from-brand-600 to-accent-600 py-12'>
            <div className='relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center lg:flex-row lg:justify-between lg:text-left'>
                <Reveal>
                    <p className='font-display text-xl font-bold text-white sm:text-2xl'>Ready to build something that works?</p>
                    <p className='mt-2 text-sm text-white/85'>
                        Tell us what you're building — we'll follow up within a day with <span className='font-semibold text-white'>next steps.</span>
                    </p>
                </Reveal>

                <Reveal delay={0.15}>
                    <Link
                        href='/contact'
                        className='group inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20'>
                        Send a message
                        <svg
                            className='h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'>
                            <path
                                fillRule='evenodd'
                                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </Link>
                </Reveal>
            </div>
        </div>
    );
};

export default Cta;
