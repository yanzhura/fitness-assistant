import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Divider, Pagination, Row, Spin } from 'antd';
import { getTrainingPlan, getTrainingPlanLoadingStatus } from '../store/trainingPlan';
import TrainingPlanCard from '../components/TrainingPlanCard';
import { getCurrentUser, getUserCurrentWorkout } from '../store/user';

const WorkoutList = () => {
    const trainingPlan = useSelector(getTrainingPlan());
    const trainingPlanLoadingStatus = useSelector(getTrainingPlanLoadingStatus());
    const { userData } = useSelector(getCurrentUser());
    const currentUserWorkout = useSelector(getUserCurrentWorkout());

    const totalPages = trainingPlan ? trainingPlan.length : 1;
    const pageSize = 9;
    const initialPage = Math.ceil(currentUserWorkout / pageSize);

    const [currentPage, setCurrentPage] = useState(initialPage || 1);

    const getTrainingPlanPage = () => {
        if (trainingPlan) {
            const firstIndex = pageSize * (currentPage - 1);
            const lastIndex = pageSize * currentPage;
            return trainingPlan.slice(firstIndex, lastIndex);
        }
    };

    const getWorkoutCards = () => {
        return getTrainingPlanPage().map((workout) => {
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
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <h3>Список тренировок</h3>
            <div>
                <Row justify={'center'}>
                    <Col span={16}>
                        <Row gutter={[16, 24]}>{trainingPlanLoadingStatus ? <Spin /> : getWorkoutCards()}</Row>
                    </Col>
                    <Divider />
                    <Col>
                        <Pagination
                            current={currentPage}
                            total={totalPages}
                            onChange={handlePageChange}
                            pageSize={pageSize}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default WorkoutList;
