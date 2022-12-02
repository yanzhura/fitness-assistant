import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonsWrapper, IconWrapper, MainWrapper, StyledButton, StyledIcon, TextWrapper } from './styles';

const EnterButtons = () => {
    return (
        <MainWrapper>
            <TextWrapper>Начать пользоваться сервисом</TextWrapper>
            <IconWrapper>
                <StyledIcon />
            </IconWrapper>
            <ButtonsWrapper>
                <Link to="/login/signUp">
                    <StyledButton type="primary">Зарегистрируйтесь</StyledButton>
                </Link>
                или
                <Link to="/login/signIn">
                    <StyledButton type="primary">Войдите</StyledButton>
                </Link>
            </ButtonsWrapper>
        </MainWrapper>
    );
};

export default EnterButtons;
