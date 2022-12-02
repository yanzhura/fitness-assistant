import React from 'react';
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
    LogoWrapper,
    MainText
} from './styles';
import logo from '../../assets/logoWithoutText.png';
import StartCard from '../../components/StartCard/StartCard';
import imageNovice1 from '../../assets/gymNovice1.jpg';
import imageNovice2 from '../../assets/gymNovice2.jpg';
import imageNovice3 from '../../assets/gymNovice3.jpg';
import iconKettleBell from '../../assets/iconKetlebell.png';
import iconDumbBell from '../../assets/iconDumbbell.png';
import iconArm from '../../assets/iconArm.png';
import { Space } from 'antd';

const lorem = `Задача организации, в особенности же высококачественный прототип будущего проекта влечет за собой процесс внедрения и модернизации вывода текущих активов. Лишь предприниматели в сети интернет могут быть ассоциативно распределены по отраслям. В частности, экономическая повестка сегодняшнего дня однозначно фиксирует необходимость приоретизации разума над эмоциями. Не следует, однако, забывать, что повышение уровня гражданского сознания не даёт нам иного выбора, кроме определения соответствующих условий активизации. Банальные, но неопровержимые выводы, а также явные признаки победы институционализации, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут представлены в исключительно положительном свете. Таким образом, внедрение современных методик позволяет выполнить важные задания по разработке системы обучения кадров, соответствующей насущным потребностям. Вот вам яркий пример современных тенденций — граница обучения кадров предопределяет высокую востребованность своевременного выполнения сверхзадачи. Однозначно, акционеры крупнейших компаний, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут в равной степени предоставлены сами себе. Таким образом, постоянный количественный рост и сфера нашей активности не даёт нам иного выбора, кроме определения прогресса профессионального сообщества. Приятно, граждане, наблюдать, как реплицированные с зарубежных источников, современные исследования неоднозначны и будут смешаны с не уникальными данными до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности.`;
const loremShort = `Задача организации, в особенности же высококачественный прототип будущего проекта влечет за собой процесс внедрения и модернизации вывода текущих активов. Лишь предприниматели в сети интернет могут быть ассоциативно распределены по отраслям.`;

const cardsData = [
    {
        text: loremShort,
        image: imageNovice1,
        icon: iconKettleBell,
        align: 'left'
    },
    {
        text: loremShort,
        image: imageNovice2,
        icon: iconDumbBell,
        align: 'right'
    },
    {
        text: loremShort,
        image: imageNovice3,
        icon: iconArm,
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
                        <Logo src={logo} />{' '}
                    </LogoWrapper>
                    <FitnessAssistant>
                        <FitnessAssistantLeft>ФИТНЕСС</FitnessAssistantLeft>
                        <FitnessAssistantRight>АССИСТЕНТ</FitnessAssistantRight>
                    </FitnessAssistant>
                    <Cards>
                        <Space size={100} direction="vertical">
                            {getStartCards()}
                        </Space>
                    </Cards>
                    <MainText>{lorem}</MainText>
                </CenteredBox>
            </CenteredWrapper>
        </PhotoWrapper>
    );
};

export default Start;
