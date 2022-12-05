import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Pagination, Spin } from 'antd';
import { getTrainingPlan, getTrainingPlanLoadingStatus } from '../../store/trainingPlan';
import TrainingPlanCard from '../../components/TrainingPlanCard';
import { getUserCompletedWorkouts, getUserCurrentWorkout, getCurrentWorkoutSchedule } from '../../store/user';
import { StyledTitle } from '../../components/StyledComponents';
import { PlanWrapper } from './styles';

const TrainingPlan = () => {
    const trainingPlan = useSelector(getTrainingPlan());
    const trainingPlanLoadingStatus = useSelector(getTrainingPlanLoadingStatus());
    const userCurrentWorkout = useSelector(getUserCurrentWorkout());
    const userCompletedWorkouts = useSelector(getUserCompletedWorkouts());
    const currentWorkoutSchedule = useSelector(getCurrentWorkoutSchedule());

    const totalPages = trainingPlan ? trainingPlan.length : 1;
    const pageSize = 9;
    const initialPage = Math.ceil(userCurrentWorkout / pageSize);

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
            const isWorkoutCompleted = workout.sequenceNumber <= userCompletedWorkouts;
            let completeStatus;
            let plannedStatus;
            if (isWorkoutCompleted) {
                completeStatus = 'completed';
            } else if (workout.sequenceNumber === 1 && currentWorkoutSchedule.date === 0) {
                completeStatus = 'incompleted';
            } else if (workout.sequenceNumber === userCurrentWorkout) {
                completeStatus = 'current';
                if (currentWorkoutSchedule) {
                    plannedStatus = 'planned';
                }
            } else {
                completeStatus = 'incompleted';
            }
            return (
                <div key={workout.sequenceNumber}>
                    <TrainingPlanCard {...workout} {...{ completeStatus, plannedStatus }} />
                </div>
            );
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <StyledTitle level="3">Список тренировок</StyledTitle>
            <PlanWrapper>
                <>{trainingPlanLoadingStatus ? <Spin /> : getWorkoutCards()}</>
                <Divider />
            </PlanWrapper>
            <Pagination current={currentPage} total={totalPages} onChange={handlePageChange} pageSize={pageSize} />
        </>
    );
};

export default TrainingPlan;
