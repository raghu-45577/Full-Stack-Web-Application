import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/UserLoginComponent';
import HomeComponent from './components/HomeComponent';
import ListCustomerComponent from './components/ListCustomerComponent';
import "bootstrap/dist/css/bootstrap.min.css";
import ApprovalListComponent from './components/ApprovalListComponent';
import UpdateCustomerComponent from './components/UpdateCustomerComponent';
import AddCustomerComponent from './components/AddCustomerComponent';
import CreateCustomerComponent from './components/CreateCustomerComponent';
import ViewCustomerComponent from './components/ViewCustomerComponent';
import HeaderComponent from './components/HeaderComponent';
import SuccessComponent from './components/SuccessComponent';
import { createContext, useState } from 'react';
import ListUserComponent from './components/ListUserComponent';
import AddUserComponent from './components/AddUserComponent';
import FooterComponent from './components/FooterComponent';
import AddRoleComponent from './components/AddRoleComponent';
import RemoveRoleComponent from './components/RemoveRoleComponent';

export const context=createContext({user:{id:'',uname:'',password:'',roles:[]},setUser:()=>{}});

function App() {

  const [user,setUser]=useState({id:'',uname:'',password:'',roles:[]});
  return (
    <div>
      <HeaderComponent />
      <BrowserRouter>
      <context.Provider value={{user,setUser}}>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/user-login" element={<Login />} />
          <Route path="/customers" element={<ListCustomerComponent />} />
          <Route path="/approval-list" element={<ApprovalListComponent />} />
          <Route path="/update-customers/:id" element={<UpdateCustomerComponent />} />
          <Route path="/add-customers" element={<AddCustomerComponent />} />
          <Route path="/save-customers" element={<CreateCustomerComponent />} />
          <Route path="/view-customers/:id" element={<ViewCustomerComponent />} />
          <Route path="/success" element={<SuccessComponent />} />
          <Route path="/users" element={<ListUserComponent />} />
          <Route path="/add-user" element={<AddUserComponent />} />
          <Route path="/add-role/:id" element={<AddRoleComponent />} />
          <Route path="/remove-role/:id" element={<RemoveRoleComponent />} />
         </Routes>
        </context.Provider>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
}

export default App;
