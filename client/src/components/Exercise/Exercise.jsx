import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { getWorkoutByNumber } from '../../store/workouts';
import { capitalize } from '../../utils/capitalize';
import BodyPartsTags from '../BodyPartsTags/BodyPartsTags';
import { getUserCompletedWorkouts, getUserSchedule } from '../../store/user';
import { repeatsDeclension } from '../../utils/declensions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import exImage from '../../assets/exercise19-1.png';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
//* styles
import {
    ExercisePhoto,
    ExerciseResult,
    ExerciseText,
    ExerciseWrapper,
    Photo,
    PhotoFrame,
    ResultNumber,
    ResultUnits,
    TextTags,
    TextTitle
} from './styles';
import { gray } from '../StyledComponents';

const Exercise = ({ sequenceNumber, exerciseKey }) => {
    const userSchedule = useSelector(getUserSchedule());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const workout = useSelector(getWorkoutByNumber(sequenceNumber));
    const userCompletedWorkouts = useSelector(getUserCompletedWorkouts());

    const isWorkoutCompleted = sequenceNumber <= userCompletedWorkouts;
    const { name, bodyParts, bodyWeight } = workout.exercises[exerciseKey];
    const { result } = isWorkoutCompleted ? userSchedule[`workout${sequenceNumber}`] : { result: 0 };
    const exerciseResult = isWorkoutCompleted && result[exerciseKey];
    const units = bodyWeight ? repeatsDeclension(exerciseResult) : 'кг';

    const toggleModal = () => setIsModalOpen((prevState) => !prevState);

    return (
        <>
            <ExerciseWrapper onClick={toggleModal}>
                <PhotoFrame>
                    <ExercisePhoto>
                        <Photo src={exImage} />
                    </ExercisePhoto>
                </PhotoFrame>
                <ExerciseResult>
                    <ResultNumber>
                        {isWorkoutCompleted ? exerciseResult : <FontAwesomeIcon icon={faEllipsis} color={gray[6]} />}
                    </ResultNumber>
                    <ResultUnits>{units}</ResultUnits>
                </ExerciseResult>
                <ExerciseText>
                    <TextTitle>{capitalize(name)}</TextTitle>
                    <TextTags>
                        <BodyPartsTags bodyParts={bodyParts} />
                    </TextTags>
                </ExerciseText>
            </ExerciseWrapper>
            <Modal footer={null} open={isModalOpen} onCancel={toggleModal} centered={true} width={400}>
                <ExerciseCard {...{ sequenceNumber, exerciseKey }} />
            </Modal>
        </>
    );
};

Exercise.propTypes = {
    sequenceNumber: PropTypes.number.isRequired,
    exerciseKey: PropTypes.string.isRequired
};

export default Exercise;
