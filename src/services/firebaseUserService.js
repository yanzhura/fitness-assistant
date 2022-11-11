import httpFirebaseService from './httpFirebaseService';
import localstorageService from './localstorageService';

const userEndpoint = 'users';

const getCurrentUser = async () => {
    const currentUserId = localstorageService.getUserId();
    const { data } = await httpFirebaseService.get(`${userEndpoint}/${currentUserId}.json`);
    return data;
};

const firebaseUserService = {
    getCurrentUser
};

export default firebaseUserService;
