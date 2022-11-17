import { css } from '@emotion/react';

export const headStyles = {
    complete: {
        backgroundColor: '#c0ff85'
    },
    current: {
        backgroundColor: '#ffac85'
    },
    incomplete: {
        backgroundColor: '#cecece'
    }
};

export const cardOverride = css`
    height: 100%;
    border-radius: 5px;
`;
