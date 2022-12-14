import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/NavBar';
import AppRouter from '../../router/AppRouter';
import { getIsLoggedIn, getUserErrors, loadUserData, resetUserError } from '../../store/user';
import { getTrainingPlanErrors, loadTrainingPlan, resetTrainingPlanError } from '../../store/trainingPlan';
import showErrorToast from '../../utils/errorToast';
//* styles
import { Footer, MainWrapper, Body, HeaderWrapper } from './styles';

const Main = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userErrors = useSelector(getUserErrors());
    const trainingPlanLoadErrors = useSelector(getTrainingPlanErrors());

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadUserData());
            dispatch(loadTrainingPlan());
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (trainingPlanLoadErrors) {
            showErrorToast(trainingPlanLoadErrors);
            dispatch(resetTrainingPlanError());
        } else if (userErrors) {
            showErrorToast(userErrors);
            dispatch(resetUserError());
        }
    }, [trainingPlanLoadErrors, userErrors]);

    return (
        <MainWrapper>
            <HeaderWrapper>
                <Navbar />
            </HeaderWrapper>
            <Body>
                <AppRouter />
            </Body>
            <Footer>Дипломная работа для курса &#171;Профессия Junior Frontend-разработчик&#187;.</Footer>
        </MainWrapper>
    );
};

export default Main;
