import axios from 'axios';
import config from '../App.config.json';

const http = axios.create({
    baseURL: config.apiUrl
});

export default {
    delete: http.delete,
    get: http.get,
    patch: http.patch,
    post: http.post,
    put: http.put
};
