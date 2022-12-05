import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCirclePlay, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { lime, orange, blue } from '@ant-design/colors';
import { gray } from '../StyledComponents';
import { BottomText, HeaderWrapper, LeftIcon, RightIcon, TextWrapper, TopText } from './styles';

const CardHeader = ({ completeStatus, plannedStatus, sequenceNumber }) => {
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
        switch (plannedStatus) {
            case 'planned':
                return <FontAwesomeIcon icon={faCalendarDays} color={blue[5]} />;

            default:
                return <FontAwesomeIcon icon={faCalendarDays} color={gray[3]} />;
        }
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
    plannedStatus: PropTypes.string,
    sequenceNumber: PropTypes.number.isRequired
};

export default CardHeader;
