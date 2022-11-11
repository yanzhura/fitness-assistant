import axios from 'axios';
import config from '../App.config.json';

const http = axios.create({
    baseURL: config.firebaseApiUrl
});

const httpFirebaseService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpFirebaseService;
