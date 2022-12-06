import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import {
    getWorkoutByNumber,
    getWorkoutsErrors,
    getWorkoutsLoadingStatus,
    loadWorkout,
    resetWorkoutError
} from '../../store/workouts';
import showErrorToast from '../../utils/errorToast';
import { WorkoutWrapper } from './styles';
import WorkoutCard from '../../components/WorkoutCard';

const Workout = () => {
    const dispatch = useDispatch();
    const { seqNumber } = useParams();
    const sequenceNumber = parseInt(seqNumber);
    const workoutLoadingStatus = useSelector(getWorkoutsLoadingStatus());
    const workoutLoadingErrors = useSelector(getWorkoutsErrors());
    const workout = useSelector(getWorkoutByNumber(sequenceNumber));

    useEffect(() => {
        dispatch(loadWorkout(sequenceNumber));
    }, []);

    useEffect(() => {
        if (workoutLoadingErrors) {
            showErrorToast(workoutLoadingErrors);
            dispatch(resetWorkoutError());
        }
    }, [workoutLoadingErrors]);

    return (
        <WorkoutWrapper>
            {workoutLoadingStatus || !workout ? <Spin /> : <WorkoutCard sequenceNumber={sequenceNumber} />}
        </WorkoutWrapper>
    );
};

export default Workout;
