import axios from "axios";
import { baseURL } from "./data";
export const API_URL = baseURL;

class AuthService {
  login(data) {
    console.log(data);
    return axios.postForm(API_URL + "/auth/login/", data);
  }

  createVoting(data) {
    return axios.post(API_URL + "/api/createvotingcode/", data);
  }

  getcreateVoting() {
    return axios.get(API_URL + "/api/createvotingcode/");
  }

  getVoting({ queryKey }) {
    const [_, votingcode] = queryKey;
    return axios.get(API_URL + "/api/votingm/", {
      params: {
        votingcode: votingcode,
      },
    });
  }

  addKing(data) {
    return axios.post(API_URL + "/api/selectionking/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  deleteKing(data) {
    return axios.delete(API_URL + "/api/selectionking/", {
      params: {
        id: data.id,
        votingcode: data.votingcode,
      },
    });
  }


  getQueenImage({ queryKey }) {
    const [_, id] = queryKey;
    return axios.get(API_URL + "/api/selectionqueenimage/", {
      params: {
        queenid:id
      },
    });
  }


  getKingImage({ queryKey }) {
    const [_, id] = queryKey;
    return axios.get(API_URL + "/api/selectionkingimage/", {
      params: {
        kingid:id
      },
    });
  }

  addQueenImage(data) {
    return axios.post(API_URL + "/api/selectionqueenimage/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  addQueen(data) {
    return axios.post(API_URL + "/api/selectionqueen/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  deleteQueen(data) {
    return axios.delete(API_URL + "/api/selectionqueen/", {
      params: {
        id: data.id,
        votingcode: data.votingcode,
      },
    });
  }

  deletecreateVoting(data) {
    return axios.delete(API_URL + "/api/createvotingcode/", {
      params: {
        id: data.id,
      },
    });
  }

  admin() {
    axios.get(API_URL + "/login").then((res) => console.log(res));
  }

  logout() {
    localStorage.removeItem("user_token");
  }

  register(data) {
    return axios.post(API_URL + "/auth/register/", data);
  }

  getCurrentUserToken() {
    return localStorage.getItem("user_token");
  }
}

export default new AuthService();
