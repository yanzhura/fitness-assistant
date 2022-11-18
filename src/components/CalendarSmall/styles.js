import styled from '@emotion/styled';

export const StyledCell = styled.div`
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 5px;
    background: ${(props) => {
        switch (props.workoutStatus) {
            case 'current':
                return '#ff7a45';

            case 'completed':
                return '#bae637';

            default:
                break;
        }
    }};
`;
