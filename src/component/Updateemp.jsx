import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Employeeservice from '../service/Employeeservice';
import { motion } from 'framer-motion';

const Updateemp = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    Employeeservice.getEmployeeById(id)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const updateEmployee = (e) => {
    e.preventDefault();
    Employeeservice.updateEmployee(id, employee)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setEmployee({ id: '', name: '', email: '', phone: '' });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="max-w-2xl w-full modern-card rounded-2xl overflow-hidden"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">✏️</span>
            Update Employee
          </h3>
          <p className="text-white/80 text-sm mt-1">
            Modify employee information
          </p>
        </motion.div>

        {/* Form */}
        <motion.div 
          className="bg-white/90 p-8 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <motion.input
                value={employee.name}
                onChange={handleChange}
                placeholder="Enter employee name"
                type="text"
                name="name"
                className="modern-input rounded-xl"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <motion.input
                value={employee.email}
                onChange={handleChange}
                placeholder="Enter email address"
                type="email"
                name="email"
                className="modern-input rounded-xl"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <motion.input
                value={employee.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                type="tel"
                name="phone"
                className="modern-input rounded-xl"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          className="bg-gray-50/50 px-8 pb-8 pt-6 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={updateEmployee}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>✅</span>
            Update Employee
          </motion.button>
          <motion.button
            onClick={reset}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>🔄</span>
            Clear Form
          </motion.button>
          <motion.button
            onClick={() => navigate('/')}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>↩️</span>
            Cancel
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Updateemp;