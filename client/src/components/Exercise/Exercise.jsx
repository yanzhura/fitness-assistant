import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Badge, Card, Modal, Statistic } from 'antd';
import Title from 'antd/lib/typography/Title';
import { getWorkoutByNumber } from '../../store/workouts';
import { capitalize } from '../../utils/capitalize';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import BodyPartsTags from '../BodyPartsTags/BodyPartsTags';
import { getUserCompletedWorkouts, getUserSchedule } from '../../store/user';
import { repeatsDeclension } from '../../utils/declensions';
//* styles
import { ExerciseWrapper } from './styles';

const Exercise = ({ sequenceNumber, exerciseKey }) => {
    const userSchedule = useSelector(getUserSchedule());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const workout = useSelector(getWorkoutByNumber(sequenceNumber));
    const userCompletedWorkouts = useSelector(getUserCompletedWorkouts());

    const isWorkoutCompleted = sequenceNumber <= userCompletedWorkouts;
    const { group, name, bodyParts, bodyWeight } = workout.exercises[exerciseKey];
    const { result } = isWorkoutCompleted ? userSchedule[`workout${sequenceNumber}`] : { result: 0 };
    const exerciseResult = isWorkoutCompleted && result[exerciseKey];
    const units = bodyWeight ? repeatsDeclension(exerciseResult) : 'кг';

    const toggleModal = () => setIsModalOpen((prevState) => !prevState);

    return (
        <ExerciseWrapper>
            <Badge.Ribbon text={group} color={'#aaa'}>
                <Card size={'small'} onClick={toggleModal}>
                    <BodyPartsTags bodyParts={bodyParts} />
                    <Title level={4}>{capitalize(name)}</Title>
                    {isWorkoutCompleted && <Statistic title="Результат" suffix={units} value={exerciseResult} />}
                </Card>
            </Badge.Ribbon>
            <Modal footer={null} open={isModalOpen} onCancel={toggleModal} centered={true}>
                <ExerciseCard {...{ sequenceNumber, exerciseKey }} />
            </Modal>
        </ExerciseWrapper>
    );
};

Exercise.propTypes = {
    sequenceNumber: PropTypes.number.isRequired,
    exerciseKey: PropTypes.string.isRequired
};

export default Exercise;
