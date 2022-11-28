import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getWorkoutByNumber } from '../../store/workouts';
import BodyPartsTags from '../BodyPartsTags/BodyPartsTags';

const ExerciseCard = ({ workoutNumber, exerciseKey }) => {
    const workout = useSelector(getWorkoutByNumber(workoutNumber));
    const exercise = workout.exercises[exerciseKey];
    return (
        <div>
            <BodyPartsTags bodyParts={exercise.bodyParts} />
            <p>Фото</p>
            <p>Название: {exercise.name}</p>
            <p>Группа: {exercise.group}</p>
            <p>Описание</p>
        </div>
    );
};

ExerciseCard.propTypes = {
    workoutNumber: PropTypes.number.isRequired,
    exerciseKey: PropTypes.string.isRequired
};

export default ExerciseCard;
