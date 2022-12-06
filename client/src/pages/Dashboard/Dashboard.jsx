import React from 'react';
import { useSelector } from 'react-redux';
import CalendarSmall from '../../components/CalendarSmall';
import CompleteCongrats from '../../components/CompleteCongrats/CompleteCongrats';
import WorkoutCard from '../../components/WorkoutCard';
import WorkoutSteps from '../../components/WorkoutSteps';
import { getUserCurrentWorkout, getUserTrainingStatus } from '../../store/user';
import HelpDrawer from '../../components/HelpDrawer/HelpDrawer';
import { AboutHome } from '../QuickTour';
//* styles
import { StyledBorderBox, StyledTitle } from '../../components/StyledComponents';
import { HomeWrapper } from './styles';

const Dashboard = () => {
    const { trainingFinishedAt } = useSelector(getUserTrainingStatus());
    const userCurrentWorkout = useSelector(getUserCurrentWorkout());

    return (
        <>
            <StyledTitle level="3">Сводная информация</StyledTitle>
            <HomeWrapper>
                <StyledBorderBox>
                    {trainingFinishedAt ? <CompleteCongrats /> : <WorkoutCard sequenceNumber={userCurrentWorkout} />}
                </StyledBorderBox>

                <StyledBorderBox>
                    <CalendarSmall />
                </StyledBorderBox>

                <StyledBorderBox>
                    <WorkoutSteps />
                </StyledBorderBox>
            </HomeWrapper>
            <HelpDrawer>
                <AboutHome />
            </HelpDrawer>
        </>
    );
};

export default Dashboard;
