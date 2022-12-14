import styled from '@emotion/styled';
import { Collapse } from 'antd';
import { gray, logoColors } from '../../components/StyledComponents';

export const HelpWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-top: 30px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    border-style: dotted;
    border-color: ${gray[5]};
    border-width: 1px;
    border-radius: 5px;
    overflow: hidden;
`;

export const StyledCollapse = styled(Collapse)`
    z-index: 5;
    width: 80%;
    height: fit-content;
`;

export const StyledHeader = styled.div`
    font-size: 18px;
    font-family: 'Montserrat', 'sans-serif';
    font-style: italic;
    display: flex;
    align-items: center;
    justify-content: end;
`;

export const BackgroudSymbol = styled.div`
    z-index: 1;
    position: absolute;
    bottom: -30px;
    right: -30px;
    height: 350px;
    width: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    outline-style: solid;
    outline-width: 1px;
    outline-color: ${gray[8]};
    outline-offset: 5px;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    font-size: 270px;
    color: ${logoColors[0]};
    line-height: 270px;
    letter-spacing: -10px;
    background: ${gray[8]};
`;
