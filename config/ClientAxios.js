import axios from "axios";
const ClientAxios = axios.create({
  baseURL: process.env.backendURL,
});

export default ClientAxios;
