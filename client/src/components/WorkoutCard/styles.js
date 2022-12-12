import styled from '@emotion/styled';
import { gray } from '../StyledComponents';

export const CardWrapper = styled.div`
    padding: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: ${gray[4]};
    box-shadow: 2px 2px 4px ${gray[4]};
`;

export const CardHeader = styled.div`
    min-height: fit-content;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    line-height: 24px;
`;

export const CardBody = styled.div`
    position: relative;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    gap: 10px;
`;

export const CardFooter = styled.div`
    min-height: fit-content;
    display: flex;
    justify-content: space-between;
`;

export const HeaderTitle = styled.div`
    display: flex;
    align-items: baseline;
`;

export const HeaderText = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    font-size: 30px;
`;
export const HeaderNumber = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    font-size: 36px;
`;

export const CardInfo = styled.div`
    height: fit-content;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    z-index: 2;
`;

export const ExercisesWrapper = styled.div`
    z-index: 5;
    max-height: inherit;
    overflow: hidden;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const CardStatus = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const CardLabels = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const CardBadges = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const StatusLine = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
export const StatusIcon = styled.div`
    width: 20px;
    font-size: 18px;
    line-height: 22px;
`;

export const StatusText = styled.div``;

export const StyledHr = styled.div`
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
    border-style: dotted;
    border-width: 1px 0px 0px 0px;
    border-color: ${gray[4]};
`;

export const CardLine = styled.div`
    width: 100%;
    display: flex;
    font-size: 12px;
`;

export const Label = styled.div`
    width: 120px;
    padding: 3px;
    font-size: 12px;
    line-height: 12px;
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

export const LightBadge = styled.span`
    width: fit-content;
    padding: 3px;
    border-radius: 3px;
    border-style: dotted;
    border-color: ${gray[5]};
    border-width: 1px;
    font-size: 12px;
    line-height: 12px;
`;

export const FooterPlan = styled.span`
    display: flex;
    gap: 10px;
`;

export const BackgroudNumber = styled.div`
    z-index: 1;
    position: absolute;
    bottom: -30px;
    right: -30px;
    height: 350px;
    width: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    outline-style: solid;
    outline-width: 1px;
    outline-color: ${gray[3]};
    outline-offset: 5px;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    font-size: 270px;
    line-height: 270px;
    letter-spacing: -10px;
    background: ${gray[3]};
`;

export const CompleteWrapper = styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const CompleteTitle = styled.span``;

export const CompleteForm = styled.span`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border-style: dotted;
    border-color: ${gray[5]};
    border-width: 1px;
`;

export const CompleteDateWrapper = styled.span`
    display: flex;
    justify-content: space-between;
`;
