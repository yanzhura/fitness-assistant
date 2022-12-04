import styled from '@emotion/styled';
import { gray } from './grayPalette';

const LayoutWrapper = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    background: ${gray[2]};
`;

export default LayoutWrapper;
