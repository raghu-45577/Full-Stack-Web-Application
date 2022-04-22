package com.sample.springbootbackend.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.sample.springbootbackend.model.Customer;

public class CustomerRowMapper implements RowMapper<Customer> {
	public Customer mapRow(ResultSet rs, int rowNum) throws SQLException {
		
		Customer customer = new Customer();
		customer.setEmailId(rs.getString("email_id"));
		customer.setFirstName(rs.getString("first_name"));
		customer.setLastName(rs.getString("last_name"));
		customer.setActive(rs.getBoolean("active"));
		return customer;
	}
}
	
	
	
	
	
	
	

	