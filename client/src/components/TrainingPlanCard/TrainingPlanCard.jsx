import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardHeader from './CardHeader';
import { capitalize } from '../../utils/capitalize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
//* styles
import {
    BackgroudNumber,
    DarkBadge,
    CardBody,
    CardLine,
    CardText,
    StyledCard,
    Label,
    LightBadge,
    GroupsBadges,
    StyledHr
} from './styles';
import { useSelector } from 'react-redux';
import { getScheduleByWorkout } from '../../store/user';

const TrainingPlanCard = ({ sequenceNumber, level, kind, type, exerciseGroups, completeStatus, plannedStatus }) => {
    const getExerciseGroups = () => {
        return exerciseGroups.map((g, index) => (
            <LightBadge key={index}>
                <FontAwesomeIcon icon={faDumbbell} /> {g}
            </LightBadge>
        ));
    };

    const workoutSchedule = useSelector(getScheduleByWorkout(sequenceNumber));
    const workoutDate = workoutSchedule ? workoutSchedule.date : '0';

    return (
        <Link to={`/workouts/${sequenceNumber}`}>
            <StyledCard
                status={completeStatus}
                title={<CardHeader {...{ completeStatus, plannedStatus, sequenceNumber, workoutDate }} />}
                size={'small'}>
                <CardBody>
                    <CardText>
                        <CardLine>
                            <Label>Уровень сложности</Label>
                            <DarkBadge>{level}</DarkBadge>
                        </CardLine>
                        <CardLine>
                            <Label>Вид тренировки</Label>
                            <DarkBadge>{capitalize(kind)}</DarkBadge>
                        </CardLine>
                        <StyledHr />
                        <CardLine>
                            <Label>Набор упражнений</Label>
                            <DarkBadge>{type}</DarkBadge>
                        </CardLine>
                        <GroupsBadges>{getExerciseGroups()}</GroupsBadges>
                    </CardText>
                    <BackgroudNumber>{sequenceNumber}</BackgroudNumber>
                </CardBody>
            </StyledCard>
        </Link>
    );
};

TrainingPlanCard.propTypes = {
    sequenceNumber: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    kind: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    exerciseGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
    completeStatus: PropTypes.string.isRequired,
    plannedStatus: PropTypes.string
};

export default TrainingPlanCard;
