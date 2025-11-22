package com.example.spring.boot.coder;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employees")
@CrossOrigin("http://localhost:5173")
public class empController {

    @Autowired
    private Empservices empService;

    @GetMapping("/try")
    public List<Employee> getAllEmployees() {
        return empService.readAllData();
    }

    @PostMapping("/tryp")
    public String addEmployee(@RequestBody Employee emp) {
        return empService.createEmployee(emp);
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable int id) {
        return empService.getEmployeeById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployeeById(@PathVariable int id) {
        boolean deleted = empService.deleteEmpById(id);
        if (deleted) {
            return ResponseEntity.ok("Employee deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Employee not found with ID: " + id);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateEmployee(@PathVariable int id, @RequestBody Employee updatedEmp) {
        boolean updated = empService.updateEmployee(id, updatedEmp);
        if (updated) {
            return ResponseEntity.ok("Employee updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Employee not found with ID: " + id);
        }
    }
}
