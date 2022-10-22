import axios from "axios";

class Database {
  getProducts() {
    return axios.get("/api/products/");
  }
  getCategorys() {
    return axios.get("/api/categorys/");
  }
  getProfile() {
    return axios.get("/api/profile/");
  }
  getSales() {
    return axios.get("/api/sales/");
  }
  getExpense() {
    return axios.get("/api/expense/");
  }
}

export default new Database();
