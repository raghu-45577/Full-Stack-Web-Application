package com.sample.springbootbackend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sample.springbootbackend.model.Role;
import com.sample.springbootbackend.model.User;
import com.sample.springbootbackend.repository.RoleRepository;
import com.sample.springbootbackend.repository.UserRepository;
@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class UserController {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private RoleRepository roleRepo;
	@Autowired
	private JdbcTemplate jdbcTemp;
	
	@RequestMapping(method=RequestMethod.GET,value="/users")
	public List<User> getAllUsers(){
		List<User>users=new ArrayList<User>();
		userRepo.findAll().forEach(users::add);
		return users;
	}
	@RequestMapping(method=RequestMethod.POST,value="/saveUser")
	public void addUser(@RequestBody User user) {
		userRepo.save(user);
	}
	@RequestMapping(method=RequestMethod.GET,value="/user/{uname}")
	public User findUserByName(@PathVariable String uname) {
		User user=userRepo.findByUname(uname);
		return user;
	}
	@RequestMapping(method=RequestMethod.GET,value="/roles/{role_name}")
	public Role getRoleByName(@PathVariable String role_name) {
		Role role=roleRepo.findByRole(role_name);
		return role;
	}
	
	@RequestMapping(method=RequestMethod.PUT,value="/users/{id}/roles/{role_name}")
	public void addRoleToUser(@PathVariable int id,@PathVariable String role_name) {
		Role role=roleRepo.findByRole(role_name);
		User user=userRepo.findById(id).get();
		user.addRole(role);
		userRepo.save(user);
	}
	
	@RequestMapping(method=RequestMethod.GET,value="/users/{id}")
	public User getUserById(@PathVariable int id) {
		return userRepo.findById(id).get();
	}
	
	@RequestMapping(method=RequestMethod.GET,value="/roles")
	public List<Role> getAllRoles(){
		List<Role>roles=new ArrayList<Role>();
		roleRepo.findAll().forEach(roles::add);
		return roles;
	}
	@RequestMapping(method=RequestMethod.POST,value="/saveRole")
	public void saveRole(@RequestBody Role role) {
		roleRepo.save(role);
	}

	@RequestMapping(method=RequestMethod.DELETE,value="/user/{user_id}/role/{role_id}")
	public void removeRole(@PathVariable int user_id,@PathVariable int role_id) {
		String sql="delete from user_role where user_id=? and role_id=?";
		jdbcTemp.update(sql,user_id,role_id);
	}
}
