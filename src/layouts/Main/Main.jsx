/** @jsxImportSource @emotion/react */

import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/NavBar';
import AppRouter from '../../router/AppRouter';
import { getIsLoggedIn, loadUserData } from '../../store/user';
//* styles
import { headerOverride, mainContent, contentWrapper } from './styles';

const { Header, Content, Footer } = Layout;

const Main = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadUserData());
        }
    }, [isLoggedIn]);

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
