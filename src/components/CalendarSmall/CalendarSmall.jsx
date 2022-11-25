/** @jsxImportSource @emotion/react */

import React from 'react';
import { Calendar, Col, Row, Statistic } from 'antd';
//* styles
import { StyledCell } from './styles';
import { useSelector } from 'react-redux';
import { getUserCurrentWorkout, getUserSchedule } from '../../store/user';
import { getTrainingPlan } from '../../store/trainingPlan';
import moment from 'moment';
import { Link } from 'react-router-dom';

const CalendarSmall = () => {
    const userSchedule = useSelector(getUserSchedule());
    const currentWorkout = useSelector(getUserCurrentWorkout());
    const trainingPlan = useSelector(getTrainingPlan());

    const onHeaderRender = ({ value }) => {
        return (
            <Row justify={'end'}>
                <Col>
                    <Statistic title={moment().format('DD.MM.YYYY')} valueRender={() => ''} />
                </Col>
            </Row>
        );
    };

    const onCellRender = (value) => {
        if (userSchedule && currentWorkout && trainingPlan) {
            const scheduleItem = Object.values(userSchedule).find(
                (item) => String(item.date) === value.format('YYYYMMDD')
            );
            if (scheduleItem) {
                const workoutStatus = scheduleItem.sequenceNumber === currentWorkout ? 'current' : 'completed';
                return <StyledCell workoutStatus={workoutStatus}>{value.format('DD')}</StyledCell>;
            } else {
                return <StyledCell workoutStatus={'none'}>{value.format('DD')}</StyledCell>;
            }
        } else {
            return value.format('DD');
        }
    };

    return (
        <div>
            <Link to={'/schedule'}>
                <Calendar fullscreen={false} headerRender={onHeaderRender} dateFullCellRender={onCellRender} />
            </Link>
        </div>
    );
};

export default CalendarSmall;
