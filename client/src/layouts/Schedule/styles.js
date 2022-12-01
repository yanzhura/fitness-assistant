import styled from '@emotion/styled';
import { Tag } from 'antd';
import { lime, volcano } from '@ant-design/colors';

export const StyledTag = styled(Tag)`
    color: #000;
`;

export const tagColors = {
    completed: lime[5],
    current: volcano[5]
};
