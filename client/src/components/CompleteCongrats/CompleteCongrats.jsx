import { Button, Result } from 'antd';
import React from 'react';
import customHistory from '../../utils/customHistory';

const CompleteCongrats = () => {
    const handleClick = () => {
        customHistory.push('/stats');
    };

    return (
        <>
            <Result
                status="success"
                title="Поздравляем! Вы закончили тренировочную программу!"
                subTitle="Посмотрите на ваши итоговые результаты и прогресс."
                extra={
                    <Button type="primary" onClick={handleClick}>
                        К статистике
                    </Button>
                }
            />
        </>
    );
};

export default CompleteCongrats;
