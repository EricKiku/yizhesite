import axios from "axios";

const request = axios.create({
  baseURL: "/api",
  timeout: 4000,
});

export default request;
