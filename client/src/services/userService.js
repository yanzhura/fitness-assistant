import httpService from './httpService';
import localstorageService from './localstorageService';

const userLocation = 'users';

const getCurrentUser = async () => {
    const currentUserId = localstorageService.getUserId();
    const { data } = await httpService.get(`${userLocation}/${currentUserId}.json`);
    return data;
};

const createNewUser = async (userId, userData) => {
    const { data } = await httpService.put(`${userLocation}/${userId}.json`, userData);
    return data;
};

const updateCurrentUser = async (userData) => {
    const currentUserId = localstorageService.getUserId();
    const { data } = await httpService.put(`${userLocation}/${currentUserId}.json`, userData);
    return data;
};

export default {
    getCurrentUser,
    createNewUser,
    updateCurrentUser
};
