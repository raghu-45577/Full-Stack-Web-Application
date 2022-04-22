package com.sample.springbootbackend.dao;

import java.util.List;

import com.sample.springbootbackend.model.Customer;

public interface CustomerDAO {
	public abstract void createCustomer(Customer customer);
	public abstract void deleteCustomerById(int customerId);
	List<Customer> getActiveCustomers();
	public List<Customer> getCustomers();
	public abstract int getCustomersCount();
	void updateCustomer(Customer customer);
	List<String> getAllFirstNames();
	List<String> getAllLastNames();
	List<String> getAllEmailIds();
	Customer getCustomerById(int id);
}
