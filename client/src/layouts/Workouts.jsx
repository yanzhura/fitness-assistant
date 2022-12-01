import React from 'react';
import { useParams } from 'react-router-dom';
import Workout from '../pages/Workout';
import TrainingPlan from '../pages/TrainingPlan';
import HelpDrawer from '../components/HelpDrawer/HelpDrawer';
import { AboutWorkouts } from '../pages/QuickTour';

const Workouts = () => {
    const { seqNumber } = useParams();

    return (
        <>
            <div>{seqNumber ? <Workout /> : <TrainingPlan />}</div>
            <HelpDrawer>
                <AboutWorkouts />
            </HelpDrawer>
        </>
    );
};

export default Workouts;
