import axios from 'axios';
import config from '../App.config.json';

const httpAuth = axios.create({
    baseURL: config.authApiUrl,
    params: {
        key: process.env.REACT_APP_FIREBASE_AUTH_API_KEY
    }
});

const login = async ({ email, password }) => {
    try {
        const { data } = await httpAuth.post(':signInWithPassword', {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    } catch (error) {
        console.error('error :>> ', error.response.data.error.message);
    }
};

const httpAuthService = {
    login
};

export default httpAuthService;
