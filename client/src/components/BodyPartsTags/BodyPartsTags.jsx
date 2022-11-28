import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { capitalize } from '../../utils/capitalize';
//* styles
import { tagColors } from './styles';

const BodyPartsTags = ({ bodyParts }) => {
    const getTagColor = (number) => {
        return tagColors[number];
    };

    return Object.keys(bodyParts).map((key) => {
        const getNumberRegexp = /\d+/g;
        const bodyPartNumber = parseInt(getNumberRegexp.exec(key)) - 1;
        return (
            <Tag key={bodyParts[key].name} icon={<UserOutlined />} color={getTagColor(bodyPartNumber)}>
                {capitalize(bodyParts[key].name)}
            </Tag>
        );
    });
};

BodyPartsTags.propTypes = {
    bodyParts: PropTypes.object.isRequired
};

export default BodyPartsTags;
