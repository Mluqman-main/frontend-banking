import axios from "axios";

export default axios.create({
  baseURL: "https://banking-system-five-sable.vercel.app",
  withCredentials: true,
});