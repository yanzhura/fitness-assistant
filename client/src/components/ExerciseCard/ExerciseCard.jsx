import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from '../../utils/capitalize';
import BodyPartsTags from '../BodyPartsTags';
import appConfig from '../../App.config';
//* styles
import {
    BigTitle,
    CardBadges,
    CardHeader,
    CardText,
    CardWrapper,
    LightBadge,
    ModalWrapper,
    Photo,
    SmallTitle
} from './styles';

const ExerciseCard = ({ exercise }) => {
    const { description } = exercise;
    const { photoId, execution, completion, annotation } = description;
    return (
        <ModalWrapper>
            <CardWrapper>
                <CardHeader>
                    <Photo src={`${appConfig.staticUrl}/exercises/${photoId}left.jpg`} />
                    <Photo src={`${appConfig.staticUrl}/exercises/${photoId}right.jpg`} />
                </CardHeader>
                <BigTitle>{capitalize(exercise.name)}</BigTitle>
                <CardText>
                    <div>
                        <SmallTitle>Сколько выполнять</SmallTitle>
                        {execution}
                    </div>
                    <div>
                        <SmallTitle>Что записать в результат</SmallTitle>
                        {completion}
                    </div>
                    <div>
                        <SmallTitle>Как выполнять</SmallTitle>
                        {annotation}
                    </div>
                </CardText>
            </CardWrapper>
            <CardBadges>
                <LightBadge>{exercise.group}</LightBadge>
                <BodyPartsTags bodyParts={exercise.bodyParts} size={'small'} />
            </CardBadges>
        </ModalWrapper>
    );
};

ExerciseCard.propTypes = {
    exercise: PropTypes.object.isRequired
};

export default ExerciseCard;
