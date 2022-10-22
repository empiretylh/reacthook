import axios from "axios";

const API_URL = "http://192.168.43.247:8000/api/";

class AuthService {
  login(username, password) {
    const data = { username: username, password: password };

    return axios.postForm("http://192.168.43.247:8000/auth/login/", data)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        localStorage.setItem("user_token", res.data.token);
      })
      .catch((err) => console.log(err));
  }

  admin() {
    axios
      .get("http://192.168.43.247:8000/login")
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
