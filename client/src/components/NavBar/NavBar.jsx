import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Divider, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { getCurrentUser, getIsLoggedIn, getShowQuickTour, getUserLoadingStatus } from '../../store/user';
//* styles
import { Logo, LogoWrapper, menuOverride, MenuWrapper, Profile } from './styles';
import logo from '../../assets/logoWithText.png';
import EnterButtons from '../EnterButtons/EnterButtons';

const Navbar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isDataLoading = useSelector(getUserLoadingStatus());
    const currentUser = useSelector(getCurrentUser());
    const isQuickTourOpen = useSelector(getShowQuickTour());

    const location = useLocation();

    const navItems = [
        { key: '0', path: '/home', label: 'Сводка', private: true },
        { key: '1', path: '/workouts', label: 'Тренировки', private: true },
        { key: '2', path: '/schedule', label: 'Календарь', private: true },
        { key: '3', path: '/stats', label: 'Статистика', private: true },
        { key: '4', path: '/help', label: 'Помощь', private: true }
    ];

    const currentNavItem = navItems.find((item) => item.path === location.pathname);
    const currentNavKey = currentNavItem?.key;

    const getMenuItems = () => {
        return navItems
            .filter((item) => item.private === isLoggedIn || item.private === 'none')
            .map((item) => {
                let menuItem;
                if (isQuickTourOpen) {
                    menuItem = {
                        key: item.key,
                        label: item.label
                    };
                } else {
                    menuItem = {
                        key: item.key,
                        label: <Link to={item.path}>{item.label}</Link>
                    };
                }
                return menuItem;
            });
    };

    return (
        <>
            <LogoWrapper>
                <Link to={'/'}>
                    <Logo src={logo} />
                </Link>
            </LogoWrapper>
            <MenuWrapper>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={getMenuItems()}
                    selectedKeys={currentNavKey}
                    style={menuOverride}
                />
            </MenuWrapper>
            <Profile>
                {isLoggedIn && !isDataLoading ? (
                    <>
                        {currentUser.userData.name} <Divider type="vertical" /> <Link to="/logout">Выход</Link>
                    </>
                ) : (
                    <EnterButtons />
                )}
            </Profile>
        </>
    );
};

export default Navbar;
