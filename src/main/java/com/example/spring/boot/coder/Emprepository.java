package com.example.spring.boot.coder;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Emprepository extends JpaRepository<Empentity, Integer> {
   
}
