import React from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const products = [
        {
            id: 1,
            title: 'Basic Business Website',
            price: '₹5,000',
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
            price: '₹12,000',
            icon: '🏢',
            bestFor: 'Growing businesses',
            features: ['Custom UI/UX', '6–8 Pages', 'Speed Optimization', 'SEO Optimization', 'Google Analytics Setup', '2 Months Support'],
            featured: true,
        },
        {
            id: 3,
            title: 'E-Commerce Website Plan',
            price: '₹18,000+',
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
            price: 'Custom Pricing',
            icon: '⚙️',
            bestFor: 'Enterprise solutions',
            features: ['Custom Admin Panel', 'CRM / ERP Solutions', 'Dashboard Systems', 'API Integration', 'Role-Based Access'],
        },
        {
            id: 5,
            title: 'Mobile App Plan',
            price: 'Custom Pricing',
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
            price: '₹2,000 / Month',
            icon: '🌐',
            bestFor: 'Ongoing support',
            features: ['Regular Updates', 'Backup Management', 'Security Monitoring', 'Minor Content Changes', '24/7 Support'],
        },
    ];

    return (
        <div id='products' className='bg-white pt-24'>
            <section data-aos='zoom-in-down'>
                <div className='my-4 py-4'>
                    <h2 className='my-2 text-center text-3xl md:text-4xl text-black uppercase font-bold'>Our Products & Services</h2>
                    <div className='flex justify-center'>
                        <div className='w-24 border-b-4 border-gray-600'></div>
                    </div>
                    <p className='mt-4 mx-4 md:mx-12 text-center text-lg md:text-xl font-medium text-gray-700'>
                        Choose the perfect package for your business needs
                    </p>
                </div>

                <div className='px-4 md:px-6 lg:px-24 py-8' data-aos='fade-up' data-aos-delay='300'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className={`relative group rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${
                                    product.featured
                                        ? 'lg:scale-105 bg-gradient-to-br from-gray-600 to-gray-800 text-white ring-4 ring-gray-400'
                                        : 'bg-white text-gray-800 hover:shadow-2xl hover:scale-105'
                                }`}>
                                {/* Featured Badge */}
                                {product.featured && (
                                    <div className='absolute top-2 right-2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold'>FEATURED</div>
                                )}

                                {/* Card Content */}
                                <div className='p-6 md:p-8 flex flex-col h-full mt-2'>
                                    {/* Icon */}
                                    <div className='flex gap-4 items-center mb-4'>
                                        <span className='text-2xl md:text-2xl'>{product.icon}</span>
                                        <h3 className={`text-xl md:text-2xl font-bold ${product.featured ? 'text-white' : 'text-gray-900'}`}>
                                            {product.title}
                                        </h3>
                                    </div>

                                    {/* Best For */}
                                    <p className={`text-sm mb-4 ${product.featured ? 'text-gray-100' : 'text-gray-600'}`}>
                                        Best for: <span className='font-semibold'>{product.bestFor}</span>
                                    </p>

                                    {/* Price */}
                                    <div className={`text-3xl md:text-4xl font-bold mb-6 ${product.featured ? 'text-yellow-300' : 'text-gray-600'}`}>
                                        {product.price}
                                    </div>

                                    {/* Features */}
                                    <ul className={`flex-grow mb-6 space-y-2 text-sm md:text-base ${product.featured ? 'text-gray-100' : 'text-gray-700'}`}>
                                        {product.features.map((feature, idx) => (
                                            <li key={idx} className='flex items-start gap-2'>
                                                <span className={`text-lg ${product.featured ? 'text-green-300' : 'text-green-500'}`}>✓</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <Link
                                        to='/contact'
                                        className={`w-full py-2 md:py-4 px-4 rounded-lg font-bold text-center transition-all duration-300 transform hover:scale-105 ${
                                            product.featured ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-gray-600 text-white hover:bg-gray-800'
                                        }`}>
                                        Get Started
                                    </Link>
                                </div>

                                {/* Hover Effect Bottom Border */}
                                <div
                                    className={`absolute bottom-0 left-0 w-full h-1 ${
                                        product.featured ? 'bg-yellow-300' : 'bg-gradient-to-r from-gray-400 to-gray-600'
                                    } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className='mt-12 md:mt-16 text-center' data-aos='fade-up' data-aos-delay='600'>
                        <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-6 md:px-8 border-2 border-gray-200'>
                            <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>Need a Custom Solution?</h3>
                            <p className='text-gray-700 text-base md:text-lg mb-6'>
                                We offer fully customized packages tailored to your specific business requirements. Get in touch with our team today!
                            </p>
                            <Link
                                to='/contact'
                                className='inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105'>
                                Contact Us Today
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
