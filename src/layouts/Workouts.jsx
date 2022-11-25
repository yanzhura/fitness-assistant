import React from 'react';
import { useParams } from 'react-router-dom';
import Workout from '../pages/Workout';
import TrainingPlan from '../pages/TrainingPlan';

const Workouts = () => {
    const { seqNumber } = useParams();

    return <>{seqNumber ? <Workout /> : <TrainingPlan />}</>;
};

export default Workouts;
