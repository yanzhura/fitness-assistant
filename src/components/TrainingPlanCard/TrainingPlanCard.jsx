/** @jsxImportSource @emotion/react */

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
//* styles
import { headStyles, cardOverride } from './styles';

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
            <Card
                title={`Тренировка ${sequenceNumber}`}
                extra={<p>{typeName}</p>}
                size={'small'}
                headStyle={headStyles[completeStatus]}
                css={cardOverride}>
                <p>Вид: {kindName}</p>
                <p>Сложность: {complexityLevel}</p>
                <p>Виды упражнений: {exerciseGroupNames}</p>
            </Card>
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
