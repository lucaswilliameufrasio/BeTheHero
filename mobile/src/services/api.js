import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.7.97:7777'
});

export default api;