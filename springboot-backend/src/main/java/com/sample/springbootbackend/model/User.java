package com.sample.springbootbackend.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.JoinColumn;

@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String uname;
	private String password;
	
	@ManyToMany(cascade=CascadeType.ALL)
	@JoinTable(name="User_Role",
	joinColumns = @JoinColumn(name="user_id"),
	inverseJoinColumns = @JoinColumn(name="role_id"))
	private Set<Role>roles;
	
	public User() {
		
	}

	public User(int id,String uname, String password, Set<Role> roles) {
		super();
		this.id=id;
		this.uname = uname;
		this.password = password;
		this.roles=roles;
	}
	
	



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	
	public void addRole(Role role) {
		this.roles.add(role);
		role.getUsers().add(this);
	}
//	public void removeRole(String role_name) {
//		Role role=this.roles.stream().filter(r->r.getRole().equals(role_name)).findFirst().get();
//		this.roles.remove(role);
//		role.getUsers().remove(this);
	//}
	
	

}
