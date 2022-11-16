import axios from 'axios';
import config from '../App.config.json';

const http = axios.create({
    baseURL: config.firebaseApiUrl
});

export default {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};
