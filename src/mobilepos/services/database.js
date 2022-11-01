import axios from "axios";

class Database {
  getProducts() {
    return axios.get("/api/products/");
  }

  postProduct(data) {
    return axios.post("/api/products/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  putProduct(data){
    return axios.put("/api/products/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getCategorys() {
    return axios.get("/api/categorys/");
  }

  postCategory(data) {
    return axios.post("/api/categorys/", data);
  }

  getProfile() {
    return axios.get("/api/profile/");
  }

  // @type= {'DT' for date time only}
  getSales({ queryKey }) {
    const [_, type, time, startd, endd] = queryKey;
    return axios.get("/api/sales/", {
      params: {
        type: type,
        time: time,
        startd: startd,
        endd: endd,
      },
    });
  }
  getExpense({ queryKey }) {
    const [_, type, time, startd, endd] = queryKey;
    return axios.get("/api/expenses/", {
      params: {
        type: type,
        time: time,
        startd: startd,
        endd: endd,
      },
    });
  }
  getPurchase({ queryKey }) {
    const [_, type, time, startd, endd] = queryKey;
    return axios.get("/api/purchases/", {
      params: {
        type: type,
        time: time,
        startd: startd,
        endd: endd,
      },
    });
  }

  getOtherIncome({ queryKey }) {
    const [_, type, time, startd, endd] = queryKey;
    return axios.get("/api/otherincome/", {
      params: {
        type: type,
        time: time,
        startd: startd,
        endd: endd,
      },
    });
  }

  getTopProduct({ _, params }) {
    return axios.get("/api/toproduct/", { params: params });
  }

  getProfitnLoss({ _, params }) {
    return axios.get("/api/profitnloss/", { params: params });
  }
}

export default new Database();
