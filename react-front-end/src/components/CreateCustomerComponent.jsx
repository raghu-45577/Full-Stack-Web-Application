import React, { useState } from 'react';
import CustomerService from '../services/CustomerService';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import InsertSuccess from '../modals/InsertSuccess';


function CreateCustomerComponent(){
    const [customer,setCustomer]=useState({firstName:"",lastName:"",emailId:""});
    const navigate=useNavigate();
    const [insert,setInsert]=useState(false);
    
    function handleSubmit(e){
        e.preventDefault();
        CustomerService.createCustomer(customer).then(res=>{
            setInsert(true);
        });
    }
    function cancel(){
        navigate('/home');
    }
    const inputHandler=(e)=>{
        setCustomer({...customer,[e.target.name]:e.target.value});
    }
    function insertOnclick(){
        setInsert(false);
        navigate("/success");
    }
        return (
            <form>
            <br></br>
            <InsertSuccess insert={insert} onclick={()=>{insertOnclick()}} />
                <div className="Container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add Customer</h3>
                            <div className="card-body">                                   
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input autoComplete="off" placeholder="First Name" name="firstName" className="form-control"
                                        value={customer.firstName} onChange={inputHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input autoComplete="off" placeholder="Last Name" name="lastName" className="form-control"
                                        value={customer.lastName} onChange={inputHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email Id:</label>
                                        <input autoComplete="off" placeholder="Email Id" name="emailId" className="form-control"
                                        value={customer.emailId} onChange={inputHandler}/>
                                    </div>
                                    <div>
                                        <br></br>
                                        <button className="btn btn-success "   onClick={(e)=>handleSubmit(e)} >Save</button>
                                        <button className="btn btn-danger" onClick={cancel} style={{marginLeft:"10px"}}>Cancel</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>   
        );
}

export default CreateCustomerComponent;