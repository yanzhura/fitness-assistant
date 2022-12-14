import { Button } from 'antd';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { StyledTitle } from '../../components/StyledComponents';
import { hideWelcomePage } from '../../store/user';
import { helpTopics } from '../../components/HelpTopics';
import WelcomeSlide from './WelcomeSlide';
//* styles
import { CarouselWrapper, ButtonsBox, CarouselBox, ComponentBox, SlideWrapper, PhotoBox } from './styles';

const Welcome = () => {
    const carousel = useRef();
    const dispatch = useDispatch();

    const handleNext = () => {
        carousel.current.next();
    };

    const handleFinish = () => {
        dispatch(hideWelcomePage());
    };

    const getCarouselElements = (elements) => {
        let keyCounter = 0;
        return elements.map((el, index) => {
            const handler = index < elements.length - 1 ? handleNext : handleFinish;
            const title = index < elements.length - 1 ? 'Далее' : 'Завершить';
            keyCounter++;
            return (
                <div key={keyCounter}>
                    <PhotoBox>
                        <CarouselBox>
                            <ComponentBox>
                                <WelcomeSlide title={el.title} body={el.body} photoId={el.photoId} />
                            </ComponentBox>
                            <ButtonsBox>
                                <Button type="primary" onClick={handler}>
                                    {title}
                                </Button>
                            </ButtonsBox>
                        </CarouselBox>
                    </PhotoBox>
                </div>
            );
        });
    };

    return (
        <>
            <StyledTitle level="3">Перед началом занятий</StyledTitle>
            <SlideWrapper>
                <CarouselWrapper ref={carousel}>{getCarouselElements(helpTopics)}</CarouselWrapper>
            </SlideWrapper>
        </>
    );
};

export default Welcome;
