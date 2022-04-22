package com.sample.springbootbackend.repository;

import org.springframework.data.repository.CrudRepository;

import com.sample.springbootbackend.model.User;

public interface UserRepository extends CrudRepository<User, Integer>{
	
	public User findByUname(String uname);

}
