/** @jsxImportSource @emotion/react */

import React from 'react';
import { Col, Divider, Row } from 'antd';
import { useSelector } from 'react-redux';
import CalendarSmall from '../../components/CalendarSmall';
import CompleteCongrats from '../../components/CompleteCongrats/CompleteCongrats';
import { StyledBorderBox } from '../../components/StyledComponents';
import WorkoutCard from '../../components/WorkoutCard';
import WorkoutSteps from '../../components/WorkoutSteps';
import { getUserCurrentWorkout, getUserTrainingStatus } from '../../store/user';
import HelpDrawer from '../../components/HelpDrawer/HelpDrawer';
import { AboutHome } from '../QuickTour';

const Dashboard = () => {
    const { trainingFinishedAt } = useSelector(getUserTrainingStatus());
    const userCurrentWorkout = useSelector(getUserCurrentWorkout());

    return (
        <>
            <h3>Сводная информация</h3>
            <div>
                <Row justify={'center'}>
                    <Col span={16}>
                        <Row justify={'center'} gutter={[20]}>
                            <Col span={16}>
                                <StyledBorderBox>
                                    {trainingFinishedAt ? (
                                        <CompleteCongrats />
                                    ) : (
                                        <WorkoutCard sequenceNumber={userCurrentWorkout} />
                                    )}
                                </StyledBorderBox>
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
                                            <WorkoutSteps />
                                        </StyledBorderBox>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <HelpDrawer>
                <AboutHome />
            </HelpDrawer>
        </>
    );
};

export default Dashboard;
