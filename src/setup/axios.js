import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "https://jwt-rqio.onrender.com",
});

instance.defaults.withCredentials = true;
instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("jwt")}`;

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = (error && error.response && error.response.status) || 500;
    if (status === 401) {
      if (
        window.location.pathname !== "/" &&
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register"
      ) {
        toast.error(error.response.data.EM);
      }

      return error.response.data;
    } else if (status === 403) {
      // toast.error("you don't have permission to access this resource");
      toast.error(error.response.data.EM);
      return error.response.data;
    }
    return Promise.reject(error);
  }
);

export default instance;
