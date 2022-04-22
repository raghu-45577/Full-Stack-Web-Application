package com.reshma.springbootbackend;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;

import com.sample.springbootbackend.SpringbootBackendApplication;
import com.sample.springbootbackend.controller.CustomerController;
@SpringBootTest(classes=SpringbootBackendApplication.class)
public class SpringbootBackendApplicationTest {
	@Autowired
	CustomerController controller;
	@Test
	public void contexLoads() throws Exception {
		Assertions.assertNotNull(controller);
	}
	
	@Test
	public void test() {
		SpringbootBackendApplication.main(new String[] {
				"--spring.main.web-environment=false",
				"--spring.autoconfigure.exclude=blahblahblah",
				"--server.servlet.custom-context-path=/"
		});
		Assertions.assertNotNull(this);
	}

}