const devServerUrl = 'http://localhost:8080';

const getApiUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return `${devServerUrl}/api`;
    }
    return '/api';
};

const getStaticUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return `${devServerUrl}/static`;
    }
    return '/static';
};

const appConfig = {
    apiUrl: getApiUrl(),
    staticUrl: getStaticUrl()
};

export default appConfig;
