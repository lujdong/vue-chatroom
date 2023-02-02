import axios from "axios";
import { ElMessage } from "element-plus";

const instance = axios.create({
  timeout: 5000,
  method: "post",
  baseURL: "/api",
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response.data.code === 0) {
      return response.data;
    }
    ElMessage.error({ message: response.data.message, offset: 600 });
    return Promise.reject(response.data.message);
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
