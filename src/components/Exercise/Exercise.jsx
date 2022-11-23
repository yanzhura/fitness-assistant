import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Card, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { capitalize } from '../../utils/capitalize';
//* styles
import { ExerciseWrapper, tagColors } from './styles';

const Exercise = ({ group, name, bodyParts }) => {
    const getTagColor = (number) => {
        return tagColors[number];
    };

    const getBodypartsTags = () => {
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

    return (
        <ExerciseWrapper>
            <Badge.Ribbon text={group} color={'#aaa'}>
                <Card size={'small'}>
                    <div>{getBodypartsTags()}</div>
                    <Title level={4}>{capitalize(name)}</Title>
                </Card>
            </Badge.Ribbon>
        </ExerciseWrapper>
    );
};

Exercise.propTypes = {
    group: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bodyParts: PropTypes.object.isRequired
};

export default Exercise;
