package com.sample.springbootbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sample.springbootbackend.model.Customer;

import java.util.List;
@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {
	List<Customer> findById(String id);
	}
	


