import Link from 'next/link';
import Reveal from './motion/Reveal';

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    features: string[];
    icon: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: 'E-Storefront App',
        category: 'E-Commerce Application',
        description:
            'A full-featured e-commerce application designed for a seamless online shopping experience — product catalog management, shopping cart, secure checkout, order tracking, and payment gateway integration.',
        features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Order Tracking', 'User Accounts', 'Admin Dashboard'],
        icon: '🛒',
    },
    {
        id: 2,
        title: 'PD Generator',
        category: 'For Asbc.co',
        description:
            'A Personal Development plan generator built for Asbc.co. It automates the creation and management of personalized development plans, with data-driven insights to support professional growth.',
        features: ['Auto Generation', 'Data Analytics', 'Report Export', 'User Management', 'Customizable Templates', 'Real-time Updates'],
        icon: '📊',
    },
    {
        id: 3,
        title: 'Campaign Reporting',
        category: 'For Loqo.ai',
        description:
            'A campaign reporting dashboard for Loqo.ai with real-time analytics, detailed metrics, performance tracking, and exportable reports to help optimize marketing campaigns.',
        features: ['Real-time Analytics', 'Data Visualization', 'Performance Metrics', 'Report Generation', 'API Integration', 'Custom Dashboards'],
        icon: '📈',
    },
];

const Portfolio = () => {
    return (
        <div className='bg-canvas relative py-16' id='portfolio'>
            <div className='mx-auto max-w-6xl px-6'>
                <Reveal className='mx-auto max-w-xl text-center'>
                    <h2 className='text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400'>Portfolio</h2>
                    <p className='text-fg mt-2 font-display text-xl font-bold sm:text-2xl'>A few things we've shipped.</p>
                </Reveal>

                <div className='mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                    {projects.map((project, idx) => (
                        <Reveal
                            key={project.id}
                            delay={idx * 0.08}
                            className='border-hairline group flex flex-col overflow-hidden rounded-xl border transition-transform duration-300 hover:-translate-y-0.5'>
                            <div className='bg-gradient-to-br from-brand-600 to-accent-500 p-5 text-white'>
                                <div className='mb-2 text-2xl'>{project.icon}</div>
                                <h3 className='font-display text-lg font-bold'>{project.title}</h3>
                                <p className='text-xs font-semibold text-white/80'>{project.category}</p>
                            </div>

                            <div className='flex flex-1 flex-col p-5'>
                                <p className='text-fg-muted mb-4 flex-1 text-sm leading-relaxed'>{project.description}</p>

                                <div className='mb-4'>
                                    <h4 className='text-fg mb-2 text-xs font-bold'>Key Features:</h4>
                                    <div className='flex flex-wrap gap-1.5'>
                                        {project.features.map((feature) => (
                                            <span key={feature} className='bg-surface text-fg-muted rounded-full px-2.5 py-0.5 text-[11px] font-medium'>
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <Link
                                    href='/contact'
                                    className='text-fg inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900/5 px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/15'>
                                    Discuss a similar project
                                    <svg className='h-3.5 w-3.5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                        <path
                                            fillRule='evenodd'
                                            d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.2} className='mt-10 text-center'>
                    <div className='glass-panel mx-auto max-w-2xl rounded-xl px-6 py-8'>
                        <h3 className='text-fg font-display text-lg font-bold'>Have something in mind?</h3>
                        <p className='text-fg-muted mt-2 text-sm'>We've delivered projects across e-commerce, analytics, and internal tooling. Tell us what you're building.</p>
                        <Link
                            href='/contact'
                            className='mt-5 inline-block rounded-lg bg-gradient-to-r from-brand-500 to-accent-400 px-6 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105'>
                            Start Your Project
                        </Link>
                    </div>
                </Reveal>
            </div>
        </div>
    );
};

export default Portfolio;
