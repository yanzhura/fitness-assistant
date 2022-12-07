import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from '../../utils/capitalize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand } from '@fortawesome/free-solid-svg-icons';
//* styles
import { ColorBadge, tagColors } from './styles';
import { Space } from 'antd';

const BodyPartsTags = ({ bodyParts, size }) => {
    const getTagColor = (number) => {
        return tagColors[number];
    };

    return Object.keys(bodyParts).map((key, index) => {
        const getNumberRegexp = /\d+/g;
        const bodyPartNumber = parseInt(getNumberRegexp.exec(key)) - 1;
        return (
            <ColorBadge key={index} color={getTagColor(bodyPartNumber)} size={size}>
                <Space>
                    <FontAwesomeIcon icon={faHand} />
                    {capitalize(bodyParts[key].name)}
                </Space>
            </ColorBadge>
        );
    });
};

BodyPartsTags.propTypes = {
    bodyParts: PropTypes.object.isRequired,
    size: PropTypes.string
};

export default BodyPartsTags;
