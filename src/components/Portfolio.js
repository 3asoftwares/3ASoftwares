import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
    const projects = [
        {
            id: 1,
            title: 'E-Storefront App',
            category: 'E-Commerce Application',
            description:
                'A full-featured e-commerce application designed for seamless online shopping experience. Built with modern technologies including product catalog management, shopping cart, secure checkout process, order tracking, and payment gateway integration.',
            features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Order Tracking', 'User Accounts', 'Admin Dashboard'],
            icon: '🛒',
        },
        {
            id: 2,
            title: 'PD Generator',
            category: 'For Asbc.co',
            description:
                'A sophisticated PD (Personal Development) Generator application developed for Asbc.co. This system automates the creation and management of personalized development plans with intelligent algorithms and data-driven insights to support professional growth.',
            features: ['Auto Generation', 'Data Analytics', 'Report Export', 'User Management', 'Customizable Templates', 'Real-time Updates'],
            icon: '📊',
        },
        {
            id: 3,
            title: 'Campaign Reporting',
            category: 'For Loqo.ai',
            description:
                'An advanced campaign reporting dashboard for Loqo.ai that provides comprehensive analytics and insights. Features real-time data visualization, detailed metrics, performance tracking, and exportable reports to optimize marketing campaigns.',
            features: ['Real-time Analytics', 'Data Visualization', 'Performance Metrics', 'Report Generation', 'API Integration', 'Custom Dashboards'],
            icon: '📈',
        },
    ];

    return (
        <div className='my-4 py-12 md:py-16' id='portfolio'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <h2 className='my-2 text-center text-3xl md:text-4xl text-black uppercase font-bold'>Portfolio</h2>
                <div className='flex justify-center mb-8'>
                    <div className='w-24 border-b-4 border-blue-600'></div>
                </div>
                <p className='text-center text-lg md:text-xl text-gray-700 mb-12'>Showcasing our successful projects and client solutions</p>

                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8' data-aos='fade-up' data-aos-delay='300'>
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className='bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out hover:scale-105 overflow-hidden group'>
                            <div className='bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white'>
                                <div className='text-4xl mb-4'>{project.icon}</div>
                                <h3 className='text-2xl md:text-3xl font-bold mb-2'>{project.title}</h3>
                                <p className='text-blue-100 text-sm md:text-base font-semibold'>{project.category}</p>
                            </div>

                            {/* Content */}
                            <div className='p-6'>
                                {/* Description */}
                                <p className='text-gray-700 text-sm md:text-base leading-relaxed mb-6'>{project.description}</p>

                                {/* Features */}
                                <div className='mb-6'>
                                    <h4 className='font-bold text-gray-900 text-sm md:text-base mb-3'>Key Features:</h4>
                                    <div className='flex flex-wrap gap-2'>
                                        {project.features.map((feature, idx) => (
                                            <span key={idx} className='bg-blue-100 text-blue-800 text-xs md:text-sm px-3 py-1 rounded-full font-medium'>
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className='flex gap-3 flex-col sm:flex-row'>
                                    <Link
                                        to='/contact'
                                        className='flex-1 text-white bg-blue-600 hover:bg-blue-800 transition-all duration-300 inline-flex items-center justify-center px-4 py-3 rounded-lg font-semibold text-sm md:text-base shadow-lg hover:shadow-xl'>
                                        Learn More
                                        <svg className='w-4 h-4 ml-2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                            <path
                                                fillRule='evenodd'
                                                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                                                clipRule='evenodd'></path>
                                        </svg>
                                    </Link>
                                    <Link
                                        to='/contact'
                                        className='flex-1 text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 inline-flex items-center justify-center px-4 py-3 rounded-lg font-semibold text-sm md:text-base'>
                                        Case Study
                                    </Link>
                                </div>
                            </div>

                            {/* Bottom accent */}
                            <div className='h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
                        </div>
                    ))}
                </div>

                {/* Additional CTA */}
                <div className='mt-12 md:mt-16 text-center' data-aos='fade-up' data-aos-delay='600'>
                    <div className='bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 md:p-12 border-2 border-blue-200'>
                        <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>Ready to See More?</h3>
                        <p className='text-gray-700 text-base md:text-lg mb-6 max-w-2xl mx-auto'>
                            Our team has successfully delivered numerous projects across different industries. Get in touch to discuss your project
                            requirements.
                        </p>
                        <Link
                            to='/contact'
                            className='inline-block bg-blue-600 text-white px-8 py-3 md:py-4 rounded-lg font-bold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 text-sm md:text-base'>
                            Start Your Project Today
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
