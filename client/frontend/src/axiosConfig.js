import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://evangadi-forum-12.onrender.com/api",
});

export default axiosBase;
