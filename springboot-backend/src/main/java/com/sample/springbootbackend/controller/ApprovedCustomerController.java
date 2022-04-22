package com.sample.springbootbackend.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sample.springbootbackend.exception.ResourceNotFoundException;
import com.sample.springbootbackend.model.ApprovedCustomer;
import com.sample.springbootbackend.model.Customer;
import com.sample.springbootbackend.repository.ApprovedCustomerRepository;
import com.sample.springbootbackend.repository.CustomerRepository;
@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v1")

public class ApprovedCustomerController {
	@Autowired
	private ApprovedCustomerRepository approvedCustomerRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	@GetMapping("/approvedcustomers")
	public List<ApprovedCustomer> getAllCustomer(){
		return approvedCustomerRepository.findAll();
		
	}
	@PostMapping("/approvedcustomers")
	public ApprovedCustomer createCustomer(@RequestBody ApprovedCustomer customer) {
		return approvedCustomerRepository.save(customer);
	}
	@GetMapping("/approvedcustomers/{id}")
	public ResponseEntity<ApprovedCustomer> getCustomerById(@PathVariable Long id) {
		ApprovedCustomer customer=approvedCustomerRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Customer not exist with the id:"+id));
		return ResponseEntity.ok(customer);
	}
	
	//Update employee rest api
	@PutMapping("/approvedcustomers/{id}")
	public ResponseEntity<ApprovedCustomer> updateCustomer(@PathVariable long id,@RequestBody ApprovedCustomer customerDetails){
		ApprovedCustomer customer=approvedCustomerRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Customer not exist with the id:"+id));
		customer.setFirstName(customerDetails.getFirstName());
		customer.setLastName(customerDetails.getLastName());
		customer.setEmailId(customerDetails.getEmailId());
		ApprovedCustomer updatedCustomer=approvedCustomerRepository.save(customer);
		return ResponseEntity.ok(updatedCustomer);
	}
	//Delete Customer rest api
	@DeleteMapping("/approvedcustomers/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteCustomer(@PathVariable Long id){
		ApprovedCustomer customer=approvedCustomerRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Customer not exist with the id:"+id));
		approvedCustomerRepository.delete(customer);
		Map<String,Boolean> response=new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	@RequestMapping("/approvedcustomers/emails")
	public List<String> getEmails(){
		String sql="select email_id from approvedcustomers";
		return jdbcTemplate.query(sql, (rs,rowNum)->{
			return new String(rs.getString("email_id"));
		});
	}
}
