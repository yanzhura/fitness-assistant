import React from 'react';
import { useLocation } from 'react-router-dom';
import { PhotoWrapper } from '../components/StyledComponents';
import { LoginPage, RegisterPage } from '../pages/Login';

const Login = () => {
    const { pathname } = useLocation();
    return <PhotoWrapper>{pathname === '/login/signUp' ? <RegisterPage /> : <LoginPage />}</PhotoWrapper>;
};

export default Login;
