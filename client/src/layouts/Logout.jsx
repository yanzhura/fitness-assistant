import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/user';

const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout());
    }, []);
    return <></>;
};

export default Logout;
