import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Employeeservice from '../service/Employeeservice';
import { motion, AnimatePresence } from 'framer-motion';

const Empdata = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Employeeservice.getAllEmployees()
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch employees:", error);
        setLoading(false);
      });
  }, []);

  const deleteEmployee = (e, id) => {
    e.preventDefault();
    if (!id) {
      console.error("Delete failed: Invalid ID");
      return;
    }
    Employeeservice.deleteEmployeeByid(id)
      .then(() => {
        setEmployee((prev) => prev.filter((emp) => emp.id !== id));
      })
      .catch((error) => {
        console.error("Failed to delete:", error);
      });
  };

  const editemployee = (e, id) => {
    e.preventDefault();
    navigate(`/editemployee/${id}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div 
      className="min-h-screen py-8 px-4 md:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Employee Directory
            </motion.h1>
            <motion.p 
              className="text-white/80 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Manage your team members and their information
            </motion.p>
          </div>
          
          <motion.button
            onClick={() => navigate("/addemp")}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
          >
            <span className="text-xl">+</span>
            Add New Employee
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="glass-effect rounded-2xl p-6 text-center">
            <h3 className="text-3xl font-bold text-white">{employee.length}</h3>
            <p className="text-white/80 mt-2">Total Employees</p>
          </div>
          <div className="glass-effect rounded-2xl p-6 text-center">
            <h3 className="text-3xl font-bold text-white">{employee.filter(emp => emp.email).length}</h3>
            <p className="text-white/80 mt-2">With Email</p>
          </div>
          <div className="glass-effect rounded-2xl p-6 text-center">
            <h3 className="text-3xl font-bold text-white">{employee.filter(emp => emp.phone).length}</h3>
            <p className="text-white/80 mt-2">With Phone</p>
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="modern-table rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <th className="px-6 py-4 text-left text-white font-semibold text-sm md:text-base">Name</th>
                  <th className="px-6 py-4 text-left text-white font-semibold text-sm md:text-base hidden md:table-cell">Phone</th>
                  <th className="px-6 py-4 text-left text-white font-semibold text-sm md:text-base hidden lg:table-cell">Email</th>
                  <th className="px-6 py-4 text-center text-white font-semibold text-sm md:text-base">Actions</th>
                </tr>
              </thead>
              {!loading && (
                <tbody className="bg-white/90">
                  <AnimatePresence>
                    {employee.map((emp, index) => (
                      <motion.tr
                        key={emp.id}
                        className="border-b border-gray-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4 text-gray-800 font-semibold">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              {emp.name.charAt(0).toUpperCase()}
                            </div>
                            <span>{emp.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 hidden md:table-cell">
                          {emp.phone || <span className="text-gray-400">Not provided</span>}
                        </td>
                        <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">
                          {emp.email || <span className="text-gray-400">Not provided</span>}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2 md:gap-3">
                            <motion.button
                              onClick={(e) => editemployee(e, emp.id)}
                              className="bg-gradient-to-r from-green-500 to-green-600 text-white font-medium cursor-pointer px-4 py-2 rounded-lg transition-all text-sm flex items-center gap-1 shadow-md hover:shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span>✏️</span>
                              <span className="hidden sm:inline">Edit</span>
                            </motion.button>
                            <motion.button
                              onClick={(e) => deleteEmployee(e, emp.id)}
                              className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium cursor-pointer px-4 py-2 rounded-lg transition-all text-sm flex items-center gap-1 shadow-md hover:shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span>🗑️</span>
                              <span className="hidden sm:inline">Delete</span>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              )}
              {loading && (
                <tbody>
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center bg-white/90 info-cell">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"
                      />
                      <p className="mt-4 text-gray-600 font-medium">Loading employees...</p>
                    </td>
                  </tr>
                </tbody>
              )}
              {!loading && employee.length === 0 && (
                <tbody>
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center bg-white/90 info-cell">
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-6xl">📭</span>
                        <p className="text-gray-600 text-lg font-semibold">
                          No employees found
                        </p>
                        <p className="text-gray-500 text-sm">
                          Add your first employee to get started
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Empdata;