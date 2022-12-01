import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Welcome from '../../pages/Welcome/Welcome';
import { getTrainingPlanErrors, getTrainingPlanLoadingStatus, resetTrainingPlanError } from '../../store/trainingPlan';
import {
    getShowWelcomePage,
    getUserCurrentWorkout,
    getUserErrors,
    getUserLoadingStatus,
    resetUserError
} from '../../store/user';
import {
    getWorkoutByNumber,
    getWorkoutsErrors,
    getWorkoutsLoadingStatus,
    loadWorkout,
    resetWorkoutError
} from '../../store/workouts';
import showErrorToast from '../../utils/errorToast';

const Home = () => {
    const dispatch = useDispatch();

    const userLoadingStatus = useSelector(getUserLoadingStatus());
    const workoutLoadingStatus = useSelector(getWorkoutsLoadingStatus());
    const trainigplanLoadingStatus = useSelector(getTrainingPlanLoadingStatus());

    const userLoadngErrors = useSelector(getUserErrors());
    const workoutLoadingErrors = useSelector(getWorkoutsErrors());
    const trainigplanLoadingErrors = useSelector(getTrainingPlanErrors());

    const userCurrentWorkout = useSelector(getUserCurrentWorkout());
    const workout = useSelector(getWorkoutByNumber(userCurrentWorkout));
    const isWelcomePageOpen = useSelector(getShowWelcomePage());

    useEffect(() => {
        if (userCurrentWorkout) {
            dispatch(loadWorkout(userCurrentWorkout));
        }
    }, [userCurrentWorkout]);

    useEffect(() => {
        if (workoutLoadingErrors) {
            showErrorToast(workoutLoadingErrors);
            dispatch(resetWorkoutError());
        } else if (userLoadngErrors) {
            showErrorToast(userLoadngErrors);
            dispatch(resetUserError());
        } else if (trainigplanLoadingErrors) {
            showErrorToast(trainigplanLoadingErrors);
            dispatch(resetTrainingPlanError());
        }
    }, [trainigplanLoadingErrors, userLoadngErrors, workoutLoadingErrors]);

    const isDataReady = !userLoadingStatus && !workoutLoadingStatus && !trainigplanLoadingStatus && workout;

    return <div>{!isDataReady ? <Spin /> : <>{isWelcomePageOpen ? <Welcome /> : <Dashboard />}</>}</div>;
};

export default Home;
