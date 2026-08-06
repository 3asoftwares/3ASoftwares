import Cta from '@/components/Cta';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import Products from '@/components/Products';

// Re-fetch plans from the database periodically instead of only at build time.
export const revalidate = 300;

export default function HomePage() {
    return (
        <>
            <Hero />
            <Intro />
            <Services />
            <Products />
            <Portfolio />
            <Cta />
            <Footer />
        </>
    );
}
