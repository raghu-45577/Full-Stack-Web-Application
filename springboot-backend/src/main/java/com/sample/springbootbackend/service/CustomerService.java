package com.sample.springbootbackend.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;

import com.sample.springbootbackend.model.Customer;

public interface CustomerService {
	
	void createCustomer(Customer customer);
	int getCustomersCount();
	void deleteCustomerById(int customerId);
	List<Customer> getActiveCustomers();
	List<Customer> getCustomers();
	void updateCustomer(Customer customer);
	List<String> getAllFirstNames();
	List<String> getAllLastNames();
	List<String> getAllEmailIds();
	Customer getCustomerById(int id);
	
}