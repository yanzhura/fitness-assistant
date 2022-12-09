const setTokens = ({ accessToken, refreshToken, expiresIn, userId }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expiresIn', expiresIn);
    localStorage.setItem('userId', userId);
};

const getUserId = () => localStorage.getItem('userId');

const getAccessToken = () => localStorage.getItem('accessToken');

const removeTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
};

export default {
    getUserId,
    getAccessToken,
    removeTokens,
    setTokens
};
