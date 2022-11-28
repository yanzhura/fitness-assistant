import styled from '@emotion/styled';
import { lime, volcano } from '@ant-design/colors';

export const StyledCell = styled.div`
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 5px;
    background: ${(props) => {
        switch (props.workoutStatus) {
            case 'current':
                return volcano[5];

            case 'completed':
                return lime[5];

            default:
                break;
        }
    }};
`;
