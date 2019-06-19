import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myexactjobsapi.herokuapp.com/api'
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default instance;