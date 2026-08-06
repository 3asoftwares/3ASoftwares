import Reveal from './motion/Reveal';
import ProductsGrid from './ProductsGrid';
import { connectToDatabase } from '@/lib/mongodb';
import { getPlans } from '@/services/plan.service';
import type { Plan } from '@/types/plan';

const Products = async () => {
    await connectToDatabase();
    const plans = await getPlans();

    const serializedPlans: Plan[] = plans.map((plan) => ({
        id: plan.id,
        title: plan.title,
        price: plan.price,
        bookingAmountRupees: plan.bookingAmountRupees,
        icon: plan.icon,
        bestFor: plan.bestFor,
        features: plan.features,
        featured: plan.featured,
    }));

    return (
        <div id='products' className='bg-canvas border-hairline relative border-t py-16'>
            <section className='mx-auto max-w-6xl px-6'>
                <Reveal className='mx-auto max-w-xl text-center'>
                    <h2 className='text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400'>Products &amp; Services</h2>
                    <p className='text-fg mt-2 font-display text-xl font-bold sm:text-2xl'>Pick the plan that matches where your project is today.</p>
                    <p className='text-fg-muted mt-3 text-sm'>
                        Every plan is fixed-scope and fixed-price — no surprise invoices. Booking fee is ₹999 for Basic, Professional, E-Commerce, and Web
                        App plans, ₹1,999 for Maintenance, and ₹9 for the Mobile App plan.
                    </p>
                </Reveal>

                <ProductsGrid plans={serializedPlans} />
            </section>
        </div>
    );
};

export default Products;
