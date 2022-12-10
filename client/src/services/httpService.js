import axios from 'axios';
import getApiUrl from '../App.config';

const http = axios.create({
    baseURL: getApiUrl()
});

export default {
    delete: http.delete,
    get: http.get,
    patch: http.patch,
    post: http.post,
    put: http.put
};
