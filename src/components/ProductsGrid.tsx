'use client';

import { useState } from 'react';
import Link from 'next/link';
import Reveal from './motion/Reveal';
import type { Plan } from '@/types/plan';
import RazorpayCheckout from './payment/RazorpayCheckout';

interface ProductsGridProps {
    plans: Plan[];
}

const ProductsGrid = ({ plans }: ProductsGridProps) => {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    return (
        <>
            <div className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {plans.map((product, idx) => (
                    <Reveal
                        key={product.id}
                        delay={(idx % 3) * 0.08}
                        className={`relative flex flex-col overflow-hidden rounded-xl p-px transition-transform duration-300 hover:-translate-y-0.5 ${
                            product.featured ? 'bg-gradient-to-br from-brand-500 to-accent-400 shadow-glow lg:scale-[1.02]' : 'border-hairline border'
                        }`}>
                        <div className={`flex h-full flex-col rounded-[11px] p-5 ${product.featured ? 'bg-slate-950 text-white' : 'bg-canvas'}`}>
                            {product.featured && (
                                <span className='absolute right-3 top-3 rounded-full bg-gradient-to-r from-brand-400 to-accent-400 px-2.5 py-0.5 text-[10px] font-bold text-white'>
                                    MOST POPULAR
                                </span>
                            )}

                            <div className='mb-3 flex items-center gap-2.5'>
                                <span className='text-lg'>{product.icon}</span>
                                <h3 className={`font-display text-base font-bold ${product.featured ? 'text-white' : 'text-fg'}`}>{product.title}</h3>
                            </div>

                            <p className={`mb-3 text-sm ${product.featured ? 'text-slate-300' : 'text-fg-muted'}`}>
                                Best for: <span className={product.featured ? 'font-semibold text-slate-100' : 'text-fg font-semibold'}>{product.bestFor}</span>
                            </p>

                            <div className='text-gradient mb-4 font-display text-2xl font-bold'>{product.price}</div>

                            <ul className={`mb-4 flex-grow space-y-1.5 text-sm ${product.featured ? 'text-slate-300' : 'text-fg-muted'}`}>
                                {product.features.map((feature) => (
                                    <li key={feature} className='flex items-start gap-2'>
                                        <span className='text-accent-500 dark:text-accent-400'>✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className={`mb-3 text-xs font-semibold ${product.featured ? 'text-slate-400' : 'text-fg-muted'}`}>
                                Booking fee: ₹{product.bookingAmountRupees}
                            </p>

                            <button
                                type='button'
                                onClick={() => setSelectedPlan(product)}
                                className={`w-full rounded-lg py-2.5 text-center text-sm font-bold transition-transform duration-200 hover:scale-[1.02] ${
                                    product.featured
                                        ? 'bg-gradient-to-r from-brand-500 to-accent-400 text-white'
                                        : 'bg-slate-900/5 text-fg hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/15'
                                }`}>
                                Get Started
                            </button>
                        </div>
                    </Reveal>
                ))}
            </div>

            <Reveal delay={0.2} className='mt-10 text-center'>
                <div className='glass-panel mx-auto max-w-2xl rounded-xl px-6 py-8'>
                    <h3 className='text-fg font-display text-lg font-bold'>Need something custom?</h3>
                    <p className='text-fg-muted mt-2 text-sm'>
                        We build fully customized packages around your specific requirements. Tell us what you’re working with, and we’ll scope it together.
                    </p>
                    <Link
                        href='/contact'
                        className='mt-5 inline-block rounded-lg bg-gradient-to-r from-brand-500 to-accent-400 px-6 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105'>
                        Contact Us Today
                    </Link>
                </div>
            </Reveal>

            {selectedPlan && <RazorpayCheckout plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
        </>
    );
};

export default ProductsGrid;
