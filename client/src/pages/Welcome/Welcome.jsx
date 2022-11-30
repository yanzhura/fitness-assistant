import { Button, Col, Row } from 'antd';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { StyledBorderBox } from '../../components/StyledComponents';
import { hideWelcomPage } from '../../store/user';
import { CarouselWrapper, StyledButtonsBox, StyledCarouselBox, StyledComponentBox } from './styles';
import WelcomePage1 from './WelcomePage1';
import WelcomePage2 from './WelcomePage2';
import WelcomePage3 from './WelcomePage3';
import WelcomePage4 from './WelcomePage4';

const Welcome = () => {
    const carousel = useRef();
    const dispatch = useDispatch();

    const components = [
        <WelcomePage1 key={0} />,
        <WelcomePage2 key={1} />,
        <WelcomePage3 key={2} />,
        <WelcomePage4 key={3} />
    ];

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
