import React from 'react';
import { useLocation } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';

const Login = () => {
    const { pathname } = useLocation();
    return <>{pathname === '/login/signUp' ? <RegisterPage /> : <LoginPage />}</>;
};

export default Login;
