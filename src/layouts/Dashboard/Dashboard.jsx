import React, { useEffect } from 'react';
import { Col, Divider, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainingPlanErrors, getTrainingPlanLoadingStatus, resetTrainingPlanError } from '../../store/trainingPlan';
import {
    getUserCurrentWorkout,
    getUserErrors,
    getUserLoadingStatus,
    getUserTrainingStatus,
    resetUserError
} from '../../store/user';
import {
    getWorkoutByNumber,
    getWorkoutsErrors,
    getWorkoutsLoadingStatus,
    loadWorkout,
    resetWorkoutError
} from '../../store/workouts';
import CalendarSmall from '../../components/CalendarSmall';
import WorkoutSteps from '../../components/WorkoutSteps';
import WorkoutCard from '../../components/WorkoutCard';
import showErrorToast from '../../utils/errorToast';
//* styles
import { StyledBorderBox } from '../../components/StyledBorderBox';
import CompleteCongrats from '../../components/CompleteCongrats/CompleteCongrats';

const Dashboard = () => {
    const dispatch = useDispatch();

    const userLoadingStatus = useSelector(getUserLoadingStatus());
    const workoutLoadingStatus = useSelector(getWorkoutsLoadingStatus());
    const trainigplanLoadingStatus = useSelector(getTrainingPlanLoadingStatus());

    const userLoadngErrors = useSelector(getUserErrors());
    const workoutLoadingErrors = useSelector(getWorkoutsErrors());
    const trainigplanLoadingErrors = useSelector(getTrainingPlanErrors());

    const userCurrentWorkout = useSelector(getUserCurrentWorkout());
    const workout = useSelector(getWorkoutByNumber(userCurrentWorkout));
    const { trainingFinishedAt } = useSelector(getUserTrainingStatus());

    useEffect(() => {
        if (userCurrentWorkout) {
            dispatch(loadWorkout(userCurrentWorkout));
        }
    }, [userCurrentWorkout]);

    useEffect(() => {
        if (workoutLoadingErrors) {
            showErrorToast(workoutLoadingErrors);
            dispatch(resetWorkoutError());
        } else if (userLoadngErrors) {
            showErrorToast(userLoadngErrors);
            dispatch(resetUserError());
        } else if (trainigplanLoadingErrors) {
            showErrorToast(trainigplanLoadingErrors);
            dispatch(resetTrainingPlanError());
        }
    }, [trainigplanLoadingErrors, userLoadngErrors, workoutLoadingErrors]);

    return (
        <div>
            <h3>Сводная информация</h3>
            <div>
                <Row justify={'center'}>
                    <Col span={16}>
                        <Row justify={'center'} gutter={[20]}>
                            <Col span={16}>
                                <StyledBorderBox>
                                    {trainingFinishedAt ? (
                                        <CompleteCongrats />
                                    ) : workoutLoadingStatus || !workout ? (
                                        <Spin />
                                    ) : (
                                        <WorkoutCard sequenceNumber={userCurrentWorkout} />
                                    )}
                                </StyledBorderBox>
                            </Col>
                            <Col span={8}>
                                <Row>
                                    <Col span={24}>
                                        <StyledBorderBox>
                                            {userLoadingStatus ? <Spin /> : <CalendarSmall />}
                                        </StyledBorderBox>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row>
                                    <Col span={24}>
                                        <StyledBorderBox>
                                            {trainigplanLoadingStatus ? <Spin /> : <WorkoutSteps />}
                                        </StyledBorderBox>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Dashboard;
