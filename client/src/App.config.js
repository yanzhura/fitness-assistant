const getApiUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:8080/api';
    }
    return '/api';
};

export default getApiUrl;
