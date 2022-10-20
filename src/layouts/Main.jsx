import React from 'react';
import Dashboard from '../pages/Dashboard';
import NavigationHelp from '../pages/NavigationHelp';
import Welcome from '../pages/Welcome';

const Main = () => {
    return (
        <>
            <div>Главная страница (появляется первой)</div>
            <hr />
            <Welcome />
            <NavigationHelp />
            <Dashboard />
        </>
    );
};

export default Main;
