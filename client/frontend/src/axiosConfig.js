import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://evangadi-forum-123.onrender.com",
});

export default axiosBase;
