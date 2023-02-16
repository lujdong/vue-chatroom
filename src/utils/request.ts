import { useUserStore } from "@/store/user";
import axios from "axios";
import { ElMessage } from "element-plus";

const instance = axios.create({
  timeout: 5000,
  method: "post",
  baseURL: "/api",
});

const useStore = useUserStore();

instance.interceptors.request.use(
  function (config) {
    config.headers.token = useStore.user?.token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log("response: ", response);
    if (response.data.code === 200) {
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
