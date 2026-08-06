import type { PlanSeed } from '@/types/plan';

/**
 * Seed data for the `Plan` collection. Read only by `services/plan.service.ts`
 * to populate MongoDB the first time it's queried — the database, not this
 * array, is the source of truth for plans served to the app.
 */
export const PLAN_SEED_DATA: PlanSeed[] = [
    {
        id: 1,
        order: 1,
        title: 'Basic Business Website',
        price: '₹19,999',
        bookingAmountRupees: 999,
        icon: '💻',
        bestFor: 'Small businesses & startups',
        features: [
            '4–5 Pages (Home, About, Services, Contact)',
            'Mobile Responsive Design',
            'Contact Form',
            'WhatsApp Integration',
            'Basic SEO Setup',
            '1 Month Free Support',
        ],
    },
    {
        id: 2,
        order: 2,
        title: 'Professional Website Plan',
        price: '₹24,999',
        bookingAmountRupees: 999,
        icon: '🏢',
        bestFor: 'Growing businesses',
        features: ['Custom UI/UX', '6–8 Pages', 'Speed Optimization', 'SEO Optimization', 'Google Analytics Setup', '2 Months Support'],
        featured: true,
    },
    {
        id: 3,
        order: 3,
        title: 'E-Commerce Website Plan',
        price: '₹49,999',
        bookingAmountRupees: 999,
        icon: '🛒',
        bestFor: 'Online stores',
        features: [
            'Product Management',
            'Payment Gateway Integration',
            'Cart & Checkout',
            'Admin Dashboard',
            'Order Management',
            '2 Months Support with Basic SEO',
        ],
    },
    {
        id: 4,
        order: 4,
        title: 'Web Application Plan',
        price: '₹99,999',
        bookingAmountRupees: 999,
        icon: '⚙️',
        bestFor: 'Enterprise solutions',
        features: ['Custom Admin Panel', 'CRM / ERP Solutions', 'Dashboard Systems', 'API Integration', 'Role-Based Access'],
    },
    {
        id: 5,
        order: 5,
        title: 'Mobile App Plan',
        price: '₹99,999',
        bookingAmountRupees: 9,
        icon: '📱',
        bestFor: 'iOS & Android apps',
        features: [
            'Android App Development',
            'iOS App Development',
            'Backend Integration',
            'Play Store Deployment Support',
            'App Store Deployment Support',
        ],
    },
    {
        id: 6,
        order: 6,
        title: 'Website Maintenance Plan',
        price: '₹19,99 / Month',
        bookingAmountRupees: 1999,
        icon: '🌐',
        bestFor: 'Ongoing support',
        features: ['Regular Updates', 'Backup Management', 'Security Monitoring', 'Minor Content Changes', '24/7 Support'],
    },
];

export const COMPANY = {
    name: '3A Softwares',
    address: {
        line1: '52, Aakash Greens',
        line2: 'In front of Gomatgiri',
        line3: 'Naya Basera, Gandhi Nagar',
        line4: 'Indore, Madhya Pradesh 453112',
    },
    phone: '7047026537',
    email: '3asoftwares@gmail.com',
    social: {
        facebook: 'https://www.facebook.com/ENLIGHTENEERING/',
        linkedin: 'https://www.linkedin.com/company/enlighteneering-inc-',
    },
    calendlyUrl: 'https://calendly.com/3asoftwares/30min',
} as const;

export const DEMO_PRODUCT_OPTIONS = [
    { value: 'business_management_system', label: 'Business Management System' },
    { value: 'school_management_portal', label: 'School Management Portal' },
    { value: 'payroll_management_system', label: 'Payroll Management System' },
    { value: 'event_management_system', label: 'Event Management System' },
] as const;
