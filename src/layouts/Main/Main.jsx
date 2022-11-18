/** @jsxImportSource @emotion/react */

import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/NavBar';
import AppRouter from '../../router/AppRouter';
import { getIsLoggedIn, getUserErrors, loadUserData } from '../../store/user';
//* styles
import { headerOverride, mainContent, contentWrapper } from './styles';
import { getTrainingPlanErrors, loadTrainingPlan } from '../../store/trainingPlan';
import showEerrorToast from '../../utils/errorToast';

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
            showEerrorToast(trainingPlanLoadErrors);
        } else if (userErrors) {
            showEerrorToast(userErrors);
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
            <Footer>XXXXX -=- Footer -=- XXXXX</Footer>
        </Layout>
    );
};

export default Main;
