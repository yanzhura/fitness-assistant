import { Divider } from 'antd';
import React from 'react';
import GroupProgress from '../../components/GroupProgress/GroupProgress';
import OverallScore from '../../components/OverallScore';
import ProgressBar from '../../components/ProgressBar';
import TrainingStats from '../../components/TrainingStats';

const StatsSummary = () => {
    return (
        <div>
            <ProgressBar />
            <TrainingStats />
            <GroupProgress />
            <Divider />
            <OverallScore />
        </div>
    );
};

export default StatsSummary;
