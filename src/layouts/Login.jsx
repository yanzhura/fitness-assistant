import React from 'react';
import { useParams } from 'react-router-dom';
import SigIn from '../pages/SigIn';
import SignUp from '../pages/SignUp';

const Login = () => {
    const { loginType } = useParams();
    return (
        <div>
            <h2>Страница входа или регистрации.</h2>
            <hr />
            {loginType === 'signup' ? <SignUp /> : <SigIn />}
        </div>
    );
};

export default Login;
