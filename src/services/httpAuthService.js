import axios from 'axios';
import config from '../App.config.json';

const httpAuth = axios.create({
    baseURL: config.authApiUrl,
    params: {
        key: process.env.REACT_APP_FIREBASE_AUTH_API_KEY
    }
});

const signIn = async ({ email, password }) => {
    const { data } = await httpAuth.post(':signInWithPassword', {
        email,
        password,
        returnSecureToken: true
    });
    return data;
};

const signUp = async ({ email, password }) => {
    const { data } = await httpAuth.post(':signUp', {
        email,
        password,
        returnSecureToken: true
    });
    return data;
};

const httpAuthService = {
    signIn,
    signUp
};

export default httpAuthService;
