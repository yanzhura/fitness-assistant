import styled from '@emotion/styled';
import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { gray } from '../StyledComponents';

export const MainWrapper = styled.div`
    inset: 0;
    display: flex;
    gap: 20px;
`;

export const TextWrapper = styled.div`
    color: ${gray[5]};
    font-family: 'Montserrat', 'sans-serif';
    font-size: 18px;
`;

export const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const StyledButton = styled(Button)`
    width: 200px;
`;

export const StyledIcon = styled(RightOutlined)`
    font-size: 64px;
    color: ${gray[8]};
`;
