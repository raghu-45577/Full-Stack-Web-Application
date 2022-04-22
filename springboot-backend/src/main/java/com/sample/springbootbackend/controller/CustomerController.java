package com.sample.springbootbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sample.springbootbackend.exception.ResourceNotFoundException;
import com.sample.springbootbackend.model.Customer;
import com.sample.springbootbackend.repository.CustomerRepository;
import com.sample.springbootbackend.service.CustomerService;
@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class CustomerController {
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private CustomerService customerService;
	
	@GetMapping("/customers")
	public List<Customer> getCustomers(){
		return customerService.getCustomers();
	}
	
	@GetMapping("/customersCount")
	public int getCustomersCount(){
		return customerService.getCustomersCount();
	}
	
	
	@RequestMapping(method=RequestMethod.POST,value="/createCustomer")
	public void createCustomer(@RequestBody Customer customer) {
		customerService.createCustomer(customer);
	}
	
	@RequestMapping(method=RequestMethod.GET,value="/getActiveCustomers")
	public List<Customer> getActiveCustomers(){
		return customerService.getActiveCustomers();
	}
	//Delete Customer rest api
	@DeleteMapping("/customers/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteCustomer(@PathVariable Long id){
		Customer customer=customerRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Customer not exist with the id:"+id));
		customerRepository.delete(customer);
		Map<String,Boolean> response=new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	@RequestMapping(method=RequestMethod.PUT,value="/updateCustomer")
	public void updateCustomer(@RequestBody Customer customer) {
		customerService.updateCustomer(customer);
	}
	
	@RequestMapping(method=RequestMethod.GET,value="/firstNames")
	public List<String> getAllFirstNames(){
		return customerService.getAllFirstNames();
	}
	
	@RequestMapping(method=RequestMethod.GET,value="/lastNames")
	public List<String> getAllLastNames(){
		return customerService.getAllLastNames();
	}
	
	@RequestMapping(method=RequestMethod.GET,value="/customers/emailIds")
	public List<String> getAllEmailIds(){
		return customerService.getAllEmailIds();
	}
	
	@RequestMapping(method=RequestMethod.GET,value="/customers/{id}")
	public Customer getCustomerById(@PathVariable int id) {
		return customerService.getCustomerById(id);
	}
	
	
}
