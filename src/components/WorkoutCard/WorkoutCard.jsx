import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, DatePicker, Divider, Space, message } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
    completeCurrentWorkout,
    getUserCurrentWorkout,
    getUserSchedule,
    updateUserSchedule,
    getCurrentWorkoutSchedule
} from '../../store/user';

const WorkoutCard = ({ sequenceNumber, complexityLevel, kindName, typeName, exercises }) => {
    const [planedDate, setPlanedDate] = useState(null);
    const dispatch = useDispatch();
    const userCurrentWorkout = useSelector(getUserCurrentWorkout());
    const userSchedule = useSelector(getUserSchedule());
    const currentWorkoutSchedule = useSelector(getCurrentWorkoutSchedule());

    const lastWorkoutCompleted = Object.values(userSchedule).find(
        (item) => item.sequenceNumber === userCurrentWorkout - 1
    );
    const nowDate = moment().format('YYYYMMDD');
    const isWorkoutCompleteUnable = String(lastWorkoutCompleted.date) === nowDate;

    const disabledDate = (current) => {
        return current && current < moment().endOf('day');
    };

    const handleDatePick = (date) => {
        setPlanedDate(date);
    };

    const submitToSchedule = () => {
        dispatch(updateUserSchedule(sequenceNumber, planedDate.format('YYYYMMDD')));
        setPlanedDate('');
    };

    const completeWorkout = () => {
        if (isWorkoutCompleteUnable) {
            message.error('Сегодня Вы уже завершили одну тренировку. Запланируйте следующую на другой день.');
        } else {
            dispatch(completeCurrentWorkout());
        }
    };

    return (
        <div>
            <div>
                <p>Номер: {sequenceNumber}</p>
                <p>Сложность: {complexityLevel}</p>
                <p>Вид: {kindName}</p>
                <p>Тип: {typeName}</p>
            </div>
            <div>
                {currentWorkoutSchedule ? (
                    <p>Тренировка запланирована на {moment(currentWorkoutSchedule).format('DD MMMM YYYY')} г.</p>
                ) : (
                    ''
                )}
                {sequenceNumber === userCurrentWorkout ? (
                    <>
                        <Divider>Планирование тренировки</Divider>
                        <Space>
                            <DatePicker
                                disabledDate={disabledDate}
                                format={'DD.MM.YYYY'}
                                showToday={false}
                                value={planedDate}
                                onChange={(value) => handleDatePick(value)}
                            />
                            <Button type="primary" onClick={submitToSchedule}>
                                Запланировать
                            </Button>
                            <Button type="ghost" onClick={completeWorkout}>
                                Завершить
                            </Button>
                        </Space>
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

WorkoutCard.propTypes = {
    sequenceNumber: PropTypes.number.isRequired,
    complexityLevel: PropTypes.number.isRequired,
    kindName: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
    exercises: PropTypes.arrayOf(
        PropTypes.shape({
            group: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            bodyParts: PropTypes.arrayOf(PropTypes.string).isRequired
        })
    ).isRequired
};

export default WorkoutCard;
