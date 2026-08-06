'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer';
import Reveal from '@/components/motion/Reveal';
import { COMPANY, DEMO_PRODUCT_OPTIONS } from '@/lib/constants';

interface DemoForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
}

const initialForm: DemoForm = { firstName: '', lastName: '', email: '', phone: '', message: '' };

export default function GetDemoPage() {
    const [form, setForm] = useState<DemoForm>(initialForm);
    const [demoProducts, setDemoProducts] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: keyof DemoForm) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
        setErrors({});
    };

    const handleProductToggle = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setErrors((err) => ({ ...err, products: '' }));
        setDemoProducts((current) => (checked ? [...current, value] : current.filter((p) => p !== value)));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('/api/demo-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, products: demoProducts }),
            });
            const data = await res.json();
            const { default: Notiflix } = await import('notiflix');
            if (!res.ok) {
                Notiflix.Report.failure('An error occurred', data.message || 'Please try again.', 'Okay');
                setErrors(data.errors || {});
            } else {
                Notiflix.Report.success('Success', data.message, 'Okay');
                setForm(initialForm);
                setDemoProducts([]);
            }
        } catch {
            const { default: Notiflix } = await import('notiflix');
            Notiflix.Report.failure('An error occurred', 'Please try sending the message again.', 'Okay');
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass =
        'text-fg placeholder:text-fg-muted w-full rounded-lg bg-slate-900/5 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-white/5';

    return (
        <>
            <NavBar />
            <div id='demo' className='bg-canvas relative overflow-hidden pt-20 pb-16'>
                <div className='section-glow' />
                <div className='relative mx-auto max-w-5xl px-6'>
                    <Reveal className='mb-8 text-center'>
                        <h1 className='text-fg font-display text-2xl font-bold sm:text-3xl'>See our products in action</h1>
                        <p className='text-fg-muted mt-2 text-sm'>Pick what you'd like a walkthrough of, and we'll set up a live demo.</p>
                    </Reveal>

                    <div className='grid gap-6 lg:grid-cols-3'>
                        <Reveal delay={0.1} className='glass-panel rounded-xl p-6 lg:col-span-2'>
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div>
                                    <h2 className='mb-2 text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400'>
                                        Which product(s)?
                                    </h2>
                                    <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                                        {DEMO_PRODUCT_OPTIONS.map((opt) => (
                                            <label
                                                key={opt.value}
                                                htmlFor={`checkbox-${opt.value}`}
                                                className='text-fg flex items-center gap-2.5 rounded-lg bg-slate-900/5 p-2.5 text-sm font-medium dark:bg-white/5'>
                                                <input
                                                    id={`checkbox-${opt.value}`}
                                                    type='checkbox'
                                                    className='h-4 w-4 rounded border-slate-400 text-brand-500 focus:ring-brand-500 dark:border-white/20'
                                                    value={opt.value}
                                                    checked={demoProducts.includes(opt.value)}
                                                    onChange={handleProductToggle}
                                                />
                                                {opt.label}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.products && <p className='mt-1.5 text-xs text-red-500 dark:text-red-400'>{errors.products}</p>}
                                </div>

                                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                    <div>
                                        <input
                                            name='first_name'
                                            className={inputClass}
                                            type='text'
                                            placeholder='First Name*'
                                            value={form.firstName}
                                            onChange={handleChange('firstName')}
                                        />
                                        {errors.first_name && <p className='mt-1 text-xs text-red-500 dark:text-red-400'>{errors.first_name}</p>}
                                    </div>

                                    <div>
                                        <input
                                            name='last_name'
                                            className={inputClass}
                                            type='text'
                                            placeholder='Last Name*'
                                            value={form.lastName}
                                            onChange={handleChange('lastName')}
                                        />
                                        {errors.last_name && <p className='mt-1 text-xs text-red-500 dark:text-red-400'>{errors.last_name}</p>}
                                    </div>

                                    <div>
                                        <input
                                            name='email'
                                            className={inputClass}
                                            type='email'
                                            placeholder='Email*'
                                            value={form.email}
                                            onChange={handleChange('email')}
                                        />
                                        {errors.email && <p className='mt-1 text-xs text-red-500 dark:text-red-400'>{errors.email}</p>}
                                    </div>

                                    <div>
                                        <input
                                            name='phone_number'
                                            className={inputClass}
                                            type='tel'
                                            placeholder='Phone*'
                                            value={form.phone}
                                            onChange={handleChange('phone')}
                                        />
                                        {errors.phone_number && <p className='mt-1 text-xs text-red-500 dark:text-red-400'>{errors.phone_number}</p>}
                                    </div>
                                </div>

                                <div>
                                    <textarea
                                        name='message'
                                        placeholder='Message*'
                                        className={`h-28 ${inputClass}`}
                                        value={form.message}
                                        onChange={handleChange('message')}
                                    />
                                    {errors.message && <p className='mt-1 text-xs text-red-500 dark:text-red-400'>{errors.message}</p>}
                                </div>

                                <button
                                    type='submit'
                                    disabled={submitting}
                                    className='w-full rounded-lg bg-gradient-to-r from-brand-500 to-accent-400 p-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8'>
                                    {submitting ? 'Sending...' : 'Request Demo'}
                                </button>
                            </form>
                        </Reveal>

                        <Reveal delay={0.2} className='border-hairline rounded-xl border p-6'>
                            <h2 className='text-fg font-display text-base font-bold'>Office Address</h2>
                            <p className='text-fg-muted mt-1.5 text-sm'>
                                {COMPANY.address.line1}, {COMPANY.address.line2}, {COMPANY.address.line3}, {COMPANY.address.line4}
                            </p>

                            <h2 className='text-fg mt-5 font-display text-base font-bold'>Call Us</h2>
                            <p className='text-fg-muted mt-1.5 text-sm'>Tel: {COMPANY.phone}</p>

                            <h2 className='text-fg mt-5 font-display text-base font-bold'>Email</h2>
                            <p className='text-fg-muted mt-1.5 text-sm'>{COMPANY.email}</p>

                            <div className='mt-5 flex gap-2'>
                                <a
                                    href={COMPANY.social.facebook}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='text-fg flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/5 transition-colors hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/20'>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' className='fill-current'>
                                        <path d='M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z' />
                                    </svg>
                                </a>
                                <a
                                    href={COMPANY.social.linkedin}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='text-fg flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/5 transition-colors hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/20'>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' className='fill-current'>
                                        <circle cx='4.983' cy='5.009' r='2.188' />
                                        <path d='M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z' />
                                    </svg>
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
