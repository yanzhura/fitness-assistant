import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import styles from './TrainingPlanCard.module.css';
import { Link } from 'react-router-dom';

const headStyles = {
    complete: {
        backgroundColor: '#c0ff85'
    },
    current: {
        backgroundColor: '#ffac85'
    },
    incomplete: {
        backgroundColor: '#cecece'
    }
};

const TrainingPlanCard = ({
    sequenceNumber,
    complexityLevel,
    kindName,
    typeName,
    exerciseGroupNames,
    completeStatus
}) => {
    return (
        <Link to={`/workouts/${sequenceNumber}`}>
            <Card
                title={`Тренировка ${sequenceNumber}`}
                extra={<p>{typeName}</p>}
                size={'small'}
                headStyle={headStyles[completeStatus]}
                className={styles.card_override}>
                <p>Вид: {kindName}</p>
                <p>Сложность: {complexityLevel}</p>
                <p>Виды упражнений: {exerciseGroupNames}</p>
            </Card>
        </Link>
    );
};

TrainingPlanCard.propTypes = {
    sequenceNumber: PropTypes.number.isRequired,
    complexityLevel: PropTypes.number.isRequired,
    kindName: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
    exerciseGroupNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    completeStatus: PropTypes.string.isRequired
};

export default TrainingPlanCard;

// TODO Переделать стили на @emotion/styled
