/** @jsxImportSource @emotion/react */

import React from 'react';
import { Col, Divider, Row, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { getUserCurrentWorkout, getUserLoadingStatus } from '../../store/user';
import Workout from '../../pages/Workout';
import { StyledBorderBox } from './styles';
import CalendarSmall from '../../components/CalendarSmall';
import Progress from '../../components/Progress/Progress';
import { getTrainingPlanLoadingStatus } from '../../store/trainingPlan';

const Dashboard = () => {
    const userLoadingStatus = useSelector(getUserLoadingStatus());
    const trainigplanLoadingStatus = useSelector(getTrainingPlanLoadingStatus());
    const currentWorkout = useSelector(getUserCurrentWorkout());
    return (
        <>
            {!userLoadingStatus && !trainigplanLoadingStatus ? (
                <div>
                    <h3>Сводная информация</h3>
                    <div>
                        <Row justify={'center'}>
                            <Col span={16}>
                                <Row justify={'center'} gutter={[20]}>
                                    <Col span={16}>
                                        {currentWorkout ? (
                                            <StyledBorderBox>
                                                <Workout seqNumber={currentWorkout} />
                                            </StyledBorderBox>
                                        ) : (
                                            <Spin />
                                        )}
                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={24}>
                                                <StyledBorderBox>
                                                    <CalendarSmall />
                                                </StyledBorderBox>
                                            </Col>
                                        </Row>
                                        <Divider />
                                        <Row>
                                            <Col span={24}>
                                                <StyledBorderBox>
                                                    <Progress />
                                                </StyledBorderBox>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <Spin />
            )}
        </>
    );
};

export default Dashboard;
