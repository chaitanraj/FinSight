import React, { useContext, useState } from 'react'
import { TrendingDown, TrendingUp, Sparkles, Type, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '@/context/AuthContext';
import AnomalyCard from '../AnomalyCard/AnomalyCard';
import InsightModal from '@/modals/InsightModals/InsightModal';

const MasterCard = () => {

  const[selectedInsight,setSelectedInsight]=useState(null);

  const INSIGHT_UI = {
    warning: {
      icon: AlertTriangle,
      bg: "bg-amber-500/10 border-amber-500/30",
      iconColor: "text-amber-400",
      sweep: "via-amber-400/10"
    },
    success: {
      icon: TrendingDown,
      bg: "bg-emerald-500/10 border-emerald-500/30",
      iconColor: "text-emerald-400",
      sweep: "via-emerald-400/10"
    },
    info: {
      icon: Info,
      bg: "bg-blue-500/10 border-blue-500/30",
      iconColor: "text-blue-400",
      sweep: "via-blue-400/10"
    }
  };

  const [aiInsights, setAiInsights] = useState([]);

  const addInsight = (insight) => {
    setAiInsights(prev => [...prev, insight]);
  };
  const { user } = useContext(AuthContext);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <AnomalyCard onInsight={addInsight} />
        <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white">FinSight-AI Insights</h3>
          </div>

          <AnimatePresence mode="wait">
            {aiInsights.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative flex flex-col items-center justify-center py-12 px-6"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(16, 185, 129, 0.2)',
                      '0 0 40px rgba(16, 185, 129, 0.4)',
                      '0 0 20px rgba(16, 185, 129, 0.2)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-emerald-500/5"
                />

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 mb-4"
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="relative"
                  >
                    <Sparkles className="w-12 h-12 text-emerald-400" />
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-full bg-emerald-400/30 blur-xl"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative z-10 text-center space-y-3"
                >
                  <motion.p
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-lg font-medium bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent"
                  >
                    FinSight AI is analyzing your data
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-400 text-sm"
                  >
                    Intelligent insights will appear here as patterns emerge
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-center gap-1 pt-2"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="w-2 h-2 rounded-full bg-emerald-400"
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="insights"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >{aiInsights.map((insight, index) => {
                const ui = INSIGHT_UI[insight.type];
                const Icon = ui.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    onClick={() => insight.meta && setSelectedInsight(insight)}
                    transition={{
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={{
                      scale: 1.03,
                      y: -4,
                      transition: { duration: 0.2 }
                    }}
                    className={`p-4 rounded-xl border relative overflow-hidden cursor-pointer ${ui.bg}`}
                  >
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        duration: 2,
                        delay: index * 0.3,
                        repeat: 0,
                      }}
                      className={`absolute inset-0 ${insight.type === 'warning'
                        ? 'bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent'
                        : insight.type === 'success'
                          ? 'bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent'
                          : 'bg-gradient-to-r from-transparent via-blue-400/10 to-transparent'
                        }`}
                    />

                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: index * 0.2,
                        repeat: 0,
                      }}
                    >
                      <Icon className={`w-5 h-5 mb-3 ${ui.iconColor}`} />
                    </motion.div>
                    {/* ***************2ND IDEA********************* */}
                    <div className="relative z-10 space-y-3">
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {insight.message}
                      </p>
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-700/50">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-yellow-400">
                            {insight.meta.anomalyDays}
                          </span>
                          <span className="text-xs text-gray-300">
                            unusual days detected
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="cursor-pointer absolute bottom-3 right-3 text-md text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors z-20"
                    >
                      <span>More info</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  {/* ************************************************ */}
                  </motion.div>
                );
              })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
       <InsightModal
      insight={selectedInsight}
      onClose={() => setSelectedInsight(null)}
    />
    </div>
  )
}

export default MasterCard;
