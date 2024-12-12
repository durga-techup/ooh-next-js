// api.js

import axios from 'axios';
import { useSelector } from 'react-redux';
import { store } from '../redux/store';

// Public API instance (no need for Authorization token)
const publicApi = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 50000,
});

// Private API instance (requires token)
const privateApi = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 50000,
});

// Request interceptor for private API (adding auth token)
privateApi.interceptors.request.use(
  (config) => {
    const token = store.getState().user.userInfo?.token
    
    console.log("getState()",store?.getState().user.userInfo?.token)
    // const token = getState().user.userInfo?.token ;
    // let token=""
    // const token = localStorage.getItem('authToken');
    // const token = useSelector(state => state.user.userInfo?.token)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for private API
privateApi.interceptors.response.use(
  (response) => {
    return response?.data; // Return data directly
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login'; // Redirect to login if unauthorized
    }
    return Promise.reject(error);
  }
);

export { publicApi, privateApi };
