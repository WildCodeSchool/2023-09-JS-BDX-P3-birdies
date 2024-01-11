import axios from "axios";

export default class ApiService {
  #token;

  constructor() {
    this.#token = localStorage.getItem("token");
  }

  getToken() {
    return this.#token;
  }

  setToken(token) {
    this.#token = token;

    return this.#token;
  }

  get(url) {
    const config = { headers: {} };

    if (this.#token) {
      config.headers.Authorization = `bearer ${this.#token}`;
    }
    axios.get(url, config);
  }
}
