import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import './App.css';
import Navbar from './component/Navbar';
import Empdata from './component/Empdata';
import Addemp from './component/Addemp';
import Updateemp from './component/Updateemp';

function AppContent() {
  const location = useLocation();
  
  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route 
              index 
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="container mx-auto px-4 py-8"
                >
                  <Empdata />
                </motion.div>
              } 
            />
            <Route 
              path="/" 
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="container mx-auto px-4 py-8"
                >
                  <Empdata />
                </motion.div>
              } 
            />
            <Route 
              path="/addemp" 
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="container mx-auto px-4 py-8"
                >
                  <Addemp />
                </motion.div>
              } 
            />
            <Route 
              path="/editemployee/:id" 
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="container mx-auto px-4 py-8"
                >
                  <Updateemp />
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
      <footer className="py-6 text-center text-white/80 text-sm">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} EMP Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;