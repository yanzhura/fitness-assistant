import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <Link to="/">Главная | </Link>
            <Link to="/login">Вход | </Link>
            <Link to="/workouts">Тренировки | </Link>
            <Link to="/schedule">Расписание | </Link>
            <Link to="/stats">Статистика</Link>
        </div>
    );
};

export default Navbar;
