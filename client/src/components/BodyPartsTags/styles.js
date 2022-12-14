import styled from '@emotion/styled';

import { red, orange, green, cyan, blue, purple, magenta, volcano, geekblue } from '@ant-design/colors';

export const tagColors = [
    red[5],
    orange[5],
    green[5],
    cyan[5],
    blue[5],
    purple[5],
    magenta[5],
    volcano[5],
    geekblue[5]
];

export const ColorBadge = styled.div((props) => {
    const background = props.color || '#ccc';
    const fontSize = props.size === 'small' ? '10px' : '12px';
    const borderRadius = props.size === 'small' ? '0px' : '3px';
    return {
        maxWidth: 'fit-content',
        display: 'inline-flex',
        padding: '3px',
        background,
        color: '#fff',
        borderRadius,
        fontSize,
        lineHeight: `${fontSize}`
    };
});
