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
            title: 'Professional Website Package',
            price: '₹12,000',
            icon: '🏢',
            bestFor: 'Growing businesses',
            features: ['Custom UI/UX', '6–8 Pages', 'Blog Integration', 'Speed Optimization', 'SEO Optimization', 'Google Analytics Setup', '2 Months Support'],
            featured: true,
        },
        {
            id: 3,
            title: 'E-Commerce Website',
            price: '₹18,000+',
            icon: '🛒',
            bestFor: 'Online stores',
            features: [
                'Product Management',
                'Payment Gateway Integration',
                'Cart & Checkout',
                'Admin Dashboard',
                'Order Management',
                'Basic SEO',
                '2 Months Support',
            ],
        },
        {
            id: 4,
            title: 'Web Application Development',
            price: 'Custom Pricing',
            icon: '⚙️',
            bestFor: 'Enterprise solutions',
            features: ['Custom Admin Panel', 'CRM / ERP Solutions', 'Dashboard Systems', 'API Integration', 'Role-Based Access'],
        },
        {
            id: 5,
            title: 'Mobile App Development',
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
        <div id='products' className='bg-white py-16 md:py-20'>
            <section data-aos='zoom-in-down'>
                <div className='my-4 py-4'>
                    <h2 className='my-2 text-center text-3xl md:text-4xl text-black uppercase font-bold'>Our Products & Services</h2>
                    <div className='flex justify-center'>
                        <div className='w-24 border-b-4 border-blue-600'></div>
                    </div>
                    <p className='mt-4 mx-4 md:mx-12 text-center text-lg md:text-xl font-medium text-gray-700'>
                        Choose the perfect package for your business needs
                    </p>
                </div>

                <div className='px-4 md:px-6 lg:px-12 py-8' data-aos='fade-up' data-aos-delay='300'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className={`relative group rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${
                                    product.featured
                                        ? 'lg:scale-105 bg-gradient-to-br from-blue-600 to-blue-800 text-white ring-4 ring-blue-400'
                                        : 'bg-white text-gray-800 hover:shadow-2xl hover:scale-105'
                                }`}>
                                {/* Featured Badge */}
                                {product.featured && (
                                    <div className='absolute top-4 right-4 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold'>FEATURED</div>
                                )}

                                {/* Card Content */}
                                <div className='p-6 md:p-8 flex flex-col h-full'>
                                    {/* Icon */}
                                    <div className='text-4xl md:text-5xl mb-4'>{product.icon}</div>

                                    {/* Title */}
                                    <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${product.featured ? 'text-white' : 'text-gray-900'}`}>
                                        {product.title}
                                    </h3>

                                    {/* Best For */}
                                    <p className={`text-sm mb-4 ${product.featured ? 'text-blue-100' : 'text-gray-600'}`}>
                                        Best for: <span className='font-semibold'>{product.bestFor}</span>
                                    </p>

                                    {/* Price */}
                                    <div className={`text-3xl md:text-4xl font-bold mb-6 ${product.featured ? 'text-yellow-300' : 'text-blue-600'}`}>
                                        {product.price}
                                    </div>

                                    {/* Features */}
                                    <ul className={`flex-grow mb-6 space-y-2 text-sm md:text-base ${product.featured ? 'text-blue-100' : 'text-gray-700'}`}>
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
                                        className={`w-full py-3 md:py-4 px-4 rounded-lg font-bold text-center transition-all duration-300 transform hover:scale-105 ${
                                            product.featured ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-800'
                                        }`}>
                                        Get Started
                                    </Link>
                                </div>

                                {/* Hover Effect Bottom Border */}
                                <div
                                    className={`absolute bottom-0 left-0 w-full h-1 ${
                                        product.featured ? 'bg-yellow-300' : 'bg-gradient-to-r from-blue-400 to-blue-600'
                                    } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className='mt-12 md:mt-16 text-center' data-aos='fade-up' data-aos-delay='600'>
                        <div className='bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 md:p-8 border-2 border-blue-200'>
                            <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>Need a Custom Solution?</h3>
                            <p className='text-gray-700 text-base md:text-lg mb-6'>
                                We offer fully customized packages tailored to your specific business requirements. Get in touch with our team today!
                            </p>
                            <Link
                                to='/contact'
                                className='inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105'>
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
