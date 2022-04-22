package com.reshma.springbootbackend.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.anything;

import org.aspectj.lang.annotation.Before;
import org.junit.BeforeClass;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sample.springbootbackend.controller.CustomerController;
import com.sample.springbootbackend.exception.ResourceNotFoundException;
import com.sample.springbootbackend.model.Customer;
import com.sample.springbootbackend.repository.CustomerRepository;



@RunWith(SpringRunner.class)
@ContextConfiguration(classes=CustomerController.class)
public class CustomerControllerTest {
	@MockBean
	private ResourceNotFoundException rnc;
	@InjectMocks
	private CustomerController customerController;
	@Autowired
	private Customer customer;
	@MockBean
	private CustomerRepository customerRepository;
//	@Before
//	CustomerController customerController=new CustomerController();
//	@Before
//	 public void setup() { customerController = new CustomerController(id, customer); }
	

	@Test
	public void testGetAllCustomer() {
		
	}

	@Test
	public void testCreateCustomer() {
		fail("Not yet implemented");
	}

//	@Test
//	public void testGetCustomerById() {
//		doReturn()
//	}

	@Test
	public void testUpdateCustomer() {
		
		Customer customer=new Customer();
		customer.setFirstName("Raj");
		customer.setLastName("kumar");
		customer.setEmailId("raj@gmail.com");
		
		
//		customerController.updateCustomer(2, customer);
//		when(customerController.updateCustomer(Mockito.anyLong(), customer)).
	}

	@Test
	void testDeleteCustomer() {
		fail("Not yet implemented");
	}

}
