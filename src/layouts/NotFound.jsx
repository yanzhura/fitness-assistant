import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h1>404</h1>
            <p>Запрашиваемая страница не найдена</p>
            <Link to="/">На главную</Link>
        </div>
    );
};

export default NotFound;
