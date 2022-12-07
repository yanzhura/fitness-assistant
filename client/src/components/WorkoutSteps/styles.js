import styled from '@emotion/styled';
import { gray } from '../StyledComponents';

export const GrayBadge = styled.span((props) => {
    const background = props.light ? gray[5] : gray[8];
    return {
        width: 'fit-content',
        marginRight: '5px',
        padding: '0px 3px 0px 3px',
        background,
        color: '#fff',
        borderRadius: '3px',
        fontSize: '12px',
        lineHeight: '12px'
    };
});
