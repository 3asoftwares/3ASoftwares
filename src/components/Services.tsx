import Reveal from './motion/Reveal';
import imgWeb from '../images/web.svg';
import imgApp from '../images/app.svg';
import imgHosting from '../images/hosting.svg';
import imgConsultation from '../images/consultation.svg';

const services = [
    {
        title: 'Web Development',
        body: 'Fast, responsive websites and web apps tailored to your business — from marketing sites to full product builds, built mobile-first from day one.',
        img: imgWeb,
    },
    {
        title: 'Mobile App Development',
        body: 'Cross-platform iOS and Android apps built on a shared codebase, optimized for performance, scalability, and a smooth native feel.',
        img: imgApp,
    },
    {
        title: 'Domain & Hosting',
        body: 'Domain registration and managed hosting so your site stays fast, secure, and online — without you having to think about infrastructure.',
        img: imgHosting,
    },
    {
        title: 'General IT Consultations',
        body: 'Practical, vendor-neutral guidance on the tools and architecture that fit your business — not just the ones that are trending.',
        img: imgConsultation,
    },
];

const process = [
    { step: '01', title: 'Discover', body: 'We start by understanding your goals, users, and constraints before writing a line of code.' },
    { step: '02', title: 'Design', body: 'Wireframes and UI direction you can react to early, before development locks anything in.' },
    { step: '03', title: 'Build', body: 'Iterative development with regular check-ins, so you always know where the project stands.' },
    { step: '04', title: 'Launch', body: 'We handle deployment, testing, and the details that turn a build into a live product.' },
    { step: '05', title: 'Support', body: 'Ongoing fixes, updates, and improvements after launch, on a plan that matches your needs.' },
];

const Services = () => {
    return (
        <div id='services' className='bg-surface border-hairline relative border-t py-16'>
            <section className='mx-auto max-w-6xl px-6'>
                <Reveal className='mx-auto max-w-xl text-center'>
                    <h2 className='text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400'>What we offer</h2>
                    <p className='text-fg mt-2 font-display text-xl font-bold sm:text-2xl'>Everything you need to launch, and run, software that works.</p>
                </Reveal>

                <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    {services.map((service, idx) => (
                        <Reveal key={service.title} delay={idx * 0.08} className='glass-panel rounded-xl p-5'>
                            <img alt={`${service.title} icon`} className='h-10 w-10' src={service.img.src} />
                            <h3 className='text-fg mt-3 font-display text-base font-bold'>{service.title}</h3>
                            <p className='text-fg-muted mt-2 text-sm'>{service.body}</p>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className='mx-auto mt-16 max-w-6xl px-6'>
                <Reveal className='mx-auto max-w-xl text-center'>
                    <h2 className='text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400'>How we work</h2>
                    <p className='text-fg mt-2 font-display text-xl font-bold sm:text-2xl'>A clear process, from first call to launch day.</p>
                </Reveal>

                <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
                    {process.map((item, idx) => (
                        <Reveal key={item.step} delay={idx * 0.06} className='border-hairline rounded-xl border p-5'>
                            <span className='text-fg-muted font-display text-xl font-bold opacity-40'>{item.step}</span>
                            <h3 className='text-fg mt-2 font-display text-sm font-bold'>{item.title}</h3>
                            <p className='text-fg-muted mt-1.5 text-sm'>{item.body}</p>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className='mx-auto mt-16 max-w-6xl px-6'>
                <div className='grid gap-8 lg:grid-cols-2'>
                    <Reveal className='flex flex-col'>
                        <div className='text-fg mb-3 flex items-center gap-3'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' className='fill-current text-brand-500'>
                                <path d='M2 12h2a7.986 7.986 0 0 1 2.337-5.663 7.91 7.91 0 0 1 2.542-1.71 8.12 8.12 0 0 1 6.13-.041A2.488 2.488 0 0 0 17.5 7C18.886 7 20 5.886 20 4.5S18.886 2 17.5 2c-.689 0-1.312.276-1.763.725-2.431-.973-5.223-.958-7.635.059a9.928 9.928 0 0 0-3.18 2.139 9.92 9.92 0 0 0-2.14 3.179A10.005 10.005 0 0 0 2 12zm17.373 3.122c-.401.952-.977 1.808-1.71 2.541s-1.589 1.309-2.542 1.71a8.12 8.12 0 0 1-6.13.041A2.488 2.488 0 0 0 6.5 17C5.114 17 4 18.114 4 19.5S5.114 22 6.5 22c.689 0 1.312-.276 1.763-.725A9.965 9.965 0 0 0 12 22a9.983 9.983 0 0 0 9.217-6.102A9.992 9.992 0 0 0 22 12h-2a7.993 7.993 0 0 1-.627 3.122z' />
                                <path d='M12 7.462c-2.502 0-4.538 2.036-4.538 4.538S9.498 16.538 12 16.538s4.538-2.036 4.538-4.538S14.502 7.462 12 7.462zm0 7.076c-1.399 0-2.538-1.139-2.538-2.538S10.601 9.462 12 9.462s2.538 1.139 2.538 2.538-1.139 2.538-2.538 2.538z' />
                            </svg>
                            <h3 className='font-display text-lg font-bold'>
                                We <span className='text-gradient'>Build</span>
                            </h3>
                        </div>
                        <p className='text-fg-muted text-sm leading-relaxed'>
                            With years of hands-on experience across software design and development, we bring a practical understanding of today’s IT
                            landscape — and turn that into recommendations that actually move your business forward.
                        </p>
                    </Reveal>

                    <Reveal delay={0.1} className='flex flex-col'>
                        <div className='text-fg mb-3 flex items-center gap-3'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' className='fill-current text-accent-500'>
                                <path d='m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 18-1.953-.434 4-18z' />
                            </svg>
                            <h3 className='font-display text-lg font-bold'>
                                We <span className='text-gradient'>Collaborate</span>
                            </h3>
                        </div>
                        <p className='text-fg-muted text-sm leading-relaxed'>
                            Already have a tech team? We slot in alongside them to help scale existing systems, or take full ownership of a new build that
                            fits into how you already work.
                        </p>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default Services;
