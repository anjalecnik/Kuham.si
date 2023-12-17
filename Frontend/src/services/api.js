import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, 
    timeout: 1000, 
    headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
    }
});

export default api;