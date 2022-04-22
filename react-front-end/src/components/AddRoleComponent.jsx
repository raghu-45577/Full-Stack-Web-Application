import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DuplicateRoleModal from '../modals/DuplicateRoleModal';
import UserService from '../services/UserService'

function AddRoleComponent() {

    const [user,setUser]=useState({id:'',uname:'',password:'',roles:[]});
    const [roles,setRoles]=useState([]);
    const [roleUser,setRoleUser]=useState("");
    const [roleModal,setRoleModal]=useState(false);
    let navigate=useNavigate();
    let {id}=useParams();
    useEffect(()=>{
        UserService.getUserById(id).then(res=>{
            setUser(res.data);
        });
    },[id]);

    useEffect(()=>{
        UserService.getAllRoles().then(res=>{
            setRoles(res.data);
        });
    },[]);

    function handleSubmit(e){
        e.preventDefault();
        let i=0
        for(i;i<user.roles.length;i++){
            if(user.roles[i].role===roleUser){
                setRoleModal(true);
                break;
            }
        }
        if(i===user.roles.length){
            UserService.addRoleToUser(id,roleUser).then(res=>{
                navigate("/users");
            });
        }
    }
    function cancel(){
        navigate("/users");
    }
    function inputHandler(e){
        setRoleUser(e.target.value);
    }

  return (
    <div>
        <DuplicateRoleModal roleModal={roleModal} onclick={()=>setRoleModal(false)} />
        <form>
            <br></br>
                <div className="Container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add Role</h3>
                            <div className="card-body">                                   
                                    <div className="form-group">
                                        <label>User Name:</label>
                                        <input autoComplete="off" placeholder="User Name" name="uname" className="form-control"
                                        value={user.uname} disabled/>
                                    </div>
                                    <div className='from-group'>
                                        <label>Role:</label>
                                        <br></br>
                                        <select name="role" onChange={inputHandler}>
                                            <option value="">Select</option>
                                            {roles.map(role=>(
                                                <option key={role.id} value={role.role}>{role.role}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <br></br>
                                        <button className="btn btn-success" onClick={(e)=>handleSubmit(e)} >Save</button>
                                        <button className="btn btn-danger" onClick={cancel} style={{marginLeft:"10px"}}>Cancel</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
    </div>
  )
}

export default AddRoleComponent