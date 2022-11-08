import React from 'react';
import CurrentWorkout from '../components/CurrentWorkout';
import MiniSchedule from '../components/MiniSchedule';
import Progress from '../components/Progress';

const Dashboard = () => {
    return (
        <div>
            <h2>Сводка</h2>
            <p>
                Эта страница будет основной для всех пользователей, кто зарегистрировался и прощёлкал ДАЛЕЕ на страницах
                WELCOME и NAV.HELP. Перейти на страницу можно будет по кнопке ГЛАВНАЯ в навбаре. Здесь будут разположены
                три компонента: текущая тренировка, прогресс и календарь (возможно что-то ещё из статистики отобразим).
            </p>
            <hr />
            <CurrentWorkout />
            <MiniSchedule />
            <Progress />
        </div>
    );
};

export default Dashboard;
