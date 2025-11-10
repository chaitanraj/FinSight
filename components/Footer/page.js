import React from 'react';
import { MapPin, Phone, Mail, DollarSign, TrendingUp, PieChart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-emerald-950 to-black text-white overflow-hidden border-t border-emerald-900/30">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-400 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-emerald-300 rounded-full blur-2xl"></div>
            </div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <DollarSign className="absolute top-16 right-32 w-8 h-8 text-emerald-500 opacity-10 animate-pulse" />
                <TrendingUp className="absolute bottom-32 left-16 w-6 h-6 text-emerald-400 opacity-20 animate-bounce" style={{ animationDelay: '1s' }} />
                <PieChart className="absolute top-1/3 right-16 w-10 h-10 text-emerald-300 opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-8">
                <div className="relative max-w-7xl mx-auto px-6 py-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div>
                                <div className="flex items-center space-x-2 mb-1">
                                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                        <DollarSign className="w-4 h-4 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                                        FinSight
                                    </h2>
                                </div>
                                <p className="text-gray-300 leading-relaxed max-w-lg text-md font-[500]">
                                    Your intelligent financial companion for smart budgeting and expense tracking.
                                    We combine powerful analytics with intuitive design to help you achieve your
                                    financial goals, track spending patterns, and build a secure financial future.
                                </p>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-lg mt-2 font-semibold text-emerald-300 mb-2">Get In Touch</h3>

                                <div className="flex items-start space-x-2 group">
                                    <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-md flex items-center justify-center shadow-md group-hover:shadow-emerald-500/50 transition-all duration-300">
                                        <MapPin className="w-3 h-3 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-emerald-400 font-medium text-xs">Our Location</p>
                                        <p className="text-gray-300 text-xs">
                                            Bennett University<br />
                                            Greater Noida, Uttar Pradesh - 201310
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 group">
                                    <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-md flex items-center justify-center shadow-md group-hover:shadow-emerald-500/50 transition-all duration-300">
                                        <Phone className="w-3 h-3 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-emerald-400 font-medium text-xs">Call Us</p>
                                        <p className="text-gray-300 text-xs">+91 9xxxxxxxx2</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 group">
                                    <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-md flex items-center justify-center shadow-md group-hover:shadow-emerald-500/50 transition-all duration-300">
                                        <Mail className="w-3 h-3 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-emerald-400 font-medium text-xs">Email Us</p>
                                        <p className="text-gray-300 text-xs">support@finsight.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:flex lg:justify-end">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-emerald-300 mb-1">Quick Links</h3>
                                <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1">
                                    {[
                                        { href: "/about", text: "About Us" },
                                        { href: "/features", text: "Features" },
                                        { href: "/pricing", text: "Pricing" },
                                        { href: "/contact", text: "Contact" },
                                        { href: "/privacy-policy", text: "Privacy Policy" },
                                        { href: "/terms", text: "Terms of Service" }
                                    ].map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.href}
                                            className="group flex items-center space-x-1 text-gray-300 hover:text-emerald-400 transition-all duration-300 py-0.5 px-1 rounded text-sm hover:bg-emerald-900/20 backdrop-blur-sm"
                                        >
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full group-hover:bg-emerald-400 transition-colors duration-300"></div>
                                            <span className="font-medium">{link.text}</span>
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-3 pt-2">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
                            <p className="text-gray-400 font-medium text-xs">
                                © 2025 FinSight. All Rights Reserved.
                            </p>
                            <p className="text-gray-400 text-xs">
                                Designed And Developed By{' '}
                                <span className="text-emerald-400 font-semibold">
                                    Chaitanya Raj
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500"></div> */}
        </footer>
    );
};

export default Footer;
