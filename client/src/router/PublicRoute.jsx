import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getIsLoggedIn } from '../store/user';

const PublicRoute = ({ ...rest }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return <>{isLoggedIn ? <Redirect to="/home" /> : <Route {...rest} />}</>;
};

export default PublicRoute;
