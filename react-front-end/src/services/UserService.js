import axios from "axios";

class UserService{
    getUserByName(uname){
        return axios.get("http://localhost:8080/api/v1/user/"+uname);
    }

    getAllUsers(){
        return axios.get("http://localhost:8080/api/v1/users");
    }

    saveUser(user){
        return axios.post("http://localhost:8080/api/v1/saveUser",user);
    }
    getUserById(id){
        return axios.get("http://localhost:8080/api/v1/users/"+id);
    }
    getAllRoles(){
        return axios.get("http://localhost:8080/api/v1/roles");
    }
    addRoleToUser(id,role){
        return axios.put("http://localhost:8080/api/v1/users/"+id+"/roles/"+role);
    }
    removeRoleFromUser(user_id,role_id){
        return axios.delete("http://localhost:8080/api/v1/user/"+user_id+"/role/"+role_id);
    }
    getRoleByName(role_name){
        return axios.get("http://localhost:8080/api/v1/roles/"+role_name);
    }
}

export default new UserService()