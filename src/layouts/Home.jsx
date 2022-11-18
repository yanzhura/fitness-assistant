import React from 'react';
import NavigationHelp from '../pages/NavigationHelp';
import Welcome from '../pages/Welcome';

const Home = () => {
    return (
        <>
            <div>Главная страница (появляется первой)</div>
            <hr />
            <Welcome />
            <NavigationHelp />
        </>
    );
};

export default Home;
