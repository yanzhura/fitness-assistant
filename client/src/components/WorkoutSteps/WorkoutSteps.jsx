import { Button, Row, Space, Steps } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getTrainingPlan } from '../../store/trainingPlan';
import { getUserCurrentWorkout } from '../../store/user';
import { capitalize } from '../../utils/capitalize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faHouse } from '@fortawesome/free-solid-svg-icons';
import { GrayBadge } from './styles';

const WorkoutSteps = () => {
    const currentWorkout = useSelector(getUserCurrentWorkout());
    const trainingPlan = useSelector(getTrainingPlan());
    const totalWorkouts = trainingPlan.length;

    const getInitialProgressRange = () => {
        if (currentWorkout <= 5) {
            return [0, 5];
        } else if (currentWorkout > totalWorkouts - 6) {
            return [totalWorkouts - 5, totalWorkouts];
        } else {
            return [currentWorkout - 3, currentWorkout + 2];
        }
    };

    const getInitialStart = () => {
        if (currentWorkout <= 5) {
            return null;
        } else if (currentWorkout > totalWorkouts - 6) {
            return totalWorkouts - 6;
        } else {
            return currentWorkout - 3;
        }
    };

    const [progressRange, setProgressRange] = useState(getInitialProgressRange());
    const [start, setStart] = useState(getInitialStart());

    const trainingPlanSlice = trainingPlan.slice(...progressRange);
    const isUpButtonDisabled = progressRange[0] === 0;
    const isDownButtonDisabled = progressRange[0] === totalWorkouts - 5;

    const stepsItems = trainingPlanSlice.map((item) => {
        const isFutureWorkout = item.sequenceNumber > currentWorkout;
        return {
            title: `Тренировка ${item.sequenceNumber}`,
            description: (
                <div>
                    <GrayBadge light={isFutureWorkout}>{item.complexityLevel}</GrayBadge>
                    <GrayBadge light={isFutureWorkout}>{item.kindName}</GrayBadge>
                    <GrayBadge light={isFutureWorkout}>{capitalize(item.typeName)}</GrayBadge>
                </div>
            )
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

            case 'home':
                setProgressRange(getInitialProgressRange());
                setStart(getInitialStart());
                break;

            default:
                break;
        }
    };

    return (
        <>
            <Row justify={'center'}>
                <Space>
                    <Button disabled={isUpButtonDisabled} onClick={() => handleClick('up')}>
                        <FontAwesomeIcon icon={faCaretUp} />
                    </Button>
                    <Button onClick={() => handleClick('home')}>
                        <FontAwesomeIcon icon={faHouse} />
                    </Button>
                    <Button disabled={isDownButtonDisabled} onClick={() => handleClick('down')}>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </Button>
                </Space>
                <Steps
                    direction="vertical"
                    size="small"
                    current={currentWorkout - 1}
                    items={stepsItems}
                    initial={start}
                />
            </Row>
        </>
    );
};

export default WorkoutSteps;
