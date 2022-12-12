import React from 'react';
import HelpDrawer from '../../components/HelpDrawer';
import { AboutHelp } from '../../pages/QuickTour';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { helpTopics } from '../../components/HelpTopics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { LayoutColumn, LayoutWrapper, StyledTitle } from '../../components/StyledComponents';
import parse from 'html-react-parser';
//* styles
import { BackgroudSymbol, HelpWrapper, StyledCollapse } from './styles';

const Help = () => {
    const getHelpItems = (elements) => {
        return elements.map((el, index) => (
            <CollapsePanel
                key={index}
                header={
                    <StyledTitle level="4" italic>
                        {el.title}
                    </StyledTitle>
                }>
                {parse(el.body)}
            </CollapsePanel>
        ));
    };

    return (
        <LayoutWrapper>
            <LayoutColumn>
                <StyledTitle level="3">Помощь</StyledTitle>
                <HelpWrapper>
                    <StyledCollapse accordion>{getHelpItems(helpTopics)}</StyledCollapse>
                    <BackgroudSymbol>
                        <FontAwesomeIcon icon={faQuestion} />
                    </BackgroudSymbol>
                </HelpWrapper>
                <HelpDrawer>
                    <AboutHelp />
                </HelpDrawer>
            </LayoutColumn>
        </LayoutWrapper>
    );
};

export default Help;
