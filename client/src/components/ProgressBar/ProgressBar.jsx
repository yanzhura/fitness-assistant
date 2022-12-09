import { Progress, Statistic } from 'antd';
import React from 'react';
import { lime } from '@ant-design/colors';
import { useSelector } from 'react-redux';
import { getTrainingPlan } from '../../store/trainingPlan';
import { getUserCompletedWorkouts } from '../../store/user';
import { StyledTitle } from '../StyledComponents';
import { BarBox, BarWrapper, StatsBox } from './styles';

const ProgressBar = () => {
    const userCompletedWorkouts = useSelector(getUserCompletedWorkouts());
    const trainingPlan = useSelector(getTrainingPlan());

    const workoutsTotal = trainingPlan.length;
    const percent = Math.round((userCompletedWorkouts / workoutsTotal) * 100);
    const lineStrokes = Array(userCompletedWorkouts)
        .fill('1')
        .map((el) => lime[5]);

    return (
        <>
            <StyledTitle level="4" italic>
                Тренировки
            </StyledTitle>
            <BarWrapper>
                <BarBox>
                    <Progress strokeWidth={55} steps={workoutsTotal} percent={percent} strokeColor={lineStrokes} />
                </BarBox>
                <StatsBox>
                    <Statistic title="Выполнено /" value={userCompletedWorkouts} />
                    <Statistic title="Всего" value={workoutsTotal} />
                </StatsBox>
            </BarWrapper>
        </>
    );
};

export default ProgressBar;
