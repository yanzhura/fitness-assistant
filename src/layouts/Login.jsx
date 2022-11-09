import React from 'react';
import { useParams } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const Login = () => {
    const { loginType } = useParams();
    return (
        <div>
            <h2>Страница входа или регистрации.</h2>
            <hr />
            {loginType === 'signup' ? <RegisterPage /> : <LoginPage />}
        </div>
    );
};

export default Login;
