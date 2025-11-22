import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <motion.div 
      className="py-4 px-6 lg:px-12 glass-effect backdrop-blur-md"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.h2 
          className="text-white text-xl md:text-2xl font-bold flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-2xl">🏢</span>
          EMP Management System
        </motion.h2>
        
        <nav className="flex items-center gap-2 md:gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/"
              className="text-white px-4 py-2 rounded-xl transition-all text-sm md:text-base font-medium hover:bg-white/20 bg-white/10 flex items-center gap-2"
            >
              <span>🏠</span>
              Home
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="#"
              className="text-white px-4 py-2 rounded-xl transition-all text-sm md:text-base font-medium hover:bg-white/20 bg-white/10 flex items-center gap-2"
            >
              <span>ℹ️</span>
              About
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="#"
              className="text-white px-4 py-2 rounded-xl transition-all text-sm md:text-base font-medium hover:bg-white/20 bg-white/10 flex items-center gap-2"
            >
              <span>🚪</span>
              Logout
            </Link>
          </motion.div>
        </nav>
      </div>
    </motion.div>
  );
};

export default Navbar;