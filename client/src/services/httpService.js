import axios from 'axios';
import appConfig from '../App.config';
import authService from './authService';
import localstorageService from './localstorageService';

const http = axios.create({
    baseURL: appConfig.apiUrl
});

http.interceptors.request.use(
    async (config) => {
        const expiresDate = localstorageService.getTokenExpirationTime();
        const refreshToken = localstorageService.getRefreshToken();
        const isExpired = refreshToken && expiresDate < Date.now();
        if (isExpired) {
            const data = await authService.refresh();
            localstorageService.setTokens(data);
        }
        const accessToken = localstorageService.getAccessToken();
        if (accessToken) {
            config.params = {
                ...config.params,
                Authorization: `Bearer ${accessToken}`
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default {
    delete: http.delete,
    get: http.get,
    patch: http.patch,
    post: http.post,
    put: http.put
};
