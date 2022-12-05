import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardHeader from './CardHeader';
//* styles
import { StyledCard } from './styles';

const TrainingPlanCard = ({
    sequenceNumber,
    complexityLevel,
    kindName,
    typeName,
    exerciseGroupNames,
    completeStatus,
    plannedStatus
}) => {
    return (
        <Link to={`/workouts/${sequenceNumber}`}>
            <StyledCard title={<CardHeader {...{ completeStatus, plannedStatus, sequenceNumber }} />} size={'small'}>
                <p>{typeName}</p>
                <p>Вид: {kindName}</p>
                <p>Сложность: {complexityLevel}</p>
                <p>Виды упражнений: {exerciseGroupNames}</p>
            </StyledCard>
        </Link>
    );
};

TrainingPlanCard.propTypes = {
    sequenceNumber: PropTypes.number.isRequired,
    complexityLevel: PropTypes.number.isRequired,
    kindName: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
    exerciseGroupNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    completeStatus: PropTypes.string.isRequired,
    plannedStatus: PropTypes.string
};

export default TrainingPlanCard;
