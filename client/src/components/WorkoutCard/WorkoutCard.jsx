import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, DatePicker, Divider, Modal, message, Form, InputNumber, Space } from 'antd';
import moment from 'moment';
import { completeCurrentWorkout, getUserCurrentWorkout, getUserSchedule, updateUserSchedule } from '../../store/user';
import Exercise from '../Exercise';
import { capitalize } from '../../utils/capitalize';
import customHistory from '../../utils/customHistory';
import { getWorkoutByNumber } from '../../store/workouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCircleCheck, faCirclePlay, faDumbbell } from '@fortawesome/free-solid-svg-icons';
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
    FooterPlan
} from './styles';
import { blue, lime, orange } from '@ant-design/colors';
import { gray } from '../StyledComponents';

const WorkoutCard = ({ sequenceNumber }) => {
    const dispatch = useDispatch();

    const [planedDate, setPlanedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { complexityLevel, kindName, typeName, exercises } = useSelector(getWorkoutByNumber(sequenceNumber));
    const userCurrentWorkout = useSelector(getUserCurrentWorkout());
    const userSchedule = useSelector(getUserSchedule());
    const [form] = Form.useForm();
    const { pathname } = useLocation();

    const exerciseGroupNames = Object.keys(exercises).map((key) => exercises[key].group);

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

    const getExercisesElements = () => {
        return Object.keys(exercises).map((key) => {
            return <Exercise key={key} sequenceNumber={sequenceNumber} exerciseKey={key} />;
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

    const getExerciseGroups = () => {
        return exerciseGroupNames.map((g, index) => (
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
        } else if (completeStatus === 'current') {
            return <FontAwesomeIcon icon={faCirclePlay} color={orange[5]} />;
        } else if (completeStatus === 'future') {
            return <FontAwesomeIcon icon={faCircleCheck} color={gray[3]} />;
        }
    };

    const getPlannedIcon = () => {
        if (completeStatus === 'completed') {
            return <FontAwesomeIcon icon={faCalendarDays} color={lime[5]} />;
        } else if (completeStatus === 'current') {
            if (sequenceNumber === 1 && userSchedule.workout1.date === 0) {
                return <FontAwesomeIcon icon={faCalendarDays} color={gray[3]} />;
            } else if (!userSchedule[`workout${sequenceNumber}`]) {
                return <FontAwesomeIcon icon={faCalendarDays} color={gray[3]} />;
            } else {
                return <FontAwesomeIcon icon={faCalendarDays} color={blue[5]} />;
            }
        } else if (completeStatus === 'future') {
            return <FontAwesomeIcon icon={faCalendarDays} color={gray[3]} />;
        }
    };

    const getCompleteInfo = () => {
        if (completeStatus === 'completed') {
            return 'Завершена';
        } else if (completeStatus === 'current') {
            return 'Текущая';
        } else if (completeStatus === 'future') {
            return 'Предстоящая';
        }
    };

    const getPlannedInfo = () => {
        if (completeStatus === 'completed') {
            const workoutDate = userSchedule[`workout${sequenceNumber}`].date;
            return moment(workoutDate).format('DD.MM.YYYY');
        } else if (completeStatus === 'current') {
            if (sequenceNumber === 1 && userSchedule.workout1.date === 0) {
                return 'Не запланирована.';
            } else if (!userSchedule[`workout${sequenceNumber}`]) {
                return 'Не запланирована';
            } else {
                const workoutDate = userSchedule[`workout${sequenceNumber}`].date;
                return <>{`На ${moment(workoutDate).format('DD.MM.YYYY')}`}</>;
            }
        } else if (completeStatus === 'future') {
            return 'Не запланирована';
        }
    };

    return (
        <>
            <CardWrapper>
                <CardHeader>
                    {pathname !== '/home' && <Button onClick={handleBackButton}>Назад</Button>}
                    <HeaderTitle>
                        <HeaderText>Тренировка&nbsp;</HeaderText>
                        <HeaderNumber>{sequenceNumber}</HeaderNumber>
                    </HeaderTitle>
                </CardHeader>
                <CardBody>
                    <ExercisesWrapper>{getExercisesElements()}</ExercisesWrapper>
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
                                <DarkBadge>{complexityLevel}</DarkBadge>
                            </CardLine>
                            <CardLine>
                                <Label>Вид тренировки</Label>
                                <DarkBadge>{capitalize(typeName)}</DarkBadge>
                            </CardLine>
                            <CardLine>
                                <Label>Набор упражнений</Label>
                                <DarkBadge>{kindName}</DarkBadge>
                            </CardLine>
                        </CardLabels>
                        <CardBadges>{getExerciseGroups()}</CardBadges>
                    </CardInfo>
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
                            <span>Внести результаты и завершить</span>
                        </Space>
                    </Button>
                </CardFooter>
            </CardWrapper>
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
        </>
    );
};

WorkoutCard.propTypes = {
    sequenceNumber: PropTypes.number.isRequired
};

export default WorkoutCard;
