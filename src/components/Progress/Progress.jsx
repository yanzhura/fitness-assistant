import { Button, Row, Steps } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { EllipsisOutlined } from '@ant-design/icons';
import { getTrainingPlan } from '../../store/trainingPlan';
import { getUserCurrentWorkout } from '../../store/user';

const Progress = () => {
    const [progressRange, setProgressRange] = useState([0, 5]);
    const currentWorkout = useSelector(getUserCurrentWorkout());
    const trainingPlan = useSelector(getTrainingPlan());
    const [start, setStart] = useState(currentWorkout - 3);

    const trainingPlanSlice = trainingPlan.slice(...progressRange);
    const isUpButtonDisabled = progressRange[0] === 0;
    const isDownButtonDisabled = progressRange[0] === trainingPlan.length - 5;

    const stepsItems = trainingPlanSlice.map((item) => {
        return {
            title: `Тренировка ${item.sequenceNumber}`,
            description: `${item.kindName} — ${item.typeName} | ${item.exerciseGroupNames.join(', ')}.`
        };
    });

    const handleClick = (direction) => {
        switch (direction) {
            case 'up':
                setProgressRange((prevState) => {
                    return prevState.map((i) => i - 1);
                });
                setStart((prevState) => prevState - 1);
                break;

            case 'down':
                setProgressRange((prevState) => {
                    return prevState.map((i) => i + 1);
                });
                setStart((prevState) => prevState + 1);
                break;

            default:
                break;
        }
    };

    return (
        <>
            <Row justify={'center'}>
                <Button disabled={isUpButtonDisabled} onClick={() => handleClick('up')}>
                    <EllipsisOutlined />
                </Button>
                <Steps
                    direction="vertical"
                    size="small"
                    current={currentWorkout - 1}
                    items={stepsItems}
                    initial={start}
                />
                <Button disabled={isDownButtonDisabled} onClick={() => handleClick('down')}>
                    <EllipsisOutlined />
                </Button>
            </Row>
        </>
    );
};

export default Progress;
