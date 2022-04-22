import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserService from '../services/UserService'

function RemoveRoleComponent() {

    const [user,setUser]=useState({id:'',uname:'',password:'',roles:[]});
    const [role_id,setRole_id]=useState("");
    let navigate=useNavigate();
    let {id}=useParams();
    useEffect(()=>{
        UserService.getUserById(id).then(res=>{
            setUser(res.data);
        });
    },[id]);
    function inputHandler(e){
        setRole_id(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        UserService.removeRoleFromUser(id,role_id).then(res=>{
            navigate("/users");
        });
    }
    function cancel(){
        navigate("/users");
    }

    return (
        <div>
            <form>
                <br></br>
                    <div className="Container">
                        <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Remove Role</h3>
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
                                                {user.roles.map(role=>(
                                                    <option key={role.id} value={role.id}>{role.role}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <br></br>
                                            <button className="btn btn-success" onClick={(e)=>handleSubmit(e)} >Remove</button>
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

export default RemoveRoleComponent