import React from 'react';
import { Space } from 'antd';
import appConfig from '../../App.config';
import StartCard from '../../components/StartCard/StartCard';
//* styles
import { PhotoWrapper } from '../../components/StyledComponents';
import {
    Cards,
    CenteredBox,
    CenteredWrapper,
    FitnessAssistant,
    FitnessAssistantLeft,
    FitnessAssistantRight,
    Greeting,
    GreetingTitle,
    Logo,
    LogoWrapper
} from './styles';

const cardsData = [
    {
        text: 'Перестаньте ломать голову над тем, что делать с абонементом в фитнес-клуб, который вам подарили. Больше не надо жалеть о деньгах, который вы потратили на абонемент, по которому не ходите в спортзал. Начните заниматься с вашим ассистентом в ближайшие дни!',
        image: `${appConfig.staticUrl}/startPage/gymNovice1.jpg`,
        icon: `${appConfig.staticUrl}/startPage/logoKettleBell.png`,
        align: 'left'
    },
    {
        text: 'Люди, которые начинают ходить в зал - растеряны и смущены. Они бродят от тренажёра к тренажёру, делают бессмыссленные упражнения без цели и плана. У вас есть такой план! Приходите на каждую тренировку с чётким знанием того, что вы будете делать. Вы будете точно знать чем заниматься с первого и до последнего дня.',
        image: `${appConfig.staticUrl}/startPage/gymNovice2.jpg`,
        icon: `${appConfig.staticUrl}/startPage/logoDumbBell.png`,
        align: 'right'
    },
    {
        text: 'Пройдите через 36 специальных тренировок для начинающих и превратитесь из новичка в завсегдатая спортивного клуба. По окончании программы вы сможете отследить прогрес в цифрах и графиках и оценить успех от занятий. Спустя 3 месяца занятий вы обретёте знания и навыки, которые помогут вам понять, куда двигаться дальше в мире спорта!',
        image: `${appConfig.staticUrl}/startPage/gymNovice3.jpg`,
        icon: `${appConfig.staticUrl}/startPage/logoArm.png`,
        align: 'left'
    }
];

const getStartCards = () => {
    return cardsData.map((card, index) => (
        <StartCard key={index} text={card.text} image={card.image} icon={card.icon} align={card.align} />
    ));
};

const Start = () => {
    return (
        <PhotoWrapper>
            <CenteredWrapper>
                <CenteredBox>
                    <GreetingTitle>ЗДРАВСТВУЙТЕ!</GreetingTitle>
                    <Greeting>Я ВАШ ПЕРСОНАЛЬНЫЙ</Greeting>
                    <LogoWrapper>
                        <Logo src={`${appConfig.staticUrl}/startPage/logoWithoutText.png`} />{' '}
                    </LogoWrapper>
                    <FitnessAssistant>
                        <FitnessAssistantLeft>ФИТНЕС</FitnessAssistantLeft>
                        <FitnessAssistantRight>АССИСТЕНТ</FitnessAssistantRight>
                    </FitnessAssistant>
                    <Cards>
                        <Space size={100} direction="vertical">
                            {getStartCards()}
                        </Space>
                    </Cards>
                </CenteredBox>
            </CenteredWrapper>
        </PhotoWrapper>
    );
};

export default Start;
