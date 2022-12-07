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

const TrainingPlanCard = ({
    sequenceNumber,
    complexityLevel,
    kindName,
    typeName,
    exerciseGroupNames,
    completeStatus,
    plannedStatus
}) => {
    const getExerciseGroups = () => {
        return exerciseGroupNames.map((g, index) => (
            <LightBadge key={index}>
                <FontAwesomeIcon icon={faDumbbell} /> {g}
            </LightBadge>
        ));
    };

    return (
        <Link to={`/workouts/${sequenceNumber}`}>
            <StyledCard
                status={completeStatus}
                title={<CardHeader {...{ completeStatus, plannedStatus, sequenceNumber }} />}
                size={'small'}>
                <CardBody>
                    <CardText>
                        <CardLine>
                            <Label>Уровень сложности</Label>
                            <DarkBadge>{complexityLevel}</DarkBadge>
                        </CardLine>
                        <CardLine>
                            <Label>Вид тренировки</Label>
                            <DarkBadge>{capitalize(typeName)}</DarkBadge>
                        </CardLine>
                        <StyledHr />
                        <CardLine>
                            <Label>Набор упражнений</Label>
                            <DarkBadge>{kindName}</DarkBadge>
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
    complexityLevel: PropTypes.number.isRequired,
    kindName: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
    exerciseGroupNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    completeStatus: PropTypes.string.isRequired,
    plannedStatus: PropTypes.string
};

export default TrainingPlanCard;
