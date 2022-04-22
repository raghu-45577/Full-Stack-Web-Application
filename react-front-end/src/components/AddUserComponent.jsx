import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UnameErr from '../modals/UnameErr';
import UserService from '../services/UserService';

function AddUserComponent() {
    let uname=new RegExp(/^[A-Z]{1}[a-z]{3,}$/);
    let pass=new RegExp(/[A-Z]+[a-z]+[0-9]+[!@#$%^&*()]+/);

    const [unameModal,setUnameModal]=useState(false);

    let userNameErr="User Name should atleast contains 4 characters long, contains only Alphabets and first character should be upper case";
    let passwordErr="Password should be atleast 4 characters long, atleast contain one upper case, lower case, numeric, special character{!@#$%^&*()} values except white spaces";

    const [user,setUser]=useState({uname:'',password:''});
    const navigate=useNavigate();

    function inputHandler(e){
        // setUser({...user,[e.target.name]:e.target.value});
        e.preventDefault();
        switch(e.target.name){
            case 'uname':
                setUser({...user,uname:e.target.value.replace(/[^A-Za-z]/g,'')});
                break;
            case 'password':
                if(!uname.test(user.uname)){
                    setUnameModal(true);
                }
                else{
                    setUser({...user,password:e.target.value.replace(/[^A-Za-z0-9!@#$%^&*()]/g,'')});
                }
                break;
            default:break; 
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        UserService.saveUser(user).then(res=>{
            navigate('/users');
        })
    }
    function validate(){
        
        return uname.test(user.uname) && pass.test(user.password);
    }
    function cancel(){
        navigate('/customers');
    }
    function reset(){
        setUser({uname:'',password:''});
    }
  return (
    <div>
        <form>
            <br></br>
            <UnameErr unameModal={unameModal} onclick={()=>setUnameModal(false)} />
                <div className="Container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add User</h3>
                            <div className="card-body">                                   
                                    <div className="form-group">
                                        <label>User Name:</label>
                                        <input autoComplete="off" placeholder="User Name" name="uname" className="form-control"
                                        value={user.uname} onChange={inputHandler} pattern="^[A-Z]{1}[a-z]{3,}$"/>
                                        <span className='errmsg'>{userNameErr}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input autoComplete="off" placeholder="Password" name="password" className="form-control"
                                        type="password" value={user.password} onChange={inputHandler} pattern="[A-Z]+[a-z]+[0-9]+[!@#$%^&*()]+"/>
                                        <span className='errmsg'>{passwordErr}</span>
                                    </div>
                                    <div>
                                        <br></br>
                                        <button className="btn btn-success "  disabled={!validate()} onClick={(e)=>handleSubmit(e)} >Save</button>
                                        <button className="btn btn-danger" onClick={cancel} style={{marginLeft:"10px"}}>Cancel</button>
                                        <button className='btn btn-primary' onClick={reset} style={{marginLeft:"10px"}}>Reset</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
    </div>
  )
}

export default AddUserComponent