import React from 'react';
import PropTypes from 'prop-types';
import Title from 'antd/lib/typography/Title';

const WelcomeSlide = ({ title, body }) => {
    return (
        <div>
            <Title level={3}>{title}</Title>
            <p>{body}</p>
        </div>
    );
};

WelcomeSlide.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string.isRequired
};

export default WelcomeSlide;
