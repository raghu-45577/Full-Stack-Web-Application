import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService'

function ListUserComponent() {

    const [users,setUsers]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        UserService.getAllUsers().then(res=>{
            setUsers(res.data);
        });
    },[]);

    function back(){
        navigate('/customers');
    }
    function addRole(id){
        navigate(`/add-role/${id}`);
    }
    function removeRole(id){
        navigate(`/remove-role/${id}`);
    }
  return (
    <div>
        <h2 className='text-center'>Users List</h2>
        <div className="container">
            <button className='btn btn-primary' onClick={back}>Back</button>
        </div>
        <br></br>

        <table className='table table-dark table-hover table-bordered'>
            <thead style={{position:"sticky"}}>
                <tr>
                    <th>User Name</th>
                    <th>User Roles</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user=>
                        <tr key={user.id}>
                            <td>{user.uname}</td>
                            <td>{user.roles.map(role=>
                                        <h6 key={role.id}>{role.role}</h6>
                                    )}
                            </td>
                            <td>
                                <button className='btn btn-primary' onClick={()=>addRole(user.id)}>Add Role</button>
                                <button className='btn btn-danger' onClick={()=>removeRole(user.id)} style={{marginLeft:"10px"}}>Remove Role</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListUserComponent