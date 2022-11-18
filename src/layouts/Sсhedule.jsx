import React, { useState } from 'react';
import { Button, Calendar, Col, Row, Divider, Statistic, Tag } from 'antd';
import { LeftOutlined, CarryOutOutlined, RightOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/ru';
import { useSelector } from 'react-redux';
import { getUserCurrentWorkout, getUserSchedule } from '../store/user';
import { getTrainingPlan } from '../store/trainingPlan';
import { Link } from 'react-router-dom';
moment.locale('ru');

const Sсhedule = () => {
    const [date, setDate] = useState(moment());

    const userSchedule = useSelector(getUserSchedule());
    const currentWorkout = useSelector(getUserCurrentWorkout());
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
        <Row justify={'center'}>
            <Col>
                <Statistic value={date.format('DD MMMM YYYY')} />
                <Button onClick={() => handleClick('minus')}>
                    <LeftOutlined />
                </Button>
                <Divider type="vertical" />
                <Button onClick={() => handleClick('now')}>
                    <CarryOutOutlined />
                </Button>
                <Divider type="vertical" />
                <Button onClick={() => handleClick('plus')}>
                    <RightOutlined />
                </Button>
            </Col>
        </Row>
    );

    const getWorkoutTag = (workoutNumber) => {
        const workout = trainingPlan[workoutNumber - 1];
        const color = currentWorkout === workout.sequenceNumber ? '#f50' : '#87d068';
        return (
            <Link to={`/workouts/${workoutNumber}`}>
                <Row justify={'end'}>
                    <Col>
                        <Tag
                            style={{ color: '#000' }}
                            color={color}>{`Тренировка ${workout.sequenceNumber}${workout.kindName}`}</Tag>
                    </Col>
                </Row>
            </Link>
        );
    };

    const onCellRender = (value) => {
        if (userSchedule && currentWorkout && trainingPlan) {
            const workoutNumber = userSchedule.findIndex((el) => el === value.format('YYYYMMDD'));
            if (workoutNumber > 0) {
                return getWorkoutTag(workoutNumber);
            }
        }
    };

    const handleSelect = (selectedDate) => {
        setDate(selectedDate);
    };

    return (
        <>
            <h3>Расписание и планировщик</h3>
            <div>
                <Row justify={'center'}>
                    <Col span={16}>
                        <Calendar
                            headerRender={onHeaderRender}
                            dateCellRender={onCellRender}
                            value={date}
                            onSelect={(selected) => handleSelect(selected)}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Sсhedule;
