import httpService from './httpService';

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

export default {
    signIn,
    signUp
};
