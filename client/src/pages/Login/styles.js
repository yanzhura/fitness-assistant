import styled from '@emotion/styled';
import { Button } from 'antd';

export const CenteredWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const FormWrapper = styled.div`
    width: 400px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #fff;
    outline-style: solid;
    outline-width: 1px;
    outline-offset: 5px;
    outline-color: #fff;
`;

export const formOverride = {
    width: '100%'
};

export const StyledButton = styled(Button)`
    width: 120px;
`;
