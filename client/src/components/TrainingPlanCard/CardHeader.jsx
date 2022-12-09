import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCirclePlay, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { blue, lime, orange } from '@ant-design/colors';
import { gray } from '../StyledComponents';
import { BottomText, ColorBadge, HeaderWrapper, LeftIcon, RightIcon, TextWrapper, TopText } from './styles';
import moment from 'moment';

const CardHeader = ({ completeStatus, sequenceNumber, workoutDate }) => {
    const getCompleteIcon = () => {
        switch (completeStatus) {
            case 'completed':
                return <FontAwesomeIcon icon={faCircleCheck} color={lime[5]} />;

            case 'current':
                return <FontAwesomeIcon icon={faCirclePlay} color={orange[5]} />;

            default:
                return <FontAwesomeIcon icon={faCircleCheck} color={gray[3]} />;
        }
    };

    const getPlannedIcon = () => {
        if (completeStatus === 'completed') {
            return <ColorBadge color={lime[5]}>{moment(workoutDate).format('DD.MM.YY')}</ColorBadge>;
        }

        if (completeStatus === 'current' && workoutDate !== '0') {
            return <ColorBadge color={blue[5]}>{moment(workoutDate).format('DD.MM.YY')}</ColorBadge>;
        }

        return <FontAwesomeIcon icon={faCalendarDays} color={gray[3]} />;
    };

    return (
        <HeaderWrapper>
            <LeftIcon>{getCompleteIcon()}</LeftIcon>
            <RightIcon>{getPlannedIcon()}</RightIcon>
            <TextWrapper>
                <TopText>Тренировка</TopText>
                <BottomText>{sequenceNumber}</BottomText>
            </TextWrapper>
        </HeaderWrapper>
    );
};

CardHeader.propTypes = {
    completeStatus: PropTypes.string,
    sequenceNumber: PropTypes.number.isRequired,
    workoutDate: PropTypes.string
};

export default CardHeader;
