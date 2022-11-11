const setTokens = ({ localId, idToken, refreshToken, expiresIn }) => {
    localStorage.setItem('userId', localId);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expiresIn', expiresIn);
};

const getUserId = () => localStorage.getItem('userId');

const removeTokens = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');
};

const localstorageService = {
    setTokens,
    getUserId,
    removeTokens
};

export default localstorageService;
