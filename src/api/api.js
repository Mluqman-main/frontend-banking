import axios from "axios";

export default axios.create({
  baseURL: "https://banking-backend-orcin.vercel.app",
  withCredentials: true,
});