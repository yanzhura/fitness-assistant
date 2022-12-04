import React, { useState } from 'react';
import { Button, Calendar, Divider } from 'antd';
import { LeftOutlined, CarryOutOutlined, RightOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/ru';
import { useSelector } from 'react-redux';
import { getUserCompletedWorkouts, getUserCurrentWorkout, getUserSchedule } from '../../store/user';
import { getTrainingPlan } from '../../store/trainingPlan';
import { Link } from 'react-router-dom';
import HelpDrawer from '../../components/HelpDrawer/HelpDrawer';
import { AboutSchedule } from '../../pages/QuickTour';
import { ButtonsBox, CalendarHeader, DateBox, StyledTag } from './styles';
import { LayoutColumn, LayoutWrapper, StyledTitle } from '../../components/StyledComponents';

moment.locale('ru');

const Schedule = () => {
    const [date, setDate] = useState(moment());

    const userSchedule = useSelector(getUserSchedule());
    const currentWorkout = useSelector(getUserCurrentWorkout());
    const userCompletedWorkouts = useSelector(getUserCompletedWorkouts());
    const trainingPlan = useSelector(getTrainingPlan());

    const handleClick = (action) => {
        switch (action) {
            case 'minus':
                setDate((oldDate) => moment(oldDate).subtract(1, 'month'));
                break;
            case 'plus':
                setDate((oldDate) => moment(oldDate).add(1, 'month'));
                break;
            case 'now':
                setDate(moment());
                break;
            default:
                break;
        }
    };

    const onHeaderRender = () => (
        <CalendarHeader>
            <DateBox>{date.format('DD MMMM YYYY')}</DateBox>
            <ButtonsBox>
                <Button size="small" onClick={() => handleClick('minus')}>
                    <LeftOutlined />
                </Button>
                <Divider type="vertical" />
                <Button size="small" onClick={() => handleClick('now')}>
                    <CarryOutOutlined />
                </Button>
                <Divider type="vertical" />
                <Button size="small" onClick={() => handleClick('plus')}>
                    <RightOutlined />
                </Button>
            </ButtonsBox>
        </CalendarHeader>
    );

    const getWorkoutTag = (workoutNumber) => {
        const workout = trainingPlan[workoutNumber - 1];
        const workoutStatus = workoutNumber <= userCompletedWorkouts ? 'completed' : 'current';
        return (
            <Link to={`/workouts/${workoutNumber}`}>
                <StyledTag status={workoutStatus}>{`Тренировка ${workout.sequenceNumber}${workout.kindName}`}</StyledTag>
            </Link>
        );
    };

    const onCellRender = (value) => {
        if (userSchedule && currentWorkout && trainingPlan) {
            const scheduleItem = Object.values(userSchedule).find(
                (item) => String(item.date) === value.format('YYYYMMDD')
            );
            if (scheduleItem) {
                return getWorkoutTag(scheduleItem.sequenceNumber);
            }
        }
    };

    const handleSelect = (selectedDate) => {
        setDate(selectedDate);
    };

    return (
        <LayoutWrapper>
            <LayoutColumn>
                <StyledTitle level="3">Календарь</StyledTitle>
                <Calendar
                    headerRender={onHeaderRender}
                    dateCellRender={onCellRender}
                    value={date}
                    onSelect={(selected) => handleSelect(selected)}
                />
                <HelpDrawer>
                    <AboutSchedule />
                </HelpDrawer>
            </LayoutColumn>
        </LayoutWrapper>
    );
};

export default Schedule;
