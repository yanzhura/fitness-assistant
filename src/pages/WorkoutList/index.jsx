import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Spin } from 'antd';
import {
    getTrainingPlan,
    getTrainingPlanErrors,
    getTrainingPlanLoadingStatus,
    loadTrainingPlan
} from '../../store/trainingPlan';
import showEerrorToast from '../../utils/errorToast';
import TrainingPlanCard from '../../components/TrainingPlanCard';
import { getCurrentUser } from '../../store/user';
// import styles from './WorkoutList.module.css';

const WorkoutList = () => {
    const dispatch = useDispatch();
    const trainingPlan = useSelector(getTrainingPlan());
    const trainingPlanLoadErrors = useSelector(getTrainingPlanErrors());
    const trainingPlanLoadingStatus = useSelector(getTrainingPlanLoadingStatus());
    const { userData } = useSelector(getCurrentUser());

    useEffect(() => {
        if (!trainingPlan) {
            dispatch(loadTrainingPlan());
        }
    }, []);

    useEffect(() => {
        if (trainingPlanLoadErrors) {
            showEerrorToast(trainingPlanLoadErrors);
        }
    }, [trainingPlanLoadErrors]);

    const getWorkoutCards = () => {
        if (trainingPlan) {
            return trainingPlan.map((workout) => {
                let completeStatus;
                if (workout.sequenceNumber < userData.currentWorkout) {
                    completeStatus = 'complete';
                } else if (workout.sequenceNumber === userData.currentWorkout) {
                    completeStatus = 'current';
                } else {
                    completeStatus = 'incomplete';
                }
                return (
                    <Col key={workout.sequenceNumber} span={8}>
                        <TrainingPlanCard {...workout} completeStatus={completeStatus} />
                    </Col>
                );
            });
        }
    };

    return (
        <>
            <h3>Список тренировок</h3>
            <div className="wrapper">
                <Row justify={'center'}>
                    <Col span={16}>
                        <Row gutter={[16, 24]}>{trainingPlanLoadingStatus ? <Spin /> : getWorkoutCards()}</Row>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default WorkoutList;
