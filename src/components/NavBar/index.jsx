import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Divider, Menu, Row } from 'antd';
import { useSelector } from 'react-redux';
import { getCurrentUser, getIsLoggedIn, getUserLoadingStatus } from '../../store/user';
import logo from '../../assets/logo.png';
import styles from './Navbar.module.css';

const Navbar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isDataLoading = useSelector(getUserLoadingStatus());
    const currentUser = useSelector(getCurrentUser());

    const location = useLocation();

    const navItems = [
        { key: '0', path: '/', label: 'Главная', private: 'none' },
        { key: '1', path: '/workouts', label: 'Тренировки', private: true },
        { key: '2', path: '/schedule', label: 'Расписание', private: true },
        { key: '3', path: '/stats', label: 'Статистика', private: true },
        { key: '4', path: '/help', label: 'Помощь', private: true }
    ];

    const currentNavItem = navItems.find((item) => item.path === location.pathname);
    const currentNavKey = currentNavItem?.key;

    const getMenuItems = () => {
        return navItems
            .filter((item) => item.private === isLoggedIn || item.private === 'none')
            .map((item) => ({
                key: item.key,
                label: <Link to={item.path}>{item.label}</Link>
            }));
    };

    return (
        <Row>
            <Col span={3}>
                <div className={styles.logo_container}>
                    <img src={logo} className={styles.logo} />
                </div>
            </Col>
            <Col span={17}>
                <Menu theme="dark" mode="horizontal" items={getMenuItems()} selectedKeys={currentNavKey} />
            </Col>
            <Col span={4}>
                <div className={styles.profile_container}>
                    {isLoggedIn && !isDataLoading ? (
                        <>
                            {currentUser.userData.name} <Divider type="vertical" /> <Link to="/logout">Выход</Link>
                        </>
                    ) : (
                        <Link to="/login">Вход</Link>
                    )}
                </div>
            </Col>
        </Row>
    );
};

export default Navbar;