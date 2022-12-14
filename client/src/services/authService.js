import axios from 'axios';
import appConfig from '../App.config';
import httpService from './httpService';
import localstorageService from './localstorageService';

const signIn = async ({ email, password }) => {
    const { data } = await httpService.post('/auth/signInWithPassword', {
        email,
        password
    });
    return data;
};

const signUp = async ({ email, password, ...rest }) => {
    const { data } = await httpService.post('/auth/signUp', {
        email,
        password,
        ...rest
    });
    return data;
};

const refresh = async () => {
    const refreshToken = localstorageService.getRefreshToken();
    const { data } = await axios.post(`${appConfig.apiUrl}/auth/token`, {
        refreshToken
    });
    return data;
};

export default {
    signIn,
    signUp,
    refresh
};
