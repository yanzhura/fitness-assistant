import React from 'react';
import GroupProgress from '../../components/GroupProgress/GroupProgress';
import OverallScore from '../../components/OverallScore';
import ProgressBar from '../../components/ProgressBar';
import TrainingStats from '../../components/TrainingStats';
import { StatBox } from './styles';

const StatsSummary = () => {
    return (
        <>
            <StatBox>
                <ProgressBar />
            </StatBox>
            <StatBox>
                <TrainingStats />
            </StatBox>
            <StatBox>
                <GroupProgress />
            </StatBox>
            <StatBox>
                <OverallScore />
            </StatBox>
        </>
    );
};

export default StatsSummary;
