import styled from '@emotion/styled';
import { gray } from './grayPalette';

const StyledTitle = styled.div((props) => {
    let size;
    if (props.level === '1') {
        size = '48px';
    } else if (props.level === '2') {
        size = '36px';
    } else if (props.level === '3') {
        size = '24px';
    } else if (props.level === '4') {
        size = '12px';
    } else if (props.level === '5') {
        size = '10px';
    }
    return {
        fontFamily: '"Montserrat", "sans-serif"',
        paddingBottom: '20px',
        fontSize: size,
        color: `${gray[7]}`
    };
});

export default StyledTitle;
