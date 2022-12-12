import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { StyledTitle } from '../../components/StyledComponents';
import { SlideText } from './styles';

const WelcomeSlide = ({ title, body, photoId }) => {
    return (
        <>
            <StyledTitle level="4">{title}</StyledTitle>
            <SlideText>{parse(body)}</SlideText>
        </>
    );
};

WelcomeSlide.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string.isRequired,
    photoId: PropTypes.number.isRequired
};

export default WelcomeSlide;
