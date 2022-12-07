import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainingPlanErrors, getTrainingPlanLoadingStatus, resetTrainingPlanError } from '../store/trainingPlan';
import { getUserErrors, getUserLoadingStatus, resetUserError } from '../store/user';
import showErrorToast from '../utils/errorToast';
import HelpDrawer from '../components/HelpDrawer/HelpDrawer';
import { AboutStats } from '../pages/QuickTour';
import StatsSummary from '../pages/StatsSummary';
//* styles
import { LayoutColumn, LayoutWrapper, StyledTitle } from '../components/StyledComponents';
import Loader from '../components/Loader/Loader';

const Stats = () => {
    const dispatch = useDispatch();
    const trainigplanLoadingStatus = useSelector(getTrainingPlanLoadingStatus());
    const userLoadingStatus = useSelector(getUserLoadingStatus());

    const trainigplanLoadingErrors = useSelector(getTrainingPlanErrors());
    const userLoadngErrors = useSelector(getUserErrors());

    useEffect(() => {
        if (userLoadngErrors) {
            showErrorToast(userLoadngErrors);
            dispatch(resetUserError());
        } else if (trainigplanLoadingErrors) {
            showErrorToast(trainigplanLoadingErrors);
            dispatch(resetTrainingPlanError());
        }
    }, [trainigplanLoadingErrors, userLoadngErrors]);

    return (
        <LayoutWrapper>
            <LayoutColumn>
                <StyledTitle level="3">Статистика</StyledTitle>
                {!trainigplanLoadingStatus && !userLoadingStatus ? <StatsSummary /> : <Loader />}
                <HelpDrawer>
                    <AboutStats />
                </HelpDrawer>
            </LayoutColumn>
        </LayoutWrapper>
    );
};

export default Stats;
