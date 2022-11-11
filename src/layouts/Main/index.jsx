import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Navbar from '../../components/NavBar';
import AppRouter from '../../router/AppRouter';
import styles from './Main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn, getUserData } from '../../store/user';

const { Header, Content, Footer } = Layout;

const Main = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getUserData());
        }
    }, [isLoggedIn]);

    return (
        <Layout>
            <Header className={styles.header_override}>
                <Navbar />
            </Header>
            <Content className={styles.main_content}>
                <div className={styles.content_wrapper}>
                    <AppRouter />
                </div>
            </Content>
            <Footer>XXXXX -=- Footer -=- XXXXX</Footer>
        </Layout>
    );
};

export default Main;
