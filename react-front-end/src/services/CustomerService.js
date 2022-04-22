
import axios from "axios";

const CUSTOMER_API_BASE_URL="http://localhost:8080/api/v1/customers";
class CustomerService{
    getCustomers(){
        return axios.get(CUSTOMER_API_BASE_URL);
    }
    createCustomer(customer){
        return axios.post("http://localhost:8080/api/v1/createCustomer",customer);
    }
    getCustomerById(customerId){
        return axios.get(CUSTOMER_API_BASE_URL+'/'+customerId);
    }
    updateCustomer(customer){
    return axios.put("http://localhost:8080/api/v1/updateCustomer/",customer);
    }
    deleteCustomer(customerId){
        return axios.delete(CUSTOMER_API_BASE_URL+'/'+customerId);
    }
    saveCustomer(customer){
        return axios.put(CUSTOMER_API_BASE_URL+'/'+customer);
        }
    approveCustomer(customer,customerId){
        return axios.post(CUSTOMER_API_BASE_URL+'/'+customerId,customer);

    }
    getCustomerEmails(){
        return axios.get(CUSTOMER_API_BASE_URL+'/emailIds');
    }
}
export default new CustomerService();