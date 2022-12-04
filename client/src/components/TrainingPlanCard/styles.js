import { lime, volcano, grey } from '@ant-design/colors';
import styled from '@emotion/styled';
import { Card } from 'antd';

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

export const StyledCard = styled(Card)`
    height: 200px;
    width: 280px;
    border-radius: 5px;
    overflow: hidden;
`;
