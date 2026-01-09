import { motion } from "framer-motion";
import { TrendingUp, Calendar, IndianRupee, Tag } from "lucide-react";

const AnomalyDetails = ({ meta }) => {
  const { anomalyDays, anomalies, averageExpense } = meta;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <TrendingUp className="w-5 h-5 text-yellow-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">
            Spending Anomalies Detected
          </h3>
        </div>

        <p className="text-gray-300 leading-relaxed">
          <span className="text-yellow-400 font-semibold">{anomalyDays} days</span> showed unusual spending compared to your normal pattern.
        </p>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-emerald-900/20 to-emerald-800/10 border border-emerald-500/20 rounded-xl p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-300 text-md">
            <IndianRupee className="w-4 h-4" />
            <span>Average Daily Spend</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            ₹{averageExpense?.toLocaleString('en-IN')}
          </div>
        </div>
      </motion.div>

      <div className="space-y-2">
        <h4 className="text-md font-medium text-gray-200 uppercase tracking-wider">
          Unusual Days
        </h4>
        
        <div className="space-y-3">
          {anomalies.map((day, i) => {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="group border border-gray-800 hover:border-emerald-500/30 rounded-xl p-4 bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-200">
                      {new Date(day.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      ₹{day.amount?.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 pt-3 border-t border-gray-700/50">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                    <Tag className="w-3 h-3" />
                    <span>Category Breakdown</span>
                  </div>
                  
                  {day.categories.map((c, idx) => (
                    <div 
                      key={idx}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {c.category}
                      </span>
                      <span className="text-gray-300 font-medium">
                        ₹{c.amount?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-start gap-2 p-3 rounded-lg bg-gray-800/30 border border-gray-700/50"
      >
        <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
        <p className="text-xs text-gray-300 leading-relaxed">
          These anomalies are detected using machine learning analysis of your historical spending patterns and may indicate irregular expenses worth reviewing.
        </p>
      </motion.div>
    </div>
  );
};

export default AnomalyDetails;
