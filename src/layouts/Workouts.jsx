import React from 'react';
import { useParams } from 'react-router-dom';
import Workout from '../pages/Workout';
import WorkoutList from '../pages/WorkoutList';

const Workouts = () => {
    const { seqNumber } = useParams();
    return <>{seqNumber ? <Workout seqNumber={parseInt(seqNumber)} /> : <WorkoutList />}</>;
};

export default Workouts;
