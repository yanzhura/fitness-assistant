import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row, Spin } from 'antd';
import { getWorkoutByNumber, getWorkoutsErrors, getWorkoutsLoadingStatus, loadWorkout } from '../../store/workouts';
import WorkoutCard from '../../components/WorkoutCard';
import showEerrorToast from '../../utils/errorToast';
import { StyledBorderBox } from '../../components/StyledBorderBox';

const Workout = () => {
    const dispatch = useDispatch();
    const { seqNumber } = useParams();
    const sequenceNumber = parseInt(seqNumber);
    const workoutLoadingStatus = useSelector(getWorkoutsLoadingStatus());
    const workoutLoadingErrors = useSelector(getWorkoutsErrors());
    const workout = useSelector(getWorkoutByNumber(sequenceNumber));

    useEffect(() => {
        dispatch(loadWorkout(sequenceNumber));
    }, []);

    useEffect(() => {
        if (workoutLoadingErrors) {
            showEerrorToast(workoutLoadingErrors);
        }
    }, [workoutLoadingErrors]);

    return (
        <Col span={16} offset={4}>
            <Row justify={'center'}>
                <StyledBorderBox>
                    {workoutLoadingStatus || !workout ? <Spin /> : <WorkoutCard sequenceNumber={sequenceNumber} />}
                </StyledBorderBox>
            </Row>
        </Col>
    );
};

export default Workout;
