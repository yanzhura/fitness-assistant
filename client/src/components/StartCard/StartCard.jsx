import React from 'react';
import PropTypes from 'prop-types';
import { CardWrapper, IconWrapper, MainWrapper, StyledIcon, StyledImage, TextWrapper } from './styles';

const StartCard = ({ icon, image, text, align = 'left' }) => {
    return (
        <MainWrapper>
            {align === 'left' && (
                <IconWrapper>
                    <StyledIcon src={icon} />
                </IconWrapper>
            )}
            <CardWrapper>
                <StyledImage src={image} />
                <TextWrapper>{text}</TextWrapper>
            </CardWrapper>
            {align === 'right' && (
                <IconWrapper>
                    <StyledIcon src={icon} />
                </IconWrapper>
            )}
        </MainWrapper>
    );
};

StartCard.propTypes = {
    icon: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    align: PropTypes.string
};

export default StartCard;
