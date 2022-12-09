import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { capitalize } from '../../utils/capitalize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { Space } from 'antd';
//* styles
import { ColorBadge, tagColors } from './styles';
import { getBodyParts } from '../../store/trainingPlan';

const BodyPartsTags = ({ bodyParts, size }) => {
    const allBodyParts = useSelector(getBodyParts());
    return bodyParts.map((part, index) => {
        const colorIndex = allBodyParts.indexOf(part);
        const color = tagColors[colorIndex];
        return (
            <ColorBadge key={index} size={size} color={color}>
                <Space>
                    <FontAwesomeIcon icon={faHand} />
                    {capitalize(part)}
                </Space>
            </ColorBadge>
        );
    });
};

BodyPartsTags.propTypes = {
    bodyParts: PropTypes.array.isRequired,
    size: PropTypes.string
};

export default BodyPartsTags;
