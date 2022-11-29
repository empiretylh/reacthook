import axios from "axios";

export const API_URL = "http://172.17.0.1:8000";

class AuthService {
  login(username, password) {
    const data = { username: username, password: password };

    return axios.postForm(API_URL+"/auth/login/", data)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        localStorage.setItem("user_token", res.data.token);
      })
      .catch((err) => console.log(err));
  }

  admin() {
    axios
      .get(API_URL+"/login")
      .then((res) => console.log(res));
  }

  logout() {
    localStorage.removeItem("user_token");
  }

  register(username, email, password) {}

  getCurrentUserToken() {
    return localStorage.getItem('user_token')
  }
}

export default new AuthService();
