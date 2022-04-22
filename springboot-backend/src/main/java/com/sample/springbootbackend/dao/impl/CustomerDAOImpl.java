package com.sample.springbootbackend.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import com.sample.springbootbackend.dao.CustomerDAO;
import com.sample.springbootbackend.model.Customer;

@Repository
public class CustomerDAOImpl implements CustomerDAO {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	@Override
	public List<Customer> getCustomers() {
		String sql="select * from customers";
		return jdbcTemplate.query(sql, (rs,rowNo)->{
			return new Customer(rs.getLong("id"),rs.getString("first_name"),rs.getString("last_name"),rs.getString("email_id"), rs.getBoolean("active"));
		});
	}
	
	@Override
	public void deleteCustomerById(int customerId) {
		String SQL="DELETE FROM customer_table WHERE customer_id=?";
		int update = jdbcTemplate.update(SQL, customerId);
		if(update>0)
			System.out.println("Customer id deleted..");
	}

	@Override
	public List<Customer> getActiveCustomers(){
		String sql="select * from customers where active=true";
		return jdbcTemplate.query(sql, (rs,rowNum)->{
			return new Customer(rs.getLong("id"),rs.getString("first_name"),rs.getString("last_name"),rs.getString("email_id"),rs.getBoolean("active"));
		});
	}

	
	@Override
	public int getCustomersCount() {
		String sql = "SELECT COUNT(*) FROM customers;";
		return jdbcTemplate.queryForObject(sql, Integer.class);
		}
	
	
   
	@Override
	public void createCustomer(Customer customer) {
		int update=jdbcTemplate.update("INSERT INTO customers(first_name, last_name, email_id,active) VALUES(?,?,?,?)", customer.getFirstName(), customer.getLastName(), customer.getEmailId(),customer.getActive());
				if(update>0)
					System.out.println("Customer is created..");
	}

	@Override
	public void updateCustomer(Customer customer) {
		String sql="update customers set first_name=?,last_name=?,email_id=?,active=? where id=?";
		jdbcTemplate.update(sql,customer.getFirstName(),customer.getLastName(),customer.getEmailId(),customer.getActive(),customer.getId());
	}

	@Override
	public List<String> getAllFirstNames() {
		String sql="select first_name from customers";
		return jdbcTemplate.query(sql, (rs,rowNum)->{
			return new String(rs.getString("first_name"));
		});
	}

	@Override
	public List<String> getAllLastNames() {
		String sql="select last_name from customers";
		return jdbcTemplate.query(sql, (rs,rowNum)->{
			return new String(rs.getString("last_name"));
		});
	}

	@Override
	public List<String> getAllEmailIds() {
		String sql="select email_id from customers";
		return jdbcTemplate.query(sql, (rs,rowNum)->{
			return new String(rs.getString("email_id"));
		});
	}

	@Override
	public Customer getCustomerById(int id) {
		String sql="select * from customers where id=?";
		return jdbcTemplate.queryForObject(sql, (rs,rowNum)->(
			new Customer(rs.getLong("id"),rs.getString("first_name"),rs.getString("last_name"),rs.getString("email_id"),rs.getBoolean("active"))
		),id);
	}

	
}
