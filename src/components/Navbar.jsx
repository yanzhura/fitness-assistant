import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <Link to="/">Главная | </Link>
            <Link to="/login/signin">Вход | </Link>
            <Link to="/login/signup">Регистрация | </Link>
            <Link to="/workouts">Тренировки | </Link>
            <Link to="/schedule">Расписание | </Link>
            <Link to="/stats">Статистика | </Link>
            <Link to="/help">Помощь</Link>
        </div>
    );
};

export default Navbar;
