export const DEFAULT_BOOKING_AMOUNT_RUPEES = 999;

export const PLANS = [
    {
        id: 1,
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
        title: 'Web Application Plan',
        price: '₹99,999',
        bookingAmountRupees: 999,
        icon: '⚙️',
        bestFor: 'Enterprise solutions',
        features: ['Custom Admin Panel', 'CRM / ERP Solutions', 'Dashboard Systems', 'API Integration', 'Role-Based Access'],
    },
    {
        id: 5,
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
        title: 'Website Maintenance Plan',
        price: '₹19,99 / Month',
        bookingAmountRupees: 1999,
        icon: '🌐',
        bestFor: 'Ongoing support',
        features: ['Regular Updates', 'Backup Management', 'Security Monitoring', 'Minor Content Changes', '24/7 Support'],
    },
];

export function getBookingAmountRupeesByPlanId(planId) {
    const plan = PLANS.find((item) => item.id === Number(planId));
    return Number(plan?.bookingAmountRupees || DEFAULT_BOOKING_AMOUNT_RUPEES);
}

export function getBookingAmountPaiseByPlanId(planId) {
    return getBookingAmountRupeesByPlanId(planId) * 100;
}
