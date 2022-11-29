import { css } from '@emotion/react';
import { lime, volcano, grey } from '@ant-design/colors';

export const headStyles = {
    completed: {
        backgroundColor: lime[5]
    },
    current: {
        backgroundColor: volcano[5]
    },
    incompleted: {
        backgroundColor: grey[5]
    }
};

export const cardOverride = css`
    height: 100%;
    border-radius: 5px;
`;
