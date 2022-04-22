import React, {useEffect, useState } from 'react';
import 'bootstrap';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, useParams } from 'react-router-dom';
import ApprovedCustomerService from '../services/ApprovedCustomerService';
import UpdateSuccess from '../modals/UpdateSuccess';
function UpdateCustomerComponent(){

    const [update,setUpdate]=useState(false);

    const [customer,setCustomer]=useState({firstName:"",lastName:"",emailId:""});
    const navigate=useNavigate();
    const {id}=useParams();
    
    useEffect(()=>{
        ApprovedCustomerService.getApprovedCustomerById(id).then(res=>{
            setCustomer(res.data);
        });
    },[id]);
    function handleSubmit(e,customer){
        e.preventDefault();
        ApprovedCustomerService.updateCustomer(customer,id).then(res=>{
            setUpdate(true);
        });     
    }
    function cancel(){
        navigate('/customers');
    }
    const inputHandler=(e)=>{
        setCustomer({...customer,[e.target.name]:e.target.value});
    }
    function updateOnclick(){
        setUpdate(false);
        navigate("/customers");
    }
        return (
            <div>
                <UpdateSuccess update={update} onclick={()=>{updateOnclick()}} />
                <br></br>
                <div className="Container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Customer</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input autoComplete="off" placeholder="First Name" name="firstName" className="form-control"
                                        value={customer.firstName} onChange={inputHandler}/>
                                        {customer.firstName}
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
                                        <div id="liveAlertPlaceholder"></div>
                                    <button  id="liveAlertBtn" className="btn btn-primary"  onClick={(e)=>handleSubmit(e,customer)}>Save</button>
                                    <button className="btn btn-danger" onClick={cancel} style={{marginLeft:"10px"}}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
export default UpdateCustomerComponent;