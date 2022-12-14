import styled from '@emotion/styled';
import { gray } from '../../components/StyledComponents';

export const CenteredWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

export const CenteredBox = styled.div`
    width: 600px;
    padding-top: 120px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const LogoWrapper = styled.div`
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
`;

export const Logo = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

export const GreetingTitle = styled.div`
    font-family: 'Montserrat', 'sans-serif';
    font-size: 48px;
    color: #fff;
    text-shadow: 3px 4px 5px #000;
`;

export const Greeting = styled.div`
    font-family: 'Montserrat', 'sans-serif';
    font-size: 36px;
    color: #fff;
    text-shadow: 3px 4px 5px #000;
`;

export const FitnessAssistant = styled.div`
    font-family: 'Montserrat', 'sans-serif';
    text-shadow: 3px 4px 5px #000;
    font-style: italic;
`;

export const FitnessAssistantLeft = styled.span`
    font-size: 40px;
    color: #fff;
`;

export const FitnessAssistantRight = styled.span`
    font-size: 50px;
    color: #f9a61a;
`;

export const MainText = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    width: 600px;
    padding: 40px 20px;
    background: #fff;
    color: ${gray[6]};
    border-radius: 5px;
    box-shadow: 3px 4px 5px #000;
`;

export const Cards = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
`;
