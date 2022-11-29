import React from 'react';
import OverallScore from '../../components/OverallScore';
import ProgressBar from '../../components/ProgressBar';
import TrainingStats from '../../components/TrainingStats';

const StatsSummary = () => {
    return (
        <div>
            <ProgressBar />
            <TrainingStats />
            <OverallScore />
        </div>
    );
};

export default StatsSummary;
