'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, ChartPie as PieChart, Shield, CircleCheck as CheckCircle2, Smartphone, CreditCard, ChartBar as BarChart3, Clock, Calculator, FileCheck, ChevronDown } from 'lucide-react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <section className="pt-16 pb-20 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div
              className={`transition-all duration-1000 transform ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
            >
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-gray-200 shadow-sm border border-emerald-500/20">
                  Your Money, Your Control
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Take Control of Your Financial Future
              </h1>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Manage your money effortlessly with our AI-powered financial tools. Track spending, budget smartly, and achieve your financial goals faster.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/50 hover:shadow-xl hover:scale-105">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-emerald-500/30 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                  Explore a Demo
                </button>
              </div>

              {/* Trust Badges */}
              <div>
                <p className="text-sm text-gray-400 mb-4">Trusted by 250+ local and remote teams</p>
                <div className="flex flex-wrap gap-8 items-center opacity-60">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-gray-300">Norton</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-gray-300">Coinbase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-gray-300">Airtable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-gray-300">CLIFFORD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Phone Mockup */}
            <div
              className={`relative transition-all duration-1000 delay-300 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="relative mx-auto max-w-sm lg:max-w-md">
                {/* Main Phone */}
                <div className="bg-gray-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-3xl hover:shadow-2xl hover:border-emerald-500/40  shadow-2xl p-3 transform hover:scale-105 transition-transform duration-500">
                  <div className="bg-gray-800/90 rounded-[2rem] p-6 h-[600px] relative overflow-hidden">
                    {/* Phone Header */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl"></div>

                    {/* Content */}
                    <div className="pt-8">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-sm text-white-600">Dashboard</span>
                        <Smartphone className="w-5 h-5 text-gray-400" />
                      </div>

                      {/* Balance Card */}
                      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 mb-6 text-white shadow-lg">
                        <p className="text-sm opacity-90 mb-2">Total Balance</p>
                        <p className="text-3xl font-bold mb-4">$24,567.89</p>
                        <div className="flex gap-4 text-sm">
                          <div>
                            <p className="opacity-80">Income</p>
                            <p className="font-semibold">+$8,234</p>
                          </div>
                          <div>
                            <p className="opacity-80">Expenses</p>
                            <p className="font-semibold">-$3,456</p>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-4 gap-3 mb-6">
                        {[
                          { icon: TrendingUp, label: 'Transfer' },
                          { icon: CreditCard, label: 'Payment' },
                          { icon: PieChart, label: 'Budget' },
                          { icon: BarChart3, label: 'Stats' }
                        ].map((item, i) => (
                          <div key={i} className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                            <item.icon className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                            <p className="text-xs text-gray-600">{item.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Transactions */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-white-700">Recent</h3>
                        {[
                          { name: 'Shopping', amount: '-$156', color: 'bg-red-100 text-red-600' },
                          { name: 'Salary', amount: '+$5,230', color: 'bg-green-100 text-green-600' },
                          { name: 'Restaurant', amount: '-$89', color: 'bg-red-100 text-red-600' }
                        ].map((item, i) => (
                          <div key={i} className="bg-white rounded-xl p-3 flex justify-between items-center shadow-sm">
                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                            <span className={`text-sm font-bold ${item.color} px-3 py-1 rounded-lg`}>{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Phone - Stats */}
                <div className="absolute -right-4 top-32 bg-white rounded-3xl shadow-xl p-4 w-40 transform hover:scale-105 transition-transform duration-500 hidden lg:block">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 text-white">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    <p className="text-xs mb-1">Monthly Report</p>
                    <p className="text-xl font-bold">+23%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-4">
          <div className="text-center mb-16">
            <p className="text-emerald-500 font-semibold mb-3">POWERFUL FEATURES</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Powerful Features to Take Control<br />of Your Finances
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover an intuitive, powerful financial management platform that adapts to your lifestyle and helps you reach your financial goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Expense Tracking',
                description: 'Track your daily expenses easily and manage spending habits with our intuitive categorization system.',
                delay: '0'
              },
              {
                icon: PieChart,
                title: 'Budget Planning',
                description: 'Set budget targets for your expenses and never go over budget again with smart alerts and insights.',
                delay: '200'
              },
              {
                icon: Shield,
                title: 'Multi-Account Support',
                description: 'Manage all your bank accounts in one place. View consolidated reports and track your entire portfolio.',
                delay: '400'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className={`group bg-gray-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-500 hover:-translate-y-2 animate-fadeInUp`}
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-emerald-600 group-hover:to-emerald-500 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-emerald-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-emerald-500/50 hover:shadow-xl hover:scale-105">
              Explore All Features
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Phone Mockup - Transactions */}
            <div
              className={`order-2 lg:order-1 transition-all duration-1000 transform ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
            >
              <div className="relative mx-auto max-w-sm">
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-3 transform hover:scale-105 transition-transform duration-500">
                  <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2rem] p-6 h-[600px] relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl"></div>

                    <div className="pt-8 text-white">
                      <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Transactions</h2>
                        <span className="text-sm bg-white/20 px-4 py-2 rounded-full">This week</span>
                      </div>

                      <div className="space-y-4">
                        {[
                          { name: 'Payroll', company: 'Spotify', amount: '$50.00', color: 'bg-green-400' },
                          { name: 'Food & Coffee', company: 'Starbucks', amount: '$28.00', color: 'bg-pink-400' },
                          { name: 'EB & Net', company: 'Electric Co.', amount: '$15.00', color: 'bg-blue-400' },
                          { name: 'Payroll', company: 'Google', amount: '$62.00', color: 'bg-green-400' }
                        ].map((transaction, i) => (
                          <div
                            key={i}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 hover:bg-white/20 transition-colors duration-300"
                          >
                            <div className={`w-12 h-12 ${transaction.color} rounded-xl flex items-center justify-center`}>
                              <CreditCard className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{transaction.name}</p>
                              <p className="text-sm opacity-80">{transaction.company}</p>
                            </div>
                            <p className="font-bold text-lg">{transaction.amount}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div
              className={`order-1 lg:order-2 transition-all duration-1000 delay-300 transform ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
            >
              <p className="text-emerald-500 font-semibold mb-3">SIMPLE SETUP</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Manage Your Finances in<br />3 Simple Steps
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Getting started with financial freedom has never been easier. Follow these simple steps to take control today.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Smartphone,
                    title: 'Create Your Free Account in Minutes',
                    description: 'Get started quickly with our simple signup process. No credit card required.'
                  },
                  {
                    icon: CreditCard,
                    title: 'Set Smart Reports Instantly',
                    description: 'Connect your accounts and get instant insights into your spending patterns.'
                  },
                  {
                    icon: CheckCircle2,
                    title: 'Track Spending & Stay on Budget',
                    description: 'Monitor your expenses in real-time and receive alerts when you approach your limits.'
                  }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-emerald-600 group-hover:to-emerald-500 transition-all duration-300">
                      <step.icon className="w-6 h-6 text-emerald-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-8 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-emerald-500/50 hover:shadow-xl hover:scale-105">
                Start Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Why Thousands Trust Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <p className="text-emerald-500 font-semibold mb-3">WHY THOUSANDS TRUST US</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Thousands Trust FinSight
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Eliminate time-consuming manual calculations and empower teams with advanced insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'Save Time on Manual Calculations',
                description: 'Automate complex financial calculations and spend more time on strategic planning instead of tedious number crunching.'
              },
              {
                icon: Calculator,
                title: 'Get Real-Time Financial Insights',
                description: 'Access up-to-date financial data and analytics instantly, enabling faster decision-making and better outcomes.'
              },
              {
                icon: FileCheck,
                title: 'Stay on Top of Budgets',
                description: 'Monitor your spending in real-time with smart alerts that keep you informed when you approach budget limits.'
              }
            ].map((trust, i) => (
              <div
                key={i}
                className="group bg-gray-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-8 text-center hover:border-emerald-500/40 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gradient-to-br group-hover:from-emerald-600 group-hover:to-emerald-500 transition-all duration-300">
                  <trust.icon className="w-8 h-8 text-emerald-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{trust.title}</h3>
                <p className="text-gray-400 leading-relaxed">{trust.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-emerald-500/50 hover:shadow-xl hover:scale-105">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-25">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We answered all the FAQ's you've always had, be sure to ask more in case of doubts
            </p>
          </div>

          {/* <div className="max-w-3xl mx-auto space-y-4"> */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                question: 'What services does FinSight offer?',
                answer: 'We offer a range of financial management services including expense tracking, budget planning, real-time financial insights, multi-account support, and automated calculations to help you achieve your financial goals.'
              },
              {
                question: 'How long does a typical project take?',
                answer: 'Setup is quick and easy. You can have your account fully configured and start tracking your finances within minutes. Most users complete their initial setup in under 10 minutes.'
              },
              {
                question: 'Can I see examples of your previous work?',
                answer: 'Yes! We have helped thousands of users achieve their financial goals. Check out our success stories and testimonials from satisfied customers who have transformed their financial management.'
              },
            //   {
            //     question: 'Can I see examples of your previous work?',
            //     answer: 'Yes! We have helped thousands of users achieve their financial goals. Check out our success stories and testimonials from satisfied customers who have transformed their financial management.'
            //   },
              {
                question: 'How do I get started with FinSight?',
                answer: 'Getting started is simple. Click the "Get Started" button, create your free account, connect your financial accounts, and you\'re ready to go. No credit card required for the basic plan.'
              },
            //   {
            //     question: 'What is your design process?',
            //     answer: 'We believe in user-centered design. Our intuitive interface was built based on feedback from thousands of users, ensuring a seamless experience that makes financial management feel effortless.'
            //   },
              {
                question: 'What industries do you work with?',
                answer: 'FinSight works with individuals, freelancers, small businesses, and enterprises across all industries. Whether you\'re managing personal finances or business accounts, our platform adapts to your needs.'
              },
              {
                question: 'How can I contact you?',
                answer: 'You can reach us through our contact form, email us at support@finsight.com, or use the live chat feature in your dashboard. Our support team is available 24/7 to assist you.'
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-gray-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-emerald-500/5 transition-colors duration-300"
                >
                  <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-emerald-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
