import axios from 'axios';

// Create an AxiosInstance of Axios with default configuration
const AxiosInstance = axios.create({
  baseURL: 'http://localhost:4050/api', // Set the base URL for all requests // Set a timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json', // Set default headers for all requests
    // You can add other headers as needed
  },
});

// You can also define interceptors for the AxiosInstance
AxiosInstance.interceptors.request.use(
  (config) => {
    // Do something before sending the request
    const user = JSON.parse(localStorage.getItem('CRM-user'));
      
      if (user !== null ) {
        config.headers['auth-token'] = user.token;
        //config.headers.Authorization = `Bearer ${user.token}`
      }
    console.log('Request interceptor', config);
    return config;
  },
  (error) => {
    // Do something with the request error
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    // Do something with the successful response
    console.log('Response interceptor', response);
    return response;
  },
  (error) => {
    // Do something with the response error
    return Promise.reject(error);
  }
);

export default AxiosInstance;
