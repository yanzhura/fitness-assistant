import styled from '@emotion/styled';
import { gray } from '../StyledComponents';

export const TextWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TextBox = styled.div`
    width: 600px;
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    line-height: 18px;
    font-weight: 600;
    color: ${gray[8]};
`;
