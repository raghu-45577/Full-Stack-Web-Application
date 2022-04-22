import React, {useContext, useEffect, useState } from 'react';
import ApprovedCustomerService from '../services/ApprovedCustomerService';
import TableScrollbar from 'react-table-scrollbar';
import './TableScroll.css'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import { context } from '../App';
import DeleteSuccess from '../modals/DeleteSuccess';
import ExportCsv from '../external/ExportCsv';

function ListCustomerComponent(){

    let isAdmin=false;
    let isProductOwner=false;
    let isBusinessAnalyst1=false;
    let isBusinessAnalyst2=false;


    const {user}=useContext(context);
    const {setUser}=useContext(context);
    const [remove,setRemove]=useState(false);

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
        else if(user.roles[i].role==="Product Owner"){
            isProductOwner=true;
            continue;
        }
        else if(user.roles[i].role==="Business Analyst 1"){
            isBusinessAnalyst1=true;
            continue;
        }
        else if(user.roles[i].role==="Business Analyst 2"){
            isBusinessAnalyst2=true;
            continue;
        }
    }


    const [approvedCustomers,setApprovedCustomers]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        ApprovedCustomerService.getCustomers().then((res)=>{
            setApprovedCustomers(res.data)
        });
    },[]);

    function editCustomer(id){
        navigate(`/update-customers/${id}`);

    }
    function deleteCustomer(e,id){
        e.preventDefault();
        ApprovedCustomerService.deleteCustomer(id).then(res=>{
            setRemove(true);
            setApprovedCustomers(approvedCustomers.filter(cust=>cust.id!==id));
        });
    }
    function viewCustomer(e,id){
        e.preventDefault();
        navigate(`/view-customers/${id}`);
    }

    function addCustomer(){
        navigate('/add-customers');
    }
    function backHome(){
        localStorage.clear();
        navigate('/home');
    }
    function approvalList(){
        navigate('/approval-list');
    }
    function getUsers(){
        navigate('/users');
    }
    function addUser(){
        navigate('/add-user');
    }
    function removeOnclick(){
        setRemove(false);
    }
        return (
            <div>
                <DeleteSuccess remove={remove} onclick={()=>removeOnclick()} />
               <h2 className="text-center">Customers List</h2>
               <div className='welcome'><h3>Welcome {user.uname}</h3></div>
               <div  className="container" >
                   {(isAdmin || isBusinessAnalyst1) && <button className="btn btn-primary" onClick={addCustomer}>Add Customer</button>}
                   <button className="btn btn-primary" style={{marginLeft:"10px"}} onClick={approvalList}>Approval List</button>
                   {isAdmin && <button className="btn btn-primary" style={{marginLeft:"10px"}} onClick={getUsers}>Users</button>}
                   {isAdmin && <button className="btn btn-primary" style={{marginLeft:"10px"}} onClick={addUser}>Add User</button>}
                   <button className="btn btn-primary" style={{marginLeft:"10px"}} onClick={backHome}>Logout</button>
               </div>
               <br></br>

               <div>
               <TableScrollbar rows={7}>
                   <table className="table table-dark  table-hover table-bordered">
                       <thead style={{position:"sticky"}}>
                           <tr >
                               <th>Customer First Name</th>
                               <th>Customer Last Name</th>
                               <th>Customer Email Id</th>
                               {!isBusinessAnalyst1 && <th> <center>Actions</center></th>}
                           </tr>
                       </thead>
                       
                       <tbody>
                           {
                               approvedCustomers.map(
                               approvedCustomer=>
                               <tr key={approvedCustomer.id}>
                                   <td>{approvedCustomer.firstName}</td>
                                   <td>{approvedCustomer.lastName}</td>
                                   <td>{approvedCustomer.emailId}</td>
                                   <td>
                                       {(isAdmin || isBusinessAnalyst2) && <button onClick={()=>editCustomer(approvedCustomer.id) }className="btn btn-info">Update</button>}
                                       {(isAdmin || isBusinessAnalyst2) && <button  style={{marginLeft:"10px"}}onClick={(e)=>deleteCustomer(e,approvedCustomer.id) }className="btn btn-danger">Delete</button>}
                                       {(isAdmin || isProductOwner || isBusinessAnalyst1) && <button style={{marginLeft:"10px"}}onClick={(e)=>viewCustomer(e,approvedCustomer.id) }className="btn btn-info">View</button>}
                                   </td>
                               </tr>
                               )
                           }
                       </tbody>
                   </table>
                   </TableScrollbar>
                   </div>
                   <div style={{marginLeft:"1150px"}}><ExportCsv title="customers.csv" customers={approvedCustomers}/></div>
            </div>
        );
    }

export default ListCustomerComponent;