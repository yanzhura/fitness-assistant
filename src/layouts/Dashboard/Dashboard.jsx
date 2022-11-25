import React, { useEffect } from 'react';
import { Col, Divider, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainingPlanErrors, getTrainingPlanLoadingStatus } from '../../store/trainingPlan';
import { getUserCurrentWorkout, getUserErrors, getUserLoadingStatus } from '../../store/user';
import { getWorkoutByNumber, getWorkoutsErrors, getWorkoutsLoadingStatus, loadWorkout } from '../../store/workouts';
import CalendarSmall from '../../components/CalendarSmall';
import Progress from '../../components/Progress/Progress';
import WorkoutCard from '../../components/WorkoutCard';
import showEerrorToast from '../../utils/errorToast';
//* styles
import { StyledBorderBox } from '../../components/StyledBorderBox';

const Dashboard = () => {
    const dispatch = useDispatch();

    const userLoadingStatus = useSelector(getUserLoadingStatus());
    const workoutLoadingStatus = useSelector(getWorkoutsLoadingStatus());

    const userLoadngErrors = useSelector(getUserErrors());
    const workoutLoadingErrors = useSelector(getWorkoutsErrors());

    const trainigplanLoadingStatus = useSelector(getTrainingPlanLoadingStatus());
    const trainigplanLoadingErrors = useSelector(getTrainingPlanErrors());
    const userCurrentWorkout = useSelector(getUserCurrentWorkout());

    const workout = useSelector(getWorkoutByNumber(userCurrentWorkout));

    useEffect(() => {
        if (userCurrentWorkout) {
            dispatch(loadWorkout(userCurrentWorkout));
        }
    }, [userCurrentWorkout]);

    useEffect(() => {
        if (workoutLoadingErrors) {
            showEerrorToast(workoutLoadingErrors);
        } else if (userLoadngErrors) {
            showEerrorToast(userLoadngErrors);
        } else if (trainigplanLoadingErrors) {
            showEerrorToast(trainigplanLoadingErrors);
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
                                    {workoutLoadingStatus || !workout ? (
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
                                            {trainigplanLoadingStatus ? <Spin /> : <Progress />}
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
