package com.example.spring.boot.coder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpServiceImpl implements Empservices {

    @Autowired
    private Emprepository empRepository;

    @Override
    public String createEmployee(Employee empDto) {
        Empentity empEntity = new Empentity();
        BeanUtils.copyProperties(empDto, empEntity);
        empRepository.save(empEntity);
        return "Saved successfully";
    }

    @Override
    public List<Employee> readAllData() {
        List<Empentity> empEntities = empRepository.findAll();
        List<Employee> employees = new ArrayList<>();

        for (Empentity entity : empEntities) {
            Employee emp = new Employee();
            BeanUtils.copyProperties(entity, emp);
            employees.add(emp);
        }
        return employees;
    }

    @Override
    public boolean deleteEmpById(int id) {
        if (empRepository.existsById(id)) {
            empRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateEmployee(int id, Employee updatedEmp) {
        Optional<Empentity> optionalEmp = empRepository.findById(id);

        if (optionalEmp.isPresent()) {
            Empentity existingEmp = optionalEmp.get();

            // ✅ Update only if provided
            if (updatedEmp.getName() != null && !updatedEmp.getName().isEmpty()) {
                existingEmp.setName(updatedEmp.getName());
            }
            if (updatedEmp.getEmail() != null && !updatedEmp.getEmail().isEmpty()) {
                existingEmp.setEmail(updatedEmp.getEmail());
            }
            if (updatedEmp.getPhone() != 0) {
                existingEmp.setPhone(updatedEmp.getPhone());
            }

            empRepository.save(existingEmp);
            return true;
        }

        return false;
    }

    // ✅ Missing method implementation
    @Override
    public Employee getEmployeeById(int id) {
        Optional<Empentity> optionalEmp = empRepository.findById(id);

        if (optionalEmp.isPresent()) {
            Employee emp = new Employee();
            BeanUtils.copyProperties(optionalEmp.get(), emp);
            return emp;
        }

        return null; // or throw exception if preferred
    }
}
