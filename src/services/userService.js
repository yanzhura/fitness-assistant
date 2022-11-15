import httpService from './httpService';
import localstorageService from './localstorageService';

const userEndpoint = 'users';

const getCurrentUser = async () => {
    const currentUserId = localstorageService.getUserId();
    const { data } = await httpService.get(`${userEndpoint}/${currentUserId}.json`);
    return data;
};

const createNewUser = async (userId, userData) => {
    const { data } = await httpService.put(`${userEndpoint}/${userId}.json`, userData);
    return data;
};

export default {
    getCurrentUser,
    createNewUser
};
