import styled from '@emotion/styled';
import { gray } from '../../components/StyledComponents';

export const MainWrapper = styled.div`
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const HeaderWrapper = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    display: flex;
    height: 110px;
    padding-left: 20px;
    padding-right: 20px;
    background: ${gray[9]};
    gap: 20px;
    z-index: 1;
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export const Footer = styled.div`
    margin: 0;
    padding-left: 20px;
    height: 50px;
    display: flex;
    align-items: center;
    background: ${gray[3]};
    color: ${gray[6]};
    font-size: 14px;
`;
