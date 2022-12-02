import React from 'react';
import { useLocation } from 'react-router-dom';
import RegisterPage from '../../pages/RegisterPage';
import LoginPage from '../../pages/LoginPage';
import { PhotoWrapper } from '../../components/StyledComponents';

const Login = () => {
    const { pathname } = useLocation();
    return <PhotoWrapper>{pathname === '/login/signUp' ? <RegisterPage /> : <LoginPage />}</PhotoWrapper>;
};

export default Login;
