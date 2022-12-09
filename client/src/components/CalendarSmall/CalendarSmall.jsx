import React from 'react';
import { Calendar } from 'antd';
//* styles
import { CalendarHeader, DarkBadge, StyledCell } from './styles';
import { useSelector } from 'react-redux';
import { getUserCompletedWorkouts, getUserCurrentWorkout, getUserSchedule } from '../../store/user';
import { getTrainingPlan } from '../../store/trainingPlan';
import moment from 'moment';
import { Link } from 'react-router-dom';

const CalendarSmall = () => {
    const userSchedule = useSelector(getUserSchedule());
    const currentWorkout = useSelector(getUserCurrentWorkout());
    const userCompletedWorkouts = useSelector(getUserCompletedWorkouts());
    const trainingPlan = useSelector(getTrainingPlan());

    const onHeaderRender = () => {
        return (
            <CalendarHeader>
                <DarkBadge>{moment().format('DD.MM.YYYY')}</DarkBadge>
            </CalendarHeader>
        );
    };

    const onCellRender = (value) => {
        if (userSchedule && currentWorkout && trainingPlan) {
            const scheduleItem = userSchedule.find((item) => String(item.date) === value.format('YYYYMMDD'));
            if (scheduleItem) {
                const workoutStatus = scheduleItem.workout <= userCompletedWorkouts ? 'completed' : 'current';
                return <StyledCell workoutStatus={workoutStatus}>{value.format('DD')}</StyledCell>;
            } else {
                return <StyledCell workoutStatus={'none'}>{value.format('DD')}</StyledCell>;
            }
        } else {
            return value.format('DD');
        }
    };

    return (
        <Link to={'/schedule'}>
            <Calendar fullscreen={false} headerRender={onHeaderRender} dateFullCellRender={onCellRender} />
        </Link>
    );
};

export default CalendarSmall;
