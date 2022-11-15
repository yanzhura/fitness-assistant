import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { loadWorkout } from '../store/workouts';

const Workouts = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(loadWorkout(17));
    };

    return (
        <>
            <h1>Список тренировок</h1>
            <Button onClick={handleClick}>Получить тренировку 17</Button>
        </>
    );
};

export default Workouts;
