package com.sample.springbootbackend.repository;

import org.springframework.data.repository.CrudRepository;

import com.sample.springbootbackend.model.Role;

public interface RoleRepository extends CrudRepository<Role, Integer>{
	public Role findByRole(String role);
}
