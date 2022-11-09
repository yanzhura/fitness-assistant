const setTokens = ({ localId, idToken, refreshToken, expiresIn }) => {
    localStorage.setItem('localId', localId);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expiresIn', expiresIn);
};

const localstorageService = {
    setTokens
};

export default localstorageService;
