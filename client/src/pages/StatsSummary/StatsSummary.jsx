import React from 'react';
import ProgressBar from '../../components/ProgressBar';
import TrainingStats from '../../components/TrainingStats';

const StatsSummary = () => {
    return (
        <div>
            <ProgressBar />
            <TrainingStats />
        </div>
    );
};

export default StatsSummary;
