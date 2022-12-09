import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, DatePicker, Modal, message, Form, InputNumber, Space, Popconfirm } from 'antd';
import moment from 'moment';
import {
    completeCurrentWorkout,
    getScheduleByWorkout,
    getUserCompletedWorkouts,
    getUserCurrentWorkout,
    getUserSchedule,
    updateUserSchedule
} from '../../store/user';
import Exercise from '../Exercise';
import { capitalize } from '../../utils/capitalize';
import customHistory from '../../utils/customHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDays,
    faCircleCheck,
    faCirclePlay,
    faDumbbell,
    faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';
import {
    CardBody,
    CardFooter,
    CardHeader,
    CardInfo,
    CardLabels,
    CardLine,
    CardStatus,
    CardWrapper,
    DarkBadge,
    CardBadges,
    HeaderNumber,
    HeaderText,
    HeaderTitle,
    Label,
    LightBadge,
    StatusIcon,
    StatusLine,
    ExercisesWrapper,
    FooterPlan,
    BackgroudNumber,
    CompleteWrapper,
    CompleteTitle,
    CompleteForm
} from './styles';
import { blue, lime, orange, red } from '@ant-design/colors';
import { gray, StyledTitle } from '../StyledComponents';
import { getExercisesForWorkout, getWorkoutByNumber } from '../../store/trainingPlan';

const WorkoutCard = ({ sequenceNumber }) => {
    const dispatch = useDispatch();

    const [planedDate, setPlanedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { level, kind, type, exerciseGroups } = useSelector(getWorkoutByNumber(sequenceNumber));
    const fullExercises = useSelector(getExercisesForWorkout(sequenceNumber));
    const userCurrentWorkout = useSelector(getUserCurrentWorkout());
    const userSchedule = useSelector(getUserSchedule());
    const workoutSchedule = useSelector(getScheduleByWorkout(sequenceNumber));
    const userCompletedWorkouts = useSelector(getUserCompletedWorkouts());

    const [form] = Form.useForm();
    const { pathname } = useLocation();

    const lastWorkoutCompleted = userSchedule[userCompletedWorkouts - 1];
    const lastCompletedDate = lastWorkoutCompleted?.date ? lastWorkoutCompleted.date : null;

    const nowDate = moment().format('YYYYMMDD');
    const isWorkoutCompleteUnable = lastCompletedDate === nowDate;

    const disabledPastDates = (current) => {
        if (isWorkoutCompleteUnable) {
            return current && current < moment().endOf('day');
        }

        return current && current < moment().subtract(1, 'day');
    };

    const disabledFutureDates = (current) => {
        if (lastCompletedDate) {
            return (
                (current && current < moment(lastWorkoutCompleted.date).endOf('day')) ||
                current >= moment().endOf('day')
            );
        }

        return current >= moment().endOf('day');
    };

    const handleDatePick = (date) => {
        setPlanedDate(date);
    };

    const submitToSchedule = () => {
        dispatch(updateUserSchedule(sequenceNumber, planedDate.format('YYYYMMDD')));
        setPlanedDate('');
    };

    const getExercisesElements = () => {
        return fullExercises.map((exercise, index) => {
            return <Exercise key={index} sequenceNumber={sequenceNumber} exercise={exercise} />;
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
        <Popconfirm
            key={2}
            title="Внесённые результаты нельзя отменить. Продолжить?"
            onConfirm={modalOk}
            okText="Да"
            cancelText="Нет"
            icon={<FontAwesomeIcon icon={faTriangleExclamation} color={red[5]} />}>
            <Button type="primary">ОК</Button>
        </Popconfirm>
    ];

    const getFormElemetns = () => {
        return fullExercises.map((exercise, index) => {
            const units = exercise.bodyWeight ? 'раз' : 'кг';
            const step = exercise.bodyWeight ? 1 : 0.5;
            const precision = exercise.bodyWeight ? 0 : 1;
            return (
                <Form.Item
                    key={exercise._id}
                    name={exercise._id}
                    label={capitalize(exercise.name)}
                    rules={[
                        {
                            required: true,
                            message: 'Заполните результат упражнения'
                        }
                    ]}>
                    <InputNumber decimalSeparator={','} precision={precision} min={0} prefix={units} step={step} />
                </Form.Item>
            );
        });
    };

    const handleBackButton = () => {
        customHistory.goBack();
    };

    const getExerciseGroups = () => {
        return exerciseGroups.map((g, index) => (
            <LightBadge key={index}>
                <FontAwesomeIcon icon={faDumbbell} /> {g}
            </LightBadge>
        ));
    };

    let completeStatus = '';
    if (sequenceNumber === userCurrentWorkout) {
        completeStatus = 'current';
    } else if (sequenceNumber < userCurrentWorkout) {
        completeStatus = 'completed';
    } else if (sequenceNumber > userCurrentWorkout) {
        completeStatus = 'future';
    }

    const getCompleteIcon = () => {
        if (completeStatus === 'completed') {
            return <FontAwesomeIcon icon={faCircleCheck} color={lime[5]} />;
        }

        if (completeStatus === 'current') {
            return <FontAwesomeIcon icon={faCirclePlay} color={orange[5]} />;
        }

        if (completeStatus === 'future') {
            return <FontAwesomeIcon icon={faCircleCheck} color={gray[3]} />;
        }
    };

    const getPlannedIcon = () => {
        if (completeStatus === 'completed') {
            return <FontAwesomeIcon icon={faCalendarDays} color={lime[5]} />;
        }

        if (completeStatus === 'current') {
            if (!workoutSchedule) {
                return <FontAwesomeIcon icon={faCalendarDays} color={gray[3]} />;
            }

            return <FontAwesomeIcon icon={faCalendarDays} color={blue[5]} />;
        }

        if (completeStatus === 'future') {
            return <FontAwesomeIcon icon={faCalendarDays} color={gray[3]} />;
        }
    };

    const getCompleteInfo = () => {
        if (completeStatus === 'completed') {
            return 'Завершена';
        }

        if (completeStatus === 'current') {
            return 'Текущая';
        }

        if (completeStatus === 'future') {
            return 'Предстоящая';
        }
    };

    const getPlannedInfo = () => {
        if (completeStatus === 'completed') {
            const workoutDate = workoutSchedule.date;
            return moment(workoutDate).format('DD.MM.YYYY');
        }

        if (completeStatus === 'current') {
            if (!workoutSchedule) {
                return 'Не запланирована';
            }

            const workoutDate = workoutSchedule.date;
            return <>{`На ${moment(workoutDate).format('DD.MM.YYYY')}`}</>;
        }

        if (completeStatus === 'future') {
            return 'Не запланирована';
        }
    };

    return (
        <>
            <CardWrapper>
                <CardHeader>
                    <HeaderTitle>
                        <HeaderText>Тренировка&nbsp;</HeaderText>
                        <HeaderNumber>{sequenceNumber}</HeaderNumber>
                    </HeaderTitle>
                    {pathname !== '/home' && <Button onClick={handleBackButton}>Назад</Button>}
                </CardHeader>
                <CardBody>
                    <CardInfo>
                        <CardStatus>
                            <StatusLine>
                                <StatusIcon>{getCompleteIcon()}</StatusIcon>
                                <DarkBadge>{getCompleteInfo()}</DarkBadge>
                            </StatusLine>
                            <StatusLine>
                                <StatusIcon>{getPlannedIcon()}</StatusIcon>
                                <DarkBadge>{getPlannedInfo()}</DarkBadge>
                            </StatusLine>
                        </CardStatus>
                        <CardLabels>
                            <CardLine>
                                <Label>Уровень сложности</Label>
                                <DarkBadge>{level}</DarkBadge>
                            </CardLine>
                            <CardLine>
                                <Label>Вид тренировки</Label>
                                <DarkBadge>{capitalize(type)}</DarkBadge>
                            </CardLine>
                            <CardLine>
                                <Label>Набор упражнений</Label>
                                <DarkBadge>{kind}</DarkBadge>
                            </CardLine>
                        </CardLabels>
                        <CardBadges>{getExerciseGroups()}</CardBadges>
                    </CardInfo>
                    <ExercisesWrapper>
                        {getExercisesElements()}
                        <BackgroudNumber>{sequenceNumber}</BackgroudNumber>
                    </ExercisesWrapper>
                </CardBody>
                <CardFooter>
                    <FooterPlan>
                        <DatePicker
                            disabledDate={disabledPastDates}
                            format={'DD.MM.YYYY'}
                            showToday={false}
                            value={planedDate}
                            onChange={(value) => handleDatePick(value)}
                            disabled={!(completeStatus === 'current')}
                        />
                        <Button type="primary" onClick={submitToSchedule} disabled={!planedDate}>
                            <Space>
                                <FontAwesomeIcon icon={faCalendarDays} color={gray[0]} size="xl" />
                                <span>Запланировать</span>
                            </Space>
                        </Button>
                    </FooterPlan>
                    <Button type="primary" disabled={!(completeStatus === 'current')} onClick={modalOpen}>
                        <Space>
                            <FontAwesomeIcon icon={faCircleCheck} color={gray[0]} size="xl" />
                            <span>Завершить</span>
                        </Space>
                    </Button>
                </CardFooter>
            </CardWrapper>
            <Modal
                open={isModalOpen}
                closable={false}
                destroyOnClose={true}
                footer={modalFooter}
                centered={true}
                width={450}>
                <CompleteWrapper>
                    <CompleteTitle>
                        <StyledTitle level="4">Внесите результаты</StyledTitle>
                    </CompleteTitle>
                    <CompleteForm>
                        <Form
                            name="workoutResults"
                            form={form}
                            onFinish={formSubmit}
                            requiredMark={false}
                            colon={false}
                            labelCol={{ span: 17 }}
                            labelAlign={'left'}
                            initialValues={{
                                completeDate: moment()
                            }}>
                            {getFormElemetns()}
                            <Form.Item key={'datepicker'} name="completeDate" label={'Дата'}>
                                <DatePicker disabledDate={disabledFutureDates} format={'DD.MM.YYYY'} showToday={true} />
                            </Form.Item>
                        </Form>
                    </CompleteForm>
                </CompleteWrapper>
            </Modal>
        </>
    );
};

WorkoutCard.propTypes = {
    sequenceNumber: PropTypes.number.isRequired
};

export default WorkoutCard;
