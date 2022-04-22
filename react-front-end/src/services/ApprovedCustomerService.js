import axios from "axios";

const APPROVE_CUSTOMER_API_BASE_URL="http://localhost:8080/api/v1/approvedcustomers";
class ApprovedCustomerService{
    getCustomers(){
        return axios.get(APPROVE_CUSTOMER_API_BASE_URL);
    }
    createCustomer(customer){
        return axios.post(APPROVE_CUSTOMER_API_BASE_URL,customer);
    }
    updateCustomer(customer,customerId){
        return axios.put(APPROVE_CUSTOMER_API_BASE_URL+'/'+customerId,customer);
    }
    deleteCustomer(customerId){
        return axios.delete(APPROVE_CUSTOMER_API_BASE_URL+'/'+customerId);
    }
    saveCustomer(customer){
        return axios.put(APPROVE_CUSTOMER_API_BASE_URL+'/'+customer);
        }
    getApprovedCustomerById(customerId){
        return axios.get(APPROVE_CUSTOMER_API_BASE_URL+'/'+customerId);
    }
    getApprovedCustomersEmails(){
        return axios.get(APPROVE_CUSTOMER_API_BASE_URL+'/emails');
    }
}
export default  new ApprovedCustomerService();