import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getQuickTourPage, getShowQuickTour, hideQuickTour, nextQuickTourPage } from '../../store/user';
import customHistory from '../../utils/customHistory';
import pages from './pages';
//* styles
import { bodyOverride, headerFooterOverride } from './styles';

const HelpDrawer = () => {
    const dispatch = useDispatch();
    const isQuickTourOpen = useSelector(getShowQuickTour());
    const currentPage = useSelector(getQuickTourPage());

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
            {pages[currentPage].text}
        </Drawer>
    );
};

export default HelpDrawer;
