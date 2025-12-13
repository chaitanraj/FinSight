'use client';
import { useState, useEffect, useContext } from 'react';
import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  PieChart as PieChartIcon,
  Sparkles,
  ArrowUpRight,
  ShoppingCart,
  Coffee,
  Home,
  Plane,
  Film,
  Zap,
  Carrot,
  Apple
} from 'lucide-react';
import {
  Car,
  HeartPulse,
  HelpCircle
} from "lucide-react";
import AddExpenseModal from '@/components/AddExpenseModal/page'

const PieChart = ({ data, total }) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  
  if (!data || data.length === 0) {
    return (
      <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto flex items-center justify-center">
        <div className="w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full border-4 border-gray-800 flex items-center justify-center">
          <span className="text-gray-600 text-sm">No data yet</span>
        </div>
      </div>
    );
  }
  
  let currentAngle = -90;
  const segments = data.map((item, index) => {
    const percentage = (item.amount / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return {
      ...item,
      percentage,
      startAngle,
      angle,
      index
    };
  });
  
  const createArcPath = (startAngle, angle) => {
    const start = polarToCartesian(128, 128, 80, startAngle);
    const end = polarToCartesian(128, 128, 80, startAngle + angle);
    const largeArcFlag = angle > 180 ? 1 : 0;
    return `M 128 128 L ${start.x} ${start.y} A 80 80 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
  };
  
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };
  
  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto flex-shrink-0">
      <svg width="100%" height="100%" viewBox="0 0 256 256" className="mx-auto">
        <circle cx="128" cy="128" r="60" fill="#0a0f1a" />
        {segments.map((segment) => (
          <motion.path
            key={segment.index}
            d={createArcPath(segment.startAngle, segment.angle)}
            fill={segment.color}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: hoveredSegment === segment.index ? 0.8 : 1,
              scale: hoveredSegment === segment.index ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setHoveredSegment(segment.index)}
            onMouseLeave={() => setHoveredSegment(null)}
            className="cursor-pointer transition-all"
            style={{ transformOrigin: '128px 128px' }}
          />
        ))}
      </svg>
      <AnimatePresence>
        {hoveredSegment !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-4 py-2 rounded-lg border border-gray-700 pointer-events-none whitespace-nowrap"
          >
            <p className="text-sm font-medium text-white">{segments[hoveredSegment].category}</p>
            <p className="text-xs text-emerald-400">{segments[hoveredSegment].percentage.toFixed(1)}%</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ExpenseTypeCard = ({ icon: Icon, label, amount, color }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-4 hover:border-emerald-500/30 transition-all cursor-pointer"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${color} bg-opacity-10 flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-lg font-semibold text-white">${amount.toLocaleString()}</p>
        </div>
      </div>
      <ArrowUpRight className="w-4 h-4 text-gray-600" />
    </div>
  </motion.div>
);

const RecentExpenseRow = ({ date, merchant, amount, category, categoryColor }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}
    className="grid grid-cols-4 gap-4 p-4 rounded-lg border border-gray-800 hover:border-emerald-500/30 transition-all"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
        <Calendar className="w-5 h-5 text-emerald-400" />
      </div>
      <span className="text-gray-300">{date}</span>
    </div>
    <div className="flex items-center">
      <span className="text-white font-medium">{merchant}</span>
    </div>
    <div className="flex items-center">
      <span className="text-white font-semibold">${amount.toFixed(2)}</span>
    </div>
    <div className="flex items-center">
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}>
        {category}
      </span>
    </div>
  </motion.div>
);

export default function Dashboard({user,expenses=[]}) {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const categoryConfig = {
    Groceries: {
      color: "bg-purple-500",
      icon: Carrot,
      chartColor: "#16a34a"
    },
    Food: {
      color: "bg-lime-600",
      icon: Coffee,
      chartColor: "#10b981"
    },
    Transport: {
      color: "bg-yellow-500",
      icon: Car,
      chartColor: "#eab308"
    },
    Shopping: {
      color: "bg-blue-500",
      icon: ShoppingCart,
      chartColor: "#3b82f6"
    },
    Utilities: {
      color: "bg-orange-500",
      icon: Zap,
      chartColor: "#f97316"
    },
    Rent: {
      color: "bg-violet-600",
      icon: Home,
      chartColor: "#7c3aed"
    },
    Entertainment: {
      color: "bg-pink-500",
      icon: Film,
      chartColor: "#ec4899"
    },
    Health: {
      color: "bg-red-500",
      icon: HeartPulse,
      chartColor: "#ef4444"
    },
    Travel: {
      color: "bg-cyan-700",
      icon: Plane,
      chartColor: "#06b6d4"
    },
    Other: {
      color: "bg-teal-500",
      icon: HelpCircle,
      chartColor: "#6b7280"
    }
  };
  
   const stats = useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return {
        totalSpending: 0,
        monthlyChange: 0,
        categoryBreakdown: []
      };
    }
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});


    const breakdown = Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount,
      color: categoryConfig[category]?.chartColor || "#64748b"
    }));

    return {
      totalSpending: total,
      monthlyChange: 12.5,
      categoryBreakdown: breakdown
    };
  }, [expenses]);

  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  
  const aiInsights = [
    {
      type: 'warning',
      message: "You're spending 23% more on Shopping this month compared to last month",
      icon: TrendingUp
    },
    {
      type: 'success',
      message: "Great job! Your Food expenses are 15% below your budget",
      icon: TrendingDown
    },
    {
      type: 'info',
      message: "Consider setting aside $200 more this month to reach your savings goal",
      icon: Sparkles
    }
  ];

  return (
    <div>
      <nav className="border-b border-gray-800 backdrop-blur-xl sticky top-0 z-[50]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex mt-[2vh] items-center justify-between">
          <h1 className="text-2xl font-bold text-white ">Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddExpenseOpen(true)}
            className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-5 h-5 cursor-pointer" />
            Add Expense
          </motion.button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold text-white mb-2">Welcome back {user?.name || ""}!</h2>
          <p className="text-gray-400 text-lg">Here's a summary of your spending this month</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 shadow-2xl shadow-emerald-500/20 border border-emerald-400/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white/90 font-medium">Total Spending</h3>
                <DollarSign className="w-6 h-6 text-white/80" />
              </div>
              <p className="text-5xl font-bold text-white mb-4">
                ${stats.totalSpending.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${stats.monthlyChange >= 0 ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                  {stats.monthlyChange >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-red-200" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-200" />
                  )}
                  <span className={`text-sm font-semibold ${stats.monthlyChange >= 0 ? 'text-red-200' : 'text-green-200'}`}>
                    {Math.abs(stats.monthlyChange)}%
                  </span>
                </div>
                <span className="text-white/70 text-sm">from last month</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6 h-full">
              <h3 className="text-xl font-semibold text-white mb-6">Spending by Category</h3>
              <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-around gap-8">
                <PieChart data={stats.categoryBreakdown} total={stats.totalSpending} />

                {/* Dynamic Legend - switches to 2 columns when > 5 items */}
                <div className={`${stats.categoryBreakdown.length > 5
                  ? 'grid grid-cols-2 gap-x-8 gap-y-3'
                  : 'space-y-3'
                  }`}>
                  {stats.categoryBreakdown.map((item, index) => (
                    <motion.div
                      key={item.category}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3 hover:bg-gray-800/30 p-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">{item.category}</p>
                        <p className="text-xs text-gray-400">
                          ${item.amount.toFixed(2)} ({((item.amount / stats.totalSpending) * 100).toFixed(1)}%)
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-semibold text-white">FinSight-AI Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl border ${insight.type === 'warning'
                    ? 'bg-red-500/20 border-red-500/30'
                    : insight.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-blue-500/10 border-blue-500/30'
                    }`}
                >
                  <insight.icon className={`w-5 h-5 mb-3 ${insight.type === 'warning'
                    ? 'text-yellow-400'
                    : insight.type === 'success'
                      ? 'text-emerald-400'
                      : 'text-blue-400'
                    }`} />
                  <p className="text-sm text-gray-300 leading-relaxed">{insight.message}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Expense Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(categoryConfig).map(([category, config], index) => {
              const categoryAmount = stats.categoryBreakdown.find(c => c.category === category)?.amount || 0;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <ExpenseTypeCard
                    icon={config.icon}
                    label={category}
                    amount={categoryAmount}
                    color={config.color}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Expenses</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-600">
              {expenses.map((expense, index) => (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  <RecentExpenseRow
                    date={new Date(expense.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric"
                    })}
                    merchant={capitalize(expense.merchant)}
                    amount={expense.amount}
                    category={capitalize(expense.category)}
                    categoryColor={`${categoryConfig[expense.category]?.color} bg-opacity-20 text-white`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {isAddExpenseOpen && (
          <AddExpenseModal
            open={isAddExpenseOpen}
            onClose={() => setIsAddExpenseOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
