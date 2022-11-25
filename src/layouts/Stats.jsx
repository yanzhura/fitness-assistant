import { Col, Row, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyledBorderBox } from '../components/StyledBorderBox';
import StatsSummary from '../pages/StatsSummary/StatsSummary';
import { getTrainingPlanErrors, getTrainingPlanLoadingStatus } from '../store/trainingPlan';
import { getUserErrors, getUserLoadingStatus } from '../store/user';
import showEerrorToast from '../utils/errorToast';

const Stats = () => {
    const trainigplanLoadingStatus = useSelector(getTrainingPlanLoadingStatus());
    const userLoadingStatus = useSelector(getUserLoadingStatus());

    const trainigplanLoadingErrors = useSelector(getTrainingPlanErrors());
    const userLoadngErrors = useSelector(getUserErrors());

    useEffect(() => {
        if (userLoadngErrors) {
            showEerrorToast(userLoadngErrors);
        } else if (trainigplanLoadingErrors) {
            showEerrorToast(trainigplanLoadingErrors);
        }
    }, [trainigplanLoadingErrors, userLoadngErrors]);

    return (
        <div>
            <h3>Статистика</h3>
            <Col span={16} offset={4}>
                <Row justify={'center'}>
                    <StyledBorderBox>
                        {!trainigplanLoadingStatus && !userLoadingStatus ? <StatsSummary /> : <Spin />}
                    </StyledBorderBox>
                </Row>
            </Col>
        </div>
    );
};

export default Stats;
