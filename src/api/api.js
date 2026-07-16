import axios from "axios";

export default axios.create({
  baseURL: "https://banking-backend-three.vercel.app",
  withCredentials: true,
});