import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import AnomalyDetails from "./AnomalyDetails";
import { X } from "lucide-react";

const InsightModal = ({ insight, onClose }) => {
  useEffect(() => {
    if (insight) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [insight]);

  if (!insight) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[55] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950/30 rounded-2xl w-full max-w-3xl max-h-[75vh] relative border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 flex flex-col overflow-hidden"
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <motion.div
            className="absolute inset-0 opacity-30 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70 text-gray-400 hover:text-emerald-400 transition-all duration-200 backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/30 cursor-pointer"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          
          <div className="bg-gradient-to-r from-emerald-900/20 to-transparent p-6 border-b border-emerald-500/10 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                FinSightAI Insight Details
              </h2>
            </motion.div>
          </div>

         
          <div className="p-6 overflow-y-auto flex-1 modal-scroll">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {insight.type === "warning" && (
                <AnomalyDetails meta={insight.meta} />
              )}
            </motion.div>
          </div>
        </motion.div>

        
        <style jsx>{`
          .modal-scroll {
            /* Smooth scrolling behavior */
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }
          
          .modal-scroll::-webkit-scrollbar {
            width: 8px;
          }
          
          .modal-scroll::-webkit-scrollbar-track {
            background: rgba(17, 24, 39, 0.4);
            border-radius: 10px;
          }
          
          .modal-scroll::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, rgba(16, 185, 129, 0.4), rgba(16, 185, 129, 0.6));
            border-radius: 10px;
            border: 2px solid rgba(17, 24, 39, 0.4);
          }
          
          .modal-scroll::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, rgba(16, 185, 129, 0.6), rgba(16, 185, 129, 0.8));
          }

          /* Firefox scrollbar */
          .modal-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(16, 185, 129, 0.5) rgba(17, 24, 39, 0.4);
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default InsightModal;
