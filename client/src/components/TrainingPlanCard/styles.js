import styled from '@emotion/styled';
import { Card } from 'antd';

export const StyledCard = styled(Card)`
    height: 200px;
    width: 280px;
    border-radius: 5px;
    overflow: hidden;
`;

export const HeaderWrapper = styled.div`
    display: flex;
`;

export const LeftIcon = styled.div`
    height: 30px;
    width: 40px;
    font-size: 28px;
    display: flex;
    justify-content: start;
    align-items: center;
`;
export const RightIcon = styled.div`
    height: 30px;
    width: 40px;
    font-size: 28px;
    display: flex;
    justify-content: start;
    align-items: center;
`;

export const HeaderText = styled.div`
    font-family: 'Montserrat', sans-serif;
    flex-grow: 1;
    display: flex;
    justify-content: end;
    align-items: center;
`;

export const TextWrapper = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const TopText = styled.div`
    display: flex;
    font-size: 10px;
    justify-content: end;
`;

export const BottomText = styled.div`
    display: flex;
    font-size: 18px;
    line-height: 18px;
    justify-content: end;
`;
