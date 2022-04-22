package com.sample.springbootbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sample.springbootbackend.model.ApprovedCustomer;
@Repository
public interface ApprovedCustomerRepository extends JpaRepository<ApprovedCustomer,Long>{

}
