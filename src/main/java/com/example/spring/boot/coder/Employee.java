package com.example.spring.boot.coder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    private int id;   
    private String name;
    private String email;
    private long phone;
}
