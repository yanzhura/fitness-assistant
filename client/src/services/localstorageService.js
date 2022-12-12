const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const EXPIRATION_KEY = 'expiresIn';
const USERID_KEY = 'userId';

const setTokens = ({ accessToken, refreshToken, expiresIn, userId }) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRATION_KEY, expiresDate);
    localStorage.setItem(USERID_KEY, userId);
};

const getUserId = () => localStorage.getItem(USERID_KEY);

const getAccessToken = () => localStorage.getItem(ACCESS_KEY);

const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

const getTokenExpirationTime = () => localStorage.getItem(EXPIRATION_KEY);

const removeTokens = () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRATION_KEY);
    localStorage.removeItem(USERID_KEY);
};

export default {
    getAccessToken,
    getRefreshToken,
    getTokenExpirationTime,
    getUserId,
    removeTokens,
    setTokens
};
