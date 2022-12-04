import React from 'react';
import HelpDrawer from '../../components/HelpDrawer/HelpDrawer';
import { AboutHelp } from '../../pages/QuickTour';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { helpTopics } from '../../components/HelpTopics';
import { LayoutColumn, LayoutWrapper, StyledTitle } from '../../components/StyledComponents';
import { StyledCollapse, StyledHeader } from './styles';

const Help = () => {
    const getHelpItems = (elements) => {
        return elements.map((el, index) => (
            <CollapsePanel key={index} header={<StyledHeader level="4">{el.title}</StyledHeader>}>
                {el.body}
            </CollapsePanel>
        ));
    };

    return (
        <LayoutWrapper>
            <LayoutColumn>
                <StyledTitle level="3">Помощь</StyledTitle>
                <StyledCollapse accordion>{getHelpItems(helpTopics)}</StyledCollapse>
                <HelpDrawer>
                    <AboutHelp />
                </HelpDrawer>
            </LayoutColumn>
        </LayoutWrapper>
    );
};

export default Help;
