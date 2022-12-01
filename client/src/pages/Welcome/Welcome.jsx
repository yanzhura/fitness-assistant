import { Button, Col, Row } from 'antd';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { StyledBorderBox } from '../../components/StyledComponents';
import { hideWelcomPage } from '../../store/user';
import { CarouselWrapper, StyledButtonsBox, StyledCarouselBox, StyledComponentBox } from './styles';

import { HelpPage1, HelpPage2, HelpPage3, HelpPage4 } from '../HelpTopics';

const Welcome = () => {
    const carousel = useRef();
    const dispatch = useDispatch();

    const components = [<HelpPage1 key={0} />, <HelpPage2 key={1} />, <HelpPage3 key={2} />, <HelpPage4 key={3} />];

    const handleNext = () => {
        carousel.current.next();
    };

    const handleFinish = () => {
        dispatch(hideWelcomPage());
    };

    const getCarouselElements = () => {
        let keyCounter = 0;
        return components.map((component, index) => {
            const handler = index < components.length - 1 ? handleNext : handleFinish;
            const title = index < components.length - 1 ? 'Далее' : 'Завершить';
            keyCounter++;
            return (
                <div key={keyCounter}>
                    <StyledCarouselBox>
                        <StyledComponentBox>{component}</StyledComponentBox>
                        <StyledButtonsBox>
                            <Button type="primary" onClick={handler}>
                                {title}
                            </Button>
                        </StyledButtonsBox>
                    </StyledCarouselBox>
                </div>
            );
        });
    };

    return (
        <Col span={16} offset={4}>
            <Row justify={'center'}>
                <StyledBorderBox>
                    <CarouselWrapper ref={carousel}>{getCarouselElements()}</CarouselWrapper>
                </StyledBorderBox>
            </Row>
        </Col>
    );
};

export default Welcome;
