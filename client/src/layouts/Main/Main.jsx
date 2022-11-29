/* eslint-disable react/no-unknown-property */
/** @jsxImportSource @emotion/react */

import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/NavBar';
import AppRouter from '../../router/AppRouter';
import { getIsLoggedIn, getUserErrors, loadUserData, resetUserError } from '../../store/user';
import { getTrainingPlanErrors, loadTrainingPlan, resetTrainingPlanError } from '../../store/trainingPlan';
import showErrorToast from '../../utils/errorToast';
//* styles
import { headerOverride, footerOverride, mainContent, contentWrapper } from './styles';

const { Header, Content, Footer } = Layout;

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
        <Layout>
            <Header css={headerOverride}>
                <Navbar />
            </Header>
            <Content css={mainContent}>
                <div css={contentWrapper}>
                    <AppRouter />
                </div>
            </Content>
            <Footer css={footerOverride}>
                <p>Дипломная работа для курса &#171;Профессия Junior Frontend-разработчик&#187;.</p>
            </Footer>
        </Layout>
    );
};

export default Main;
