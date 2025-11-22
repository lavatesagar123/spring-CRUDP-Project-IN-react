package com.example.spring.boot.coder;

import java.util.List;

public interface Empservices {
    String createEmployee(Employee emp);
    List<Employee> readAllData();
    Employee getEmployeeById(int id);

     boolean deleteEmpById(int id);
         boolean updateEmployee(int id, Employee updatedEmp);
}
