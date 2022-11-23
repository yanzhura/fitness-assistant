import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, DatePicker, Divider, Modal, Space, message, Form, InputNumber } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
    completeCurrentWorkout,
    getUserCurrentWorkout,
    getUserSchedule,
    updateUserSchedule,
    getCurrentWorkoutSchedule
} from '../../store/user';
import Exercise from '../Exercise';
import { capitalize } from '../../utils/capitalize';

const WorkoutCard = ({ sequenceNumber, complexityLevel, kindName, typeName, exercises }) => {
    const [planedDate, setPlanedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const userCurrentWorkout = useSelector(getUserCurrentWorkout());
    const userSchedule = useSelector(getUserSchedule());
    const currentWorkoutSchedule = useSelector(getCurrentWorkoutSchedule());
    const [form] = Form.useForm();

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

    const completeWorkout = (workoutResult) => {
        if (isWorkoutCompleteUnable) {
            message.error('Сегодня Вы уже завершили одну тренировку. Запланируйте следующую на другой день.');
        } else {
            dispatch(completeCurrentWorkout(workoutResult));
        }
    };

    const getCompleteInfo = () => {
        if (currentWorkoutSchedule) {
            if (sequenceNumber === userCurrentWorkout) {
                return (
                    <p>Тренировка запланирована на {moment(currentWorkoutSchedule.date).format('DD MMMM YYYY')} г.</p>
                );
            } else {
                return <p>Тренировка завершена {moment(currentWorkoutSchedule.date).format('DD MMMM YYYY')} г.</p>;
            }
        }
    };

    const getExercisesElements = () => {
        return Object.keys(exercises).map((e) => {
            return <Exercise key={exercises[e].name} {...exercises[e]} />;
        });
    };

    const modalOpen = () => {
        setIsModalOpen(true);
    };

    const modalCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const modalOk = () => {
        form.submit();
    };

    const formSubmit = (values) => {
        completeWorkout(values);
    };

    const modalFooter = [
        <Button key={1} type="ghost" onClick={modalCancel}>
            Отмена
        </Button>,
        <Button key={2} type="primary" onClick={modalOk}>
            Завершить
        </Button>
    ];

    const getFormElemetns = () => {
        return Object.keys(exercises).map((key) => {
            const units = exercises[key].bodyWeight ? 'раз' : 'кг';
            const step = exercises[key].bodyWeight ? 1 : 0.5;
            return (
                <Form.Item
                    key={key}
                    name={key}
                    label={capitalize(exercises[key].name)}
                    rules={[
                        {
                            required: true,
                            message: 'Заполните результат упражнения'
                        }
                    ]}>
                    <InputNumber decimalSeparator={','} precision={1} min={0} prefix={units} step={step} />
                </Form.Item>
            );
        });
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
                <h4>Упражнения</h4>
                <div>{getExercisesElements()}</div>
            </div>
            <div>
                {getCompleteInfo()}
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
                            <Button type="ghost" onClick={modalOpen}>
                                Внести результаты и завершить
                            </Button>
                        </Space>
                    </>
                ) : (
                    ''
                )}
            </div>
            <Modal open={isModalOpen} closable={false} destroyOnClose={true} footer={modalFooter} centered={true}>
                <div>Фиксация результатов упражнений</div>
                <Form
                    name="workoutResults"
                    form={form}
                    onFinish={formSubmit}
                    requiredMark={'optional'}
                    colon={false}
                    labelCol={{ span: 19 }}
                    labelAlign={'left'}>
                    {getFormElemetns()}
                </Form>
            </Modal>
        </div>
    );
};

WorkoutCard.propTypes = {
    sequenceNumber: PropTypes.number.isRequired,
    complexityLevel: PropTypes.number.isRequired,
    kindName: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
    exercises: PropTypes.object.isRequired
};

export default WorkoutCard;
