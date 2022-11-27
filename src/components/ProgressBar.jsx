import { Progress, Space, Statistic } from 'antd';
import React from 'react';
import { lime, volcano } from '@ant-design/colors';
import { useSelector } from 'react-redux';
import { getTrainingPlan } from '../store/trainingPlan';
import { getUserCurrentWorkout, getUserTrainingStatus } from '../store/user';

const ProgressBar = () => {
    const userCurrentWorkout = useSelector(getUserCurrentWorkout());
    const trainingPlan = useSelector(getTrainingPlan());
    const { trainingFinishedAt } = useSelector(getUserTrainingStatus());

    const workoutsTotal = trainingPlan.length;
    const percent = Math.round(((userCurrentWorkout - 1) / workoutsTotal) * 100);
    const lineStrokes = Array(userCurrentWorkout - 1)
        .fill('1')
        .map((el) => lime[5]);

    if (!trainingFinishedAt) {
        lineStrokes.push(volcano[5]);
    } else {
        lineStrokes.push(lime[5]);
    }

    return (
        <>
            <Space>
                <Statistic title="Выполнено" value={userCurrentWorkout - 1} />
                <Statistic title="Всего" value={workoutsTotal} />
            </Space>
            <div>
                <Progress steps={workoutsTotal} percent={percent} strokeColor={lineStrokes} success={{ percent }} />
            </div>
        </>
    );
};

export default ProgressBar;