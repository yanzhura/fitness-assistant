import styled from '@emotion/styled';
import { lime, orange } from '@ant-design/colors';
import { gray } from '../../components/StyledComponents';

export const StyledTag = styled.div((props) => {
    const background = props.status === 'completed' ? lime[5] : orange[5];
    return {
        background,
        padding: '4px',
        width: '100%',
        height: '40px',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        borderRadius: '3px'
    };
});

export const CalendarWrapper = styled.div`
    padding: 15px;
    border-style: dotted;
    border-color: ${gray[5]};
    border-width: 1px;
    border-radius: 5px;
`;

export const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const DateBox = styled.div`
    color: ${gray[6]};
`;

export const ButtonsBox = styled.div`
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
`;
