import { Button, Col, Row } from 'antd';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { StyledBorderBox } from '../../components/StyledComponents';
import { hideWelcomPage } from '../../store/user';
import { helpTopics } from '../../components/HelpTopics';
import WelcomeSlide from './WelcomeSlide';
//* styles
import { CarouselWrapper, StyledButtonsBox, StyledCarouselBox, StyledComponentBox } from './styles';

const Welcome = () => {
    const carousel = useRef();
    const dispatch = useDispatch();

    const handleNext = () => {
        carousel.current.next();
    };

    const handleFinish = () => {
        dispatch(hideWelcomPage());
    };

    const getCarouselElements = (elements) => {
        let keyCounter = 0;
        return elements.map((el, index) => {
            const handler = index < elements.length - 1 ? handleNext : handleFinish;
            const title = index < elements.length - 1 ? 'Далее' : 'Завершить';
            keyCounter++;
            return (
                <div key={keyCounter}>
                    <StyledCarouselBox>
                        <StyledComponentBox>
                            <WelcomeSlide title={el.title} body={el.body} />
                        </StyledComponentBox>
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
                    <CarouselWrapper ref={carousel}>{getCarouselElements(helpTopics)}</CarouselWrapper>
                </StyledBorderBox>
            </Row>
        </Col>
    );
};

export default Welcome;
