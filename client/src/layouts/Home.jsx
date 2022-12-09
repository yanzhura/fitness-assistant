import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Dashboard from '../pages/Dashboard';
import Welcome from '../pages/Welcome';
import { getTrainingPlanErrors, getTrainingPlanLoadingStatus, resetTrainingPlanError } from '../store/trainingPlan';
import { getShowWelcomePage, getUserErrors, getUserLoadingStatus, resetUserError } from '../store/user';
import showErrorToast from '../utils/errorToast';
import { LayoutColumn, LayoutWrapper } from '../components/StyledComponents';

const Home = () => {
    const dispatch = useDispatch();

    const userLoadingStatus = useSelector(getUserLoadingStatus());
    const trainigplanLoadingStatus = useSelector(getTrainingPlanLoadingStatus());

    const userLoadngErrors = useSelector(getUserErrors());
    const trainigplanLoadingErrors = useSelector(getTrainingPlanErrors());

    const isWelcomePageOpen = useSelector(getShowWelcomePage());

    useEffect(() => {
        if (userLoadngErrors) {
            showErrorToast(userLoadngErrors);
            dispatch(resetUserError());
        } else if (trainigplanLoadingErrors) {
            showErrorToast(trainigplanLoadingErrors);
            dispatch(resetTrainingPlanError());
        }
    }, [trainigplanLoadingErrors, userLoadngErrors]);

    const isDataReady = !userLoadingStatus && !trainigplanLoadingStatus;

    return (
        <LayoutWrapper>
            <LayoutColumn>
                {!isDataReady ? <Loader /> : <>{isWelcomePageOpen ? <Welcome /> : <Dashboard />}</>}
            </LayoutColumn>
        </LayoutWrapper>
    );
};

export default Home;
