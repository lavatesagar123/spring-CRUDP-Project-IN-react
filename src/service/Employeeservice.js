import axios from 'axios';

const BASE_URL = "http://localhost:9090/employees";

class Employeeservice {
  getAllEmployees() {
    return axios.get(`${BASE_URL}/try`);
  }

  saveEmployee(employee) {
    return axios.post(`${BASE_URL}/tryp`, employee);
  }

  deleteEmployeeByid(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }

  getEmployeeById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  updateEmployee(id, employee) {
    return axios.put(`${BASE_URL}/${id}`, employee);
  }
}

export default new Employeeservice();
