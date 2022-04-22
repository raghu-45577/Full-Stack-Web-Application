import React from 'react';
import { useNavigate } from 'react-router-dom';

function SuccessComponent(){
    const navigate=useNavigate();
    function home(){
        navigate('/home')
    }
        return (
            <div>
                <br></br>
                
                <div className="success">
                    <h2><center>Thank You for Registering!!</center></h2>
                    <br></br>
                    <div className="align-self-center mx-auto">
                        <button onClick={()=>home()}className="btn btn-primary position-relative text-center">Go Back To Home</button>
                    </div>
                </div>
            </div>
        );
    }

export default SuccessComponent;