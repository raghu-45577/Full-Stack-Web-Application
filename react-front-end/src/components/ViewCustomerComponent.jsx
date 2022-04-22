import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApprovedCustomerService from '../services/ApprovedCustomerService';

function ViewCustomerComponent(){
    const [customer,setCustomer]=useState({firstName:"",lastName:"",emailId:""});
    const navigate=useNavigate();
    const {id}=useParams();
    useEffect(()=>{
        ApprovedCustomerService.getApprovedCustomerById(id).then(res=>{
            setCustomer(res.data);
        })

    },[id]);
    function backPage(){
        navigate('/customers')
    }

        return (
            <div>
                <br></br>
                <button className="btn btn-info" onClick={backPage}>Back</button>
                <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">View Customer Details</h3>
                <div className="card-body">
                <div className="row">
                    <label>Customer First Name: {customer.firstName}</label>
                    
                </div>
                <div className="row">
                    <label>Customer Last Name: {customer.lastName} </label>
                    
                </div>
                <div className="row">
                    <label>Customer Email Id: {customer.emailId} </label>
                   
                </div>
            </div>
            </div>
            </div>
        );
    }

export default ViewCustomerComponent;