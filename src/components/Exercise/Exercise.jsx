import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Badge, Card, Modal } from 'antd';
import Title from 'antd/lib/typography/Title';
import { getWorkoutByNumber } from '../../store/workouts';
import { capitalize } from '../../utils/capitalize';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import BodyPartsTags from '../BodyPartsTags/BodyPartsTags';
//* styles
import { ExerciseWrapper } from './styles';

const Exercise = ({ workoutNumber, exerciseKey }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const workout = useSelector(getWorkoutByNumber(workoutNumber));

    const { group, name, bodyParts } = workout.exercises[exerciseKey];

    const toggleModal = () => setIsModalOpen((prevState) => !prevState);

    return (
        <ExerciseWrapper>
            <Badge.Ribbon text={group} color={'#aaa'}>
                <Card size={'small'} onClick={toggleModal}>
                    <BodyPartsTags bodyParts={bodyParts} />
                    <Title level={4}>{capitalize(name)}</Title>
                </Card>
            </Badge.Ribbon>
            <Modal footer={null} open={isModalOpen} onCancel={toggleModal} centered={true}>
                <ExerciseCard {...{ workoutNumber, exerciseKey }} />
            </Modal>
        </ExerciseWrapper>
    );
};

Exercise.propTypes = {
    workoutNumber: PropTypes.number.isRequired,
    exerciseKey: PropTypes.string.isRequired
};

export default Exercise;
