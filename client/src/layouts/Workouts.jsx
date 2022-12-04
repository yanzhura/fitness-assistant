import React from 'react';
import { useParams } from 'react-router-dom';
import Workout from '../pages/Workout';
import TrainingPlan from '../pages/TrainingPlan';
import HelpDrawer from '../components/HelpDrawer/HelpDrawer';
import { AboutWorkouts } from '../pages/QuickTour';
import { LayoutColumn, LayoutWrapper } from '../components/StyledComponents';

const Workouts = () => {
    const { seqNumber } = useParams();

    return (
        <LayoutWrapper>
            <LayoutColumn>
                <>{seqNumber ? <Workout /> : <TrainingPlan />}</>
                <HelpDrawer>
                    <AboutWorkouts />
                </HelpDrawer>
            </LayoutColumn>
        </LayoutWrapper>
    );
};

export default Workouts;
