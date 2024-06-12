import axios from "axios";

// Set axios default configuration
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    console.log(config, "configconfigconfigconfigconfigconfigconfigconfig")
    // Modify config before request is sent
    // config.headers['Authorization'] = "Bearer "+getCookie('token');
    // return config;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Modify response data before it's passed to the application
    return response;
  },
  (error) => {
    // Handle response error
    // token expired
    if (error?.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default axios;
