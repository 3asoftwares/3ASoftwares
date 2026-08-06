import Link from 'next/link';
import Reveal from './motion/Reveal';
import img from '../images/Web-developer.svg';

const values = [
    {
        title: 'One dedicated team',
        body: 'The people who scope your project are the ones who build it — no hand-offs, no re-explaining requirements.',
    },
    {
        title: 'Transparent pricing',
        body: 'Fixed-scope plans with a clear booking fee, so you know exactly what you’re paying for before you commit.',
    },
    {
        title: 'Support that continues',
        body: 'Launch day isn’t the finish line — we stay on for updates, fixes, and whatever the next phase needs.',
    },
];

const Intro = () => {
    return (
        <div className='bg-canvas relative mx-auto max-w-6xl px-6 py-16' id='about'>
            <div className='flex flex-col-reverse items-center gap-10 lg:flex-row lg:items-center lg:justify-between'>
                <Reveal className='w-full lg:w-1/2'>
                    <img alt='Illustration of a web developer at work' className='mx-auto w-full max-w-xs' src={img.src} />
                </Reveal>

                <Reveal delay={0.1} className='w-full text-center lg:w-1/2 lg:text-left'>
                    <h2 className='text-fg font-display text-xl font-bold sm:text-2xl'>
                        We build the software your business <span className='text-gradient'>runs on</span> — not just the one it launches with.
                    </h2>
                    <p className='text-fg-muted mt-3 text-sm leading-relaxed'>
                        Our team designs and develops custom web and mobile applications for organizations, institutions, and growing businesses that need
                        more than a template can offer.
                    </p>
                    <p className='text-fg-muted mt-3 text-sm leading-relaxed'>
                        From automating manual workflows to building the systems your team relies on daily, we take ownership of the details that make
                        software genuinely usable — not just shippable.
                    </p>
                    <Link
                        href='/contact'
                        className='group border-hairline text-fg mt-5 inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors hover:bg-slate-900/5 dark:hover:bg-white/5'>
                        Talk to our team
                        <svg
                            className='h-3.5 w-3.5 transition-transform group-hover:translate-x-1'
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

            <div className='mt-12 grid gap-4 sm:grid-cols-3'>
                {values.map((value, idx) => (
                    <Reveal key={value.title} delay={idx * 0.1} className='glass-panel rounded-xl p-5'>
                        <h3 className='text-fg font-display text-base font-bold'>{value.title}</h3>
                        <p className='text-fg-muted mt-1.5 text-sm'>{value.body}</p>
                    </Reveal>
                ))}
            </div>
        </div>
    );
};

export default Intro;
