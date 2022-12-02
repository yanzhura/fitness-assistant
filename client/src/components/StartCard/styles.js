import styled from '@emotion/styled';
import { gray } from '../StyledComponents';

export const MainWrapper = styled.div`
    height: 200px;
    width: 600px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;

export const IconWrapper = styled.div`
    height: 100%;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledIcon = styled.img`
    max-width: 100px;
    max-height: 100px;
`;

export const CardWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-grow: 1;
    width: 60%;
    outline-style: solid;
    outline-width: 1px;
    outline-color: #fff;
    outline-offset: 5px;
    border-radius: 5px;
`;

export const StyledImage = styled.img`
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    max-width: 100%;
    max-height: 100%;
`;

export const TextWrapper = styled.div`
    padding: 10px 10px 10px 20px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #fff;
    color: ${gray[7]};
    display: flex;
    align-items: center;
`;
