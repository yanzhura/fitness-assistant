import React from 'react';
import Title from 'antd/lib/typography/Title';
import ProgressBar from '../../components/ProgressBar';

const StatsSummary = () => {
    return (
        <div>
            <Title level={3}>Тренировки</Title>
            <ProgressBar />
        </div>
    );
};

export default StatsSummary;
