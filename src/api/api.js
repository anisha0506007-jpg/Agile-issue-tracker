import axios from "axios";

const api = axios.create({
  baseURL: "https://json-files-l0oa.onrender.com/"
});

export default api;
