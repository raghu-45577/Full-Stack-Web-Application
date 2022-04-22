package com.sample.springbootbackend.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.sample.springbootbackend.dao.CustomerDAO;
import com.sample.springbootbackend.model.Customer;

@Service

public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerDAO customerDAO;
	
	@Override
	public void createCustomer(Customer customer) {
		customerDAO.createCustomer(customer);
	}

	@Override
	public void deleteCustomerById(int customerId) {
		customerDAO.deleteCustomerById(customerId);
	}
	
	@Override
	public List<Customer> getActiveCustomers() {
		return customerDAO.getActiveCustomers();
		
	}
	
	@Override
	public List<Customer> getCustomers() {
		return customerDAO.getCustomers();
		
	}
	
	@Override
	public int getCustomersCount() {
		return customerDAO.getCustomersCount();
		
	}

	@Override
	public void updateCustomer(Customer customer) {
		customerDAO.updateCustomer(customer);
	}

	@Override
	public List<String> getAllFirstNames() {
		return customerDAO.getAllFirstNames();
	}

	@Override
	public List<String> getAllLastNames() {
		return customerDAO.getAllLastNames();
	}

	@Override
	public List<String> getAllEmailIds() {
		return customerDAO.getAllEmailIds();
	}

	@Override
	public Customer getCustomerById(int id) {
		return customerDAO.getCustomerById(id);
	}
	
	
}


