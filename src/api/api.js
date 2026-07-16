import axios from "axios";

export default axios.create({
  baseURL: "https://banking-backend-3xewf0h5l-mluqman-mains-projects.vercel.app",
  withCredentials: true,
});