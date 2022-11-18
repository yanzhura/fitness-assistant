import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkoutByNumber, getWorkoutsErrors, getWorkoutsLoadingStatus, loadWorkout } from '../../store/workouts';
import showEerrorToast from '../../utils/errorToast';
import { Button, Spin } from 'antd';
import customHistory from '../../utils/customHistory';
import WorkoutCard from '../../components/WorkoutCard';

const Workout = ({ seqNumber }) => {
    const dispatch = useDispatch();

    const workoutLoadingStatus = useSelector(getWorkoutsLoadingStatus());
    const workoutLoadingErrors = useSelector(getWorkoutsErrors());
    const currentWorkout = useSelector(getWorkoutByNumber(seqNumber));

    useEffect(() => {
        dispatch(loadWorkout(seqNumber));
    }, []);

    useEffect(() => {
        if (workoutLoadingErrors) {
            showEerrorToast(workoutLoadingErrors);
        }
    }, [workoutLoadingErrors]);

    const handleClick = () => {
        customHistory.goBack();
    };

    return (
        <div>
            <p>Тренировка №{seqNumber}</p>
            <Button onClick={handleClick}>Назад</Button>
            {workoutLoadingStatus || !currentWorkout ? <Spin /> : <WorkoutCard {...currentWorkout} />}
        </div>
    );
};

Workout.propTypes = {
    seqNumber: PropTypes.number.isRequired
};

export default Workout;
