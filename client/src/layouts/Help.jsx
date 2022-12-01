import { Col, Collapse, Row } from 'antd';
import React from 'react';
import HelpDrawer from '../components/HelpDrawer/HelpDrawer';
import { AboutHelp } from '../pages/QuickTour';
import { StyledBorderBox } from '../components/StyledComponents';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { helpTopics } from '../components/HelpTopics';

const Help = () => {
    const getHelpItems = (elements, index) => {
        return elements.map((el) => (
            <CollapsePanel key={index} header={el.title}>
                {el.body}
            </CollapsePanel>
        ));
    };

    return (
        <>
            <div>
                <h3>Помощь</h3>
                <Col span={16} offset={4}>
                    <Row justify={'center'}>
                        <StyledBorderBox>
                            <Collapse accordion>{getHelpItems(helpTopics)}</Collapse>
                        </StyledBorderBox>
                    </Row>
                </Col>
            </div>
            <HelpDrawer>
                <AboutHelp />
            </HelpDrawer>
        </>
    );
};

export default Help;
