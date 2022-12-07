import styled from '@emotion/styled';
import { lime, orange } from '@ant-design/colors';
import { gray } from '../StyledComponents';

export const StyledCell = styled.div`
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 5px;
    background: ${(props) => {
        switch (props.workoutStatus) {
            case 'current':
                return orange[5];

            case 'completed':
                return lime[5];

            default:
                break;
        }
    }};
`;

export const CalendarHeader = styled.div`
    display: flex;
    justify-content: end;
    margin: 5px;
`;

export const DarkBadge = styled.span`
    width: fit-content;
    margin-left: 5px;
    margin-right: 5px;
    padding: 3px;
    background: ${gray[8]};
    color: #fff;
    border-radius: 3px;
    font-size: 12px;
    line-height: 12px;
`;
