import styled from '@emotion/styled';
import { gray } from '../StyledComponents';

export const ModalWrapper = styled.div`
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CardWrapper = styled.div`
    width: 350px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const CardHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-radius: 5px;
    outline-style: solid;
    outline-width: 1px;
    outline-color: ${gray[3]};
    outline-offset: 5px;
`;

export const Photo = styled.img`
    width: 170px;
    border-radius: 5px;
`;

export const CardText = styled.div`
    width: 100%;
    padding: 10px;
    font-size: 14px;
    line-height: 16px;
    background: ${gray[3]};
    border-radius: 5px;
    outline-style: solid;
    outline-width: 1px;
    outline-color: ${gray[3]};
    outline-offset: 5px;
`;

export const BigTitle = styled.div`
    margin-bottom: 20px;
    font-family: 'Montserrat', 'sans-serif';
    font-size: 18px;
    color: ${gray[8]};
`;

export const SmallTitle = styled.div`
    margin: 10px 0px 5px 0px;
    font-family: 'Montserrat', 'sans-serif';
    font-size: 14px;
    color: ${gray[8]};
`;

export const CardBadges = styled.div`
    position: absolute;
    left: -5px;
    top: 40px;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const LightBadge = styled.span`
    width: fit-content;
    padding: 3px;
    border-radius: 3px;
    border-style: dotted;
    border-color: ${gray[5]};
    border-width: 1px;
    font-size: 12px;
    line-height: 12px;
    background: #fff;
`;
