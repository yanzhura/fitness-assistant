import styled from '@emotion/styled';
import { gray } from '../StyledComponents';

export const ExerciseWrapper = styled.div`
    z-index: 5;
    padding: 10px 20px 10px 20px;
    max-height: fit-content;
    display: flex;
    align-items: flex-start;
    gap: 5px;
    border-style: dotted;
    border-width: 1px;
    border-color: ${gray[4]};
    border-radius: 5px;
    cursor: pointer;
`;

export const PhotoFrame = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    background: ${gray[3]};
    border-radius: 50%;
`;

export const ExercisePhoto = styled.div`
    height: 60px;
    width: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: #fff;
`;
export const Photo = styled.img`
    width: 60px;
`;

export const ExerciseResult = styled.div`
    width: 50px;
    display: flex;
    padding-left: 10px;
    flex-direction: column;
    align-items: flex-start;
`;

export const ExerciseText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
`;

export const ResultNumber = styled.div`
    font-size: 24px;
    line-height: 24px;
    font-weight: 600;
`;

export const ResultUnits = styled.div`
    font-size: 14px;
    line-height: 14px;
    color: ${gray[6]};
    padding-left: 2px;
`;

export const TextTitle = styled.div`
    display: flex;
    font-size: 18px;
    line-height: 18px;
    font-weight: 600;
`;

export const TextTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`;

export const tagColors = ['magenta', 'red', 'orange', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
