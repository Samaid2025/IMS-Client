import axios from 'axios';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      config.headers.Authorization = 'Token ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response !== undefined) {
      if (401 === error.response.status) {
        localStorage.removeItem('user_id');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('first_name');
        window.location = '/login';
        return Promise.reject(error);
      } else if (200 !== error.response.status) {
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    } else {
      window.location = '/server-irresponsive';
      return Promise.reject(error);
    }
  },
);
export default axiosInstance;
