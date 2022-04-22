import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useNavigate } from "react-router-dom";
import "./Login.css";
import UserService from "../services/UserService";
import { context } from "../App";
import UnameLoginErr from "../modals/UnameLoginErr";
function Login() {
  const {user}=useContext(context);
  const {setUser}=useContext(context);
  const [password, setPassword] = useState("");
  const [name,setName]=useState("");
  const [unameModal,setUnameModal]=useState(false);
  let navigate = useNavigate();

  function validateForm() {
    return name===user.uname && name!=="" &&password===user.password;
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/customers");
  }

  function inputHandler(e){
    e.preventDefault();
    if(name===""){
      setUnameModal(true);
    }
    else{
      setPassword(e.target.value);
      UserService.getUserByName(name).then(res=>{
        setUser(res.data);
      });
    }
  }

  return (
    <div className="Login">
      <UnameLoginErr unameModal={unameModal} onclick={()=>setUnameModal(false)} />
      <Form onSubmit={handleSubmit}>
        <h2><center>User Login</center></h2>
        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => inputHandler(e)}
          />
        </Form.Group>
        <br/>
        <center><Button block-size="lg" type="submit" disabled={!validateForm()} >
          Login
        </Button></center>
      </Form>
    </div>
  );
}

export default Login