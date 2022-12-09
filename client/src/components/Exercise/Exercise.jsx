import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
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

const Exercise = ({ sequenceNumber, exercise }) => {
    const userSchedule = useSelector(getUserSchedule());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userCompletedWorkouts = useSelector(getUserCompletedWorkouts());

    const isWorkoutCompleted = sequenceNumber <= userCompletedWorkouts;
    const { name, bodyParts, bodyWeight } = exercise;
    const { results } = isWorkoutCompleted ? userSchedule.find((w) => w.workout === sequenceNumber) : { results: 0 };
    const { count } = isWorkoutCompleted ? results.find((res) => res.exercise === exercise._id) : { count: 0 };
    const units = bodyWeight ? repeatsDeclension(count) : 'кг';

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
                        {isWorkoutCompleted ? count : <FontAwesomeIcon icon={faEllipsis} color={gray[6]} />}
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
                <ExerciseCard {...{ sequenceNumber, exercise }} />
            </Modal>
        </>
    );
};

Exercise.propTypes = {
    sequenceNumber: PropTypes.number.isRequired,
    exercise: PropTypes.object
};

export default Exercise;
