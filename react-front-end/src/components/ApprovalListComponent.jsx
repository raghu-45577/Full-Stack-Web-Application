import React, { useContext, useEffect, useState } from 'react';
import ApprovedCustomerService from '../services/ApprovedCustomerService';
import CustomerService from '../services/CustomerService';
import 'bootstrap';
import { useNavigate } from 'react-router-dom';
import { context } from '../App';
import DeleteSuccess from '../modals/DeleteSuccess';
import ApprovedSuccess from '../modals/ApprovedSuccess';
import ExportCsv from '../external/ExportCsv';

function ApprovalListComponent(){

    const [remove,setRemove]=useState(false);
    const [approved,setApproved]=useState(false);

    let isAdmin=false;
    let isBusinessAnalyst1=false;
    let isBusinessAnalyst2=false;

    const {user}=useContext(context);
    const {setUser}=useContext(context);
    useEffect(()=>{
        const data=localStorage.getItem('current-user');
        if(data){
            setUser(JSON.parse(data));
        }
    },[setUser]);

    useEffect(()=>{
        localStorage.setItem('current-user',JSON.stringify(user));
    },[user]);

    for(let i=0;i<user.roles.length;i++){
        if(user.roles[i].role==="Admin"){
            isAdmin=true;
            continue;
        }
        else if(user.roles[i].role==="Business Analyst 1"){
            isBusinessAnalyst1=true;
            continue;
        }
        else if(user.roles[i].role==="Business Analyst 2"){
            isBusinessAnalyst2=true;
        }

    }
    const [customers,setCustomers]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        CustomerService.getCustomers().then((res)=>{
            setCustomers(res.data)
        });
    },[]);

    function deleteCustomer(e,id){
        e.preventDefault();
        CustomerService.deleteCustomer(id).then(res=>{
            setRemove(true);
            setCustomers(customers.filter(cust=>cust.id!==id));
        })
    }
    function backHome(){
        navigate('/customers');
    }
    function approve(e,customer){
        e.preventDefault();
       
        let customer1= 
        {firstName:customer.firstName,lastName:customer.lastName,emailId:customer.emailId};
        ApprovedCustomerService.createCustomer(customer1).then(res=>{
            setApproved(true);
        });
    }
    function removeOnclick(){
        setRemove(false);
    }
    function approveOnclick(customer){
        setApproved(false);
        navigate("/customers");
        CustomerService.deleteCustomer(customer.id);
    }
        return (
            <div>
                <DeleteSuccess remove={remove} onclick={()=>removeOnclick()} />
                <div>
               <h2 className="text-center">Customers List</h2>
               <div  className="container" >
                   
                   <button className="btn btn-primary" style={{marginLeft:"10px"}} onClick={backHome}>Back</button>
               </div>
               <br></br>
               <div className="row">
                   <table className="table table-dark  table-hover table-bordered">
                       <thead>
                           <tr>
                               <th>Customer First Name</th>
                               <th>Customer Last Name</th>
                               <th>Customer Email Id</th>
                               {(isBusinessAnalyst2 || isAdmin || isBusinessAnalyst1)  && <th>Actions</th>}
                           </tr>
                       </thead>
                       <tbody>
                           {
                               customers.map(
                               customer=>
                               <tr key={customer.id}>
                                   <td>{customer.firstName}</td>
                                   <td>{customer.lastName}</td>
                                   <td>{customer.emailId}</td>
                                   {(isAdmin || isBusinessAnalyst2 || isBusinessAnalyst1) && <td>
                                    <ApprovedSuccess approved={approved} onclick={()=>approveOnclick(customer)} />
                                       {!isBusinessAnalyst2 && <button onClick={(e)=>approve(e,customer) }className="btn btn-info">Approve</button>}
                                       {(isBusinessAnalyst2 || isAdmin || isBusinessAnalyst1) && <button style={{marginLeft:"10px"}}onClick={(e)=>deleteCustomer(e,customer.id) }className="btn btn-danger">Decline</button>}
                                       
                                   </td>}
                               </tr>
                               )
                           }
                       </tbody>
                   </table>
                   </div>
            </div>
            <div style={{marginLeft:"1150px"}}><ExportCsv customers={customers}/></div>
            </div>
        );
    }


export default ApprovalListComponent;