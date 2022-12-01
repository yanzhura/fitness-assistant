import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getIsLoggedIn } from '../store/user';

const PrivateRoute = ({ ...rest }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return <>{isLoggedIn ? <Route {...rest} /> : <Redirect to="/login/signIn" />}</>;
};

export default PrivateRoute;
