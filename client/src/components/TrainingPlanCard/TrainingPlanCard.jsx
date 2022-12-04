import React from 'react';
import PropTypes from 'prop-types';
// import { Card } from 'antd';
import { Link } from 'react-router-dom';
//* styles
import { StyledCard } from './styles';
import CompleteIcon from '../../ui/icons/CompleteIcon';

const TrainingPlanCard = ({
    sequenceNumber,
    complexityLevel,
    kindName,
    typeName,
    exerciseGroupNames,
    completeStatus
}) => {
    return (
        <Link to={`/workouts/${sequenceNumber}`}>
            <StyledCard title={<CompleteIcon />} extra={<p>{typeName}</p>} size={'small'}>
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
    completeStatus: PropTypes.string.isRequired
};

export default TrainingPlanCard;
