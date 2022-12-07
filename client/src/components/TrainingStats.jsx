import React from 'react';
import { Steps } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getUserCompletedWorkouts, getUserSchedule, getUserTrainingStatus } from '../store/user';
import { getTrainingPlan } from '../store/trainingPlan';
import { daysDeclension, workoutsDeclension } from '../utils/declensions';
import { StyledTitle } from './StyledComponents';

const TrainingStats = () => {
    const { trainingStartedAt, trainingFinishedAt } = useSelector(getUserTrainingStatus());
    const userCompletedWorkouts = useSelector(getUserCompletedWorkouts());
    const trainingPlan = useSelector(getTrainingPlan());
    const workoutsTotal = trainingPlan.length;
    const workoutsLeft = workoutsTotal - userCompletedWorkouts;
    const userSchedule = useSelector(getUserSchedule());

    const getStepsData = () => {
        const data = {
            current: 0,
            percent: 0,
            items: []
        };
        if (!trainingStartedAt && !trainingFinishedAt) {
            data.items = [
                {
                    title: 'Старт',
                    description: 'Начните тренироваться!'
                },
                {
                    title: 'Тренировки',
                    description: ''
                },
                {
                    title: 'Финиш',
                    description: `Вам осталось выполнить ${workoutsDeclension(workoutsLeft)}`
                }
            ];
        } else if (trainingStartedAt && !trainingFinishedAt) {
            const lastCompletedWorkoutDate = userSchedule[`workout${userCompletedWorkouts}`].date;
            const daysOfTraining = moment(lastCompletedWorkoutDate).diff(trainingStartedAt, 'days');
            const description =
                daysOfTraining === 0
                    ? `Поздравляем с первой тренировкой!`
                    : `Вы тренируетесь уже ${daysDeclension(daysOfTraining)}`;
            data.current = 1;
            data.percent = 60;
            data.items = [
                {
                    title: 'Старт',
                    description: `${moment(trainingStartedAt).format('DD MMMM YYYY')} г.`
                },
                {
                    title: 'Тренировки',
                    description
                },
                {
                    title: 'Финиш',
                    description: `Вам осталось выполнить ${workoutsDeclension(workoutsLeft)}`
                }
            ];
        } else if (trainingStartedAt && trainingFinishedAt) {
            const totalDaysOfTraining = moment(trainingFinishedAt).diff(trainingStartedAt, 'days');
            data.current = 3;
            data.percent = 100;
            data.items = [
                {
                    title: 'Старт',
                    description: `${moment(trainingStartedAt).format('DD MMMM YYYY')} г.`
                },
                {
                    title: 'Тренировки',
                    description: `Вы выполнили программу за ${daysDeclension(totalDaysOfTraining)}`
                },
                {
                    title: 'Финиш',
                    description: `${moment(trainingFinishedAt).format('DD MMMM YYYY')} г.`
                }
            ];
        }
        return data;
    };

    const { current, percent, items } = getStepsData();

    return (
        <>
            <StyledTitle level="4" italic>
                Продолжительность
            </StyledTitle>
            <Steps current={current} percent={percent} labelPlacement="horizontal" items={items} />
        </>
    );
};

export default TrainingStats;
