import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getQuickTourPage, getShowQuickTour, hideQuickTour, nextQuickTourPage } from '../../store/user';
import customHistory from '../../utils/customHistory';
//* styles
import { bodyOverride, headerFooterOverride } from './styles';

const HelpDrawer = ({ children }) => {
    const dispatch = useDispatch();
    const isQuickTourOpen = useSelector(getShowQuickTour());
    const currentPage = useSelector(getQuickTourPage());

    const pages = [
        { title: 'Сводка', path: '/home' },
        { title: 'Теренировки', path: '/workouts' },
        { title: 'Расписание', path: '/schedule' },
        { title: 'Статистика', path: '/stats' },
        { title: 'Помощь', path: '/help' }
    ];

    const [drawerOpen] = useState(isQuickTourOpen);

    const buttonTitle = currentPage === pages.length - 1 ? 'Завершить' : 'Далее';
    const nextPagePath = currentPage === pages.length - 1 ? pages[0].path : pages[currentPage + 1].path;

    const handleClick = () => {
        if (currentPage === pages.length - 1) {
            dispatch(hideQuickTour());
            customHistory.push(nextPagePath);
        } else {
            dispatch(nextQuickTourPage());
            customHistory.push(nextPagePath);
        }
    };

    const footer = (
        <Button type="primary" onClick={handleClick}>
            {buttonTitle}
        </Button>
    );

    return (
        <Drawer
            open={drawerOpen}
            title={pages[currentPage].title}
            isLast
            closable={false}
            footer={footer}
            headerStyle={headerFooterOverride}
            footerStyle={headerFooterOverride}
            bodyStyle={bodyOverride}>
            {children}
        </Drawer>
    );
};

HelpDrawer.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default HelpDrawer;
