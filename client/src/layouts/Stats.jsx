import { Col, Row, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatsSummary from '../pages/StatsSummary/StatsSummary';
import { getTrainingPlanErrors, getTrainingPlanLoadingStatus, resetTrainingPlanError } from '../store/trainingPlan';
import { getUserErrors, getUserLoadingStatus, resetUserError } from '../store/user';
import showErrorToast from '../utils/errorToast';
//* styles
import { StyledBorderBox } from '../components/StyledComponents';

const Stats = () => {
    const dispatch = useDispatch();
    const trainigplanLoadingStatus = useSelector(getTrainingPlanLoadingStatus());
    const userLoadingStatus = useSelector(getUserLoadingStatus());

    const trainigplanLoadingErrors = useSelector(getTrainingPlanErrors());
    const userLoadngErrors = useSelector(getUserErrors());

    useEffect(() => {
        if (userLoadngErrors) {
            showErrorToast(userLoadngErrors);
            dispatch(resetUserError());
        } else if (trainigplanLoadingErrors) {
            showErrorToast(trainigplanLoadingErrors);
            dispatch(resetTrainingPlanError());
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
