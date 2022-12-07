import React from 'react';
import { useSelector } from 'react-redux';
import CalendarSmall from '../../components/CalendarSmall';
import CompleteCongrats from '../../components/CompleteCongrats';
import WorkoutCard from '../../components/WorkoutCard';
import WorkoutSteps from '../../components/WorkoutSteps';
import { getUserCurrentWorkout, getUserTrainingStatus } from '../../store/user';
import HelpDrawer from '../../components/HelpDrawer/HelpDrawer';
import { AboutHome } from '../QuickTour';
//* styles
import { StyledTitle } from '../../components/StyledComponents';
import { HomeInfo, HomeWorkout, HomeWrapper, InfoElement } from './styles';

const Dashboard = () => {
    const { trainingFinishedAt } = useSelector(getUserTrainingStatus());
    const userCurrentWorkout = useSelector(getUserCurrentWorkout());

    return (
        <>
            <StyledTitle level="3">Сводная информация</StyledTitle>
            <HomeWrapper>
                <HomeWorkout>
                    {trainingFinishedAt ? <CompleteCongrats /> : <WorkoutCard sequenceNumber={userCurrentWorkout} />}
                </HomeWorkout>
                <HomeInfo>
                    <InfoElement>
                        <CalendarSmall />
                    </InfoElement>
                    <InfoElement>
                        <WorkoutSteps />
                    </InfoElement>
                </HomeInfo>
            </HomeWrapper>
            <HelpDrawer>
                <AboutHome />
            </HelpDrawer>
        </>
    );
};

export default Dashboard;
