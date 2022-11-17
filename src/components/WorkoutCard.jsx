import React from 'react';
import PropTypes from 'prop-types';

const WorkoutCard = ({ sequenceNumber, complexityLevel, kindName, typeName, exercises }) => {
    return (
        <div>
            <p>Номер: {sequenceNumber}</p>
            <p>Сложность: {complexityLevel}</p>
            <p>Вид: {kindName}</p>
            <p>Тип: {typeName}</p>
        </div>
    );
};

WorkoutCard.propTypes = {
    sequenceNumber: PropTypes.number.isRequired,
    complexityLevel: PropTypes.number.isRequired,
    kindName: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
    exercises: PropTypes.arrayOf(
        PropTypes.shape({
            group: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            bodyParts: PropTypes.arrayOf(PropTypes.string).isRequired
        })
    ).isRequired
};

export default WorkoutCard;
