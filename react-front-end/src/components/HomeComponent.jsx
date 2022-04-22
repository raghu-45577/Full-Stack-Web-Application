import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeComponent(){
  
    let navigate=useNavigate();

    function addCustomer(){
        navigate('/save-customers');
    }
    function adminLogin(){
        navigate('/user-login');
    }
    return (
           <div>
               <h2><center>Roles</center></h2>

               <div className="row">
                    <div className="col-sm-6 row justify-content-center">
                    
                        <div className="card" style={{width: '18rem'}}>
                            <div className="card-body  text-center">
                                <img src="Admin.png" className="card-img-top" alt="Admin"/>
                                <button onClick={adminLogin} className="btn btn-primary"><center>User Login</center></button>
                            </div>
                        </div>
                    </div>
  
                    <div className="col-sm-6 row justify-content-center">
                    
                        <div className="card " style={{width: '18rem'}}>
                            <div className="card-body text-center">
                                <img src="Customer.jpg" className="card-img-top" alt="Customer"/>
                                <button onClick={addCustomer} className=" btn btn-primary">Customer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default HomeComponent;