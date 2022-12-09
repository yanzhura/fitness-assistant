import httpService from './httpService';
import localstorageService from './localstorageService';

const getCurrentUser = async () => {
    const currentUserId = localstorageService.getUserId();
    const accessToken = localstorageService.getAccessToken();
    const { data } = await httpService.get(`/user/${currentUserId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return data;
};

const updateCurrentUser = async (userData) => {
    const currentUserId = localstorageService.getUserId();
    const accessToken = localstorageService.getAccessToken();
    const { data } = await httpService.patch(`/user/${currentUserId}`, userData, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return data;
};

export default {
    getCurrentUser,
    updateCurrentUser
};
