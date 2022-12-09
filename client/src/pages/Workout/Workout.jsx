import React from 'react';
import { useParams } from 'react-router-dom';
import { WorkoutWrapper } from './styles';
import WorkoutCard from '../../components/WorkoutCard';

const Workout = () => {
    const { seqNumber } = useParams();
    const sequenceNumber = parseInt(seqNumber);

    return (
        <WorkoutWrapper>
            <WorkoutCard sequenceNumber={sequenceNumber} />
        </WorkoutWrapper>
    );
};

export default Workout;
