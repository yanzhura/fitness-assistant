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
    getCurrentWorkoutSchedule,
    getUserCompletedWorkouts
} from '../../store/user';
import Exercise from '../Exercise';
import { capitalize } from '../../utils/capitalize';
import customHistory from '../../utils/customHistory';
import { getWorkoutByNumber } from '../../store/workouts';

const WorkoutCard = ({ sequenceNumber }) => {
    const dispatch = useDispatch();

    const [planedDate, setPlanedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { complexityLevel, kindName, typeName, exercises } = useSelector(getWorkoutByNumber(sequenceNumber));
    const userCurrentWorkout = useSelector(getUserCurrentWorkout());
    const userCompletedWorkouts = useSelector(getUserCompletedWorkouts());
    const userSchedule = useSelector(getUserSchedule());
    const currentWorkoutSchedule = useSelector(getCurrentWorkoutSchedule());
    const [form] = Form.useForm();

    const lastWorkoutCompleted =
        userCurrentWorkout > 1 &&
        Object.values(userSchedule).find((item) => item.sequenceNumber === userCurrentWorkout - 1);

    const nowDate = moment().format('YYYYMMDD');
    const isWorkoutCompleteUnable = userCurrentWorkout > 1 && lastWorkoutCompleted.date === nowDate;

    const disabledPastDates = (current) => {
        return current && current < moment().endOf('day');
    };

    const disabledFutureDates = (current) => {
        return (
            (current && current < moment(lastWorkoutCompleted.date).endOf('day')) || current >= moment().endOf('day')
        );
    };

    const handleDatePick = (date) => {
        setPlanedDate(date);
    };

    const submitToSchedule = () => {
        dispatch(updateUserSchedule(sequenceNumber, planedDate.format('YYYYMMDD')));
        setPlanedDate('');
    };

    const getCompleteInfo = () => {
        if (sequenceNumber <= userCompletedWorkouts) {
            const completeDate = userSchedule[`workout${sequenceNumber}`].date;
            return <p>{`Тренировка завершена ${moment(completeDate).format('DD MMMM YYYY')} г.`}</p>;
        } else if (sequenceNumber === 1 && currentWorkoutSchedule.date === 0) {
            return <p>Это ваша первая тренировка. Она ещё не запланирована.</p>;
        } else if (sequenceNumber === userCurrentWorkout) {
            if (currentWorkoutSchedule) {
                return (
                    <p>{`Тренировка запланирована на ${moment(currentWorkoutSchedule.date).format(
                        'DD MMMM YYYY'
                    )} г.`}</p>
                );
            }
        }
    };

    const getExercisesElements = () => {
        return Object.keys(exercises).map((key) => {
            return <Exercise key={key} workoutNumber={sequenceNumber} exerciseKey={key} />;
        });
    };

    const modalOpen = () => {
        if (isWorkoutCompleteUnable) {
            message.error('Сегодня Вы уже завершили одну тренировку. Запланируйте следующую на другой день.');
        } else {
            setIsModalOpen(true);
        }
    };

    const modalCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const modalOk = () => {
        form.submit();
    };

    const formSubmit = ({ completeDate, ...rest }) => {
        dispatch(
            completeCurrentWorkout({
                completeDate: completeDate.format('YYYYMMDD'),
                workoutResult: rest
            })
        );
        form.resetFields();
        setIsModalOpen(false);
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

    const handleBackButton = () => {
        customHistory.goBack();
    };

    return (
        <div>
            <Button onClick={handleBackButton}>Назад</Button>
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
                        <Space direction="vertical" size={'middle'}>
                            <Space>
                                <DatePicker
                                    disabledDate={disabledPastDates}
                                    format={'DD.MM.YYYY'}
                                    showToday={false}
                                    value={planedDate}
                                    onChange={(value) => handleDatePick(value)}
                                />
                                <Button type="primary" onClick={submitToSchedule} disabled={!planedDate}>
                                    Запланировать
                                </Button>
                            </Space>
                            <div>
                                <Button type="ghost" onClick={modalOpen}>
                                    Внести результаты и завершить
                                </Button>
                            </div>
                        </Space>
                    </>
                ) : (
                    ''
                )}
            </div>
            <Modal open={isModalOpen} closable={false} destroyOnClose={true} footer={modalFooter} centered={true}>
                <Divider>Результаты тренировки</Divider>
                <Form
                    name="workoutResults"
                    form={form}
                    onFinish={formSubmit}
                    requiredMark={false}
                    colon={false}
                    labelCol={{ span: 18 }}
                    labelAlign={'left'}
                    initialValues={{
                        completeDate: moment()
                    }}>
                    {getFormElemetns()}
                    <Divider>Дата завершения</Divider>
                    <Form.Item key={'datepicker'} name="completeDate" label={'   '}>
                        <DatePicker disabledDate={disabledFutureDates} format={'DD.MM.YYYY'} showToday={true} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

WorkoutCard.propTypes = {
    sequenceNumber: PropTypes.number.isRequired
};

export default WorkoutCard;
