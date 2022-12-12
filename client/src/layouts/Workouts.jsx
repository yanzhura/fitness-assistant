import React from 'react';
import { useParams } from 'react-router-dom';
import Workout from '../pages/Workout';
import TrainingPlan from '../pages/TrainingPlan';
import HelpDrawer from '../components/HelpDrawer';
import { AboutWorkouts } from '../pages/QuickTour';
import { LayoutColumn, LayoutWrapper } from '../components/StyledComponents';
import { useSelector } from 'react-redux';
import { getUserLoadingStatus } from '../store/user';
import Loader from '../components/Loader/Loader';
import { getTrainingPlanLoadingStatus } from '../store/trainingPlan';

const Workouts = () => {
    const { seqNumber } = useParams();
    const userDataLoadingStatus = useSelector(getUserLoadingStatus());
    const trainigplanLoadingStatus = useSelector(getTrainingPlanLoadingStatus());
    const isDataLoading = userDataLoadingStatus || trainigplanLoadingStatus;

    return (
        <LayoutWrapper>
            <LayoutColumn>
                {isDataLoading ? <Loader /> : <>{seqNumber ? <Workout /> : <TrainingPlan />}</>}
                <HelpDrawer>
                    <AboutWorkouts />
                </HelpDrawer>
            </LayoutColumn>
        </LayoutWrapper>
    );
};

export default Workouts;
