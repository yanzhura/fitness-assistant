import styled from '@emotion/styled';
import { gray } from '../../components/StyledComponents';

export const HomeWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
`;

export const HomeWorkout = styled.div`
    max-width: 70%;
`;
export const HomeInfo = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const InfoElement = styled.div`
    padding: 5px;
    border-style: dotted;
    border-color: ${gray[5]};
    border-width: 1px;
    border-radius: 5px;
`;

export const WorkoutTitle = styled.div`
    display: flex;
    align-items: baseline;
`;

export const WorkoutText = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    font-size: 30px;
`;
export const WorkoutNumber = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    font-size: 36px;
`;
