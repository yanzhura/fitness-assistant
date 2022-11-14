import httpFirebaseService from './httpFirebaseService';
import localstorageService from './localstorageService';

const userEndpoint = 'users';

const getCurrentUser = async () => {
    const currentUserId = localstorageService.getUserId();
    const { data } = await httpFirebaseService.get(`${userEndpoint}/${currentUserId}.json`);
    return data;
};

const createNewUser = async (userId, userData) => {
    const { data } = await httpFirebaseService.put(`${userEndpoint}/${userId}.json`, userData);
    return data;
};

const firebaseUserService = {
    getCurrentUser,
    createNewUser
};

export default firebaseUserService;
