import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getWorkoutByNumber } from '../../store/workouts';
import exPhotoA from '../../assets/exercise19-1.png';
import exPhotoB from '../../assets/exercise19-2.png';
import { capitalize } from '../../utils/capitalize';
import BodyPartsTags from '../BodyPartsTags';
import {
    CardBadges,
    CardHeader,
    CardPhoto,
    CardText,
    CardTitle,
    CardWrapper,
    LightBadge,
    ModalWrapper,
    Photo
} from './styles';

const lorem =
    'Банальные, но неопровержимые выводы, а также сделанные на базе интернет-аналитики выводы будут призваны к ответу. Учитывая ключевые сценарии поведения, перспективное планирование требует анализа укрепления моральных ценностей. Как принято считать, активно развивающиеся страны третьего мира могут быть рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Повседневная практика показывает, что современная методология разработки, а также свежий взгляд на привычные вещи — безусловно открывает новые горизонты для стандартных подходов. Повседневная практика показывает, что укрепление и развитие внутренней структуры однозначно фиксирует необходимость экспериментов, поражающих по своей масштабности и грандиозности.';

const ExerciseCard = ({ sequenceNumber, exerciseKey }) => {
    const workout = useSelector(getWorkoutByNumber(sequenceNumber));
    const exercise = workout.exercises[exerciseKey];
    return (
        <ModalWrapper>
            <CardWrapper>
                <CardHeader>
                    <CardPhoto>
                        <Photo src={exPhotoA} />
                        <Photo src={exPhotoB} />
                    </CardPhoto>
                </CardHeader>
                <CardTitle>{capitalize(exercise.name)}</CardTitle>
                <CardText>{lorem}</CardText>
            </CardWrapper>
            <CardBadges>
                <LightBadge>{exercise.group}</LightBadge>
                <BodyPartsTags bodyParts={exercise.bodyParts} size={'small'} />
            </CardBadges>
        </ModalWrapper>
    );
};

ExerciseCard.propTypes = {
    sequenceNumber: PropTypes.number.isRequired,
    exerciseKey: PropTypes.string.isRequired
};

export default ExerciseCard;
