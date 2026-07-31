import axios from "axios";

const api = axios.create({
  baseURL: "https://agile-issue-tracker-api.onrender.com",
});

export default api;