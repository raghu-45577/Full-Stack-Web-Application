import React, { useEffect, useState } from 'react';
import CustomerService from '../services/CustomerService';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import FirstNameErr from '../modals/FirstNameErr';
import LastNameErr from '../modals/LastNameErr';
import InsertSuccess from '../modals/InsertSuccess';
import ApprovedCustomerService from '../services/ApprovedCustomerService';
import EmailErr from '../modals/EmailErr';
 

function AddCustomerComponent(){
    let email=new RegExp(/^[a-zA-Z0-9]{4,5}[@][a-z]{3,5}\.com$/);
    let fname=new RegExp(/^[A-Z]{1}[a-z]{3,9}$/);
    let lname=new RegExp(/^[A-Z]{1}[a-z]{3,9}$/);

    const [fnameModal,setFnameModal]=useState(false);
    const [lnameModal,setLnameModal]=useState(false);
    const [insert,setInsert]=useState(false);
    const [emailModal,setEmailModal]=useState(false);
    const [emails,setEmails]=useState([]);
    const [approvedEmails,setApprovedEmails]=useState([]);
    const [customer,setCustomer]=useState({firstName:"",lastName:"",emailId:""});

    let firstNameErr="First name should be atleast 4 characters long, must contain Alphabets only and only first character should be in upper case";
    let lastNameErr="Last name should be atleast 4 characters long, must contain Alphabets only and only first character should be in upper case";
    let emailIdErr="Email should be in a valid format and not null";

    const navigate=useNavigate();

    useEffect(()=>{
        CustomerService.getCustomerEmails().then(res=>{
            setEmails(res.data);
        });
        ApprovedCustomerService.getApprovedCustomersEmails().then(res=>{
            setApprovedEmails(res.data);
        });
    },[]);
    
    function handleSubmit(e){
        e.preventDefault();
        if(emails.includes(customer.emailId) || approvedEmails.includes(customer.emailId)){
            setEmailModal(true);
        }
        else{
            CustomerService.createCustomer(customer).then(res=>{
                setInsert(true);
            }); 
        }      
    }
    function validate(){ 
        return fname.test(customer.firstName) && lname.test(customer.lastName) && email.test(customer.emailId);
    }
    function cancel(){
        navigate('/customers');
    }
    function reset(){
        setCustomer({firstName:'',lastName:'',emailId:''});
    }

    function inputHandler(e){
        e.preventDefault();
        // setCustomer({...customer,[e.target.name]:e.target.value});
        switch(e.target.name){
            case 'firstName':
                setCustomer({...customer,firstName:e.target.value.replace(/[^A-Za-z]/g,'')});
                break;
            case 'lastName':
                if(!fname.test(customer.firstName)){
                    setFnameModal(true);
                }else{  
                    setCustomer({...customer,lastName:e.target.value.replace(/[^A-Za-z]/g,'')});
                }
                break;
            case 'emailId':
                if(!fname.test(customer.firstName)){
                    setFnameModal(true);
                }
                else{
                    if(!lname.test(customer.lastName)){
                        setLnameModal(true);
                    }
                    else{
                        setCustomer({...customer,emailId:e.target.value});
                    }
                }
                break;
            default:break;
        }
    }
    function successonclick(){
        setInsert(false);
        navigate("/customers");
    }
        return (
            <form>
                <InsertSuccess insert={insert} onclick={()=>successonclick()} />
                <EmailErr emailModal={emailModal} onclick={()=>{setEmailModal(false)}} />
            <br></br>
                <div className="Container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add Customer</h3>
                            <div className="card-body">                                   
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input autoComplete='new-firstName' placeholder="First Name" name="firstName" className="form-control"
                                        value={customer.firstName} pattern="^[A-Z]{1}[a-z]{3,9}$" onChange={(e)=>inputHandler(e)} />
                                        <span className='errmsg'>{firstNameErr}</span>
                                    </div>
                                    <FirstNameErr fnameModal={fnameModal} onclick={()=>{setFnameModal(false)}}/>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input autoComplete="new-lastName" placeholder="Last Name" name="lastName" className="form-control"
                                        value={customer.lastName} pattern="^[A-Z]{1}[a-z]{3,9}$" onChange={(e)=>inputHandler(e)} />
                                        <span className='errmsg'>{lastNameErr}</span>
                                    </div>
                                    <LastNameErr lnameModal={lnameModal} onclick={()=>{setLnameModal(false)}}/>
                                    <div className="form-group">
                                        <label>Email Id:</label>
                                        <input autoComplete="new-EmailId" placeholder="Email Id" name="emailId" className="form-control"
                                        value={customer.emailId} pattern="^[a-zA-Z0-9]{4,5}[@][a-z]{3,5}\.com$" onChange={(e)=>inputHandler(e)} />
                                        <span className='errmsg'>{emailIdErr}</span>
                                    </div>
                                    <div>
                                        <br></br>
                                        <button className="btn btn-success" disabled={!validate()}  onClick={(e)=>handleSubmit(e)} >Save</button>
                                        <button className="btn btn-danger" onClick={cancel} style={{marginLeft:"10px"}}>Cancel</button>
                                        <button className='btn btn-primary' onClick={reset} style={{marginLeft:"10px"}}>Reset</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>   
        );
}

export default AddCustomerComponent;