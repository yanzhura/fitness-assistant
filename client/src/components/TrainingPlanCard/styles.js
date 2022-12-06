import styled from '@emotion/styled';
import { Card } from 'antd';
import { gray } from '../StyledComponents';
import { green, orange } from '@ant-design/colors';

export const StyledCard = styled(Card)((props) => {
    const shadowColor = props.status === 'completed' ? green[1] : props.status === 'incompleted' ? gray[4] : orange[1];
    return {
        height: '265px',
        width: '280px',
        borderRadius: '5px',
        overflow: 'hidden',
        zIndex: 1,
        boxShadow: `2px 2px 4px ${shadowColor}`,
        ':hover': {
            boxShadow: `5px 5px 4px ${shadowColor}`
        }
    };
});

export const HeaderWrapper = styled.div`
    display: flex;
`;

export const LeftIcon = styled.div`
    height: 30px;
    width: 40px;
    font-size: 28px;
    display: flex;
    justify-content: start;
    align-items: center;
`;
export const RightIcon = styled.div`
    height: 30px;
    width: 40px;
    font-size: 28px;
    display: flex;
    justify-content: start;
    align-items: center;
`;

export const HeaderText = styled.div`
    font-family: 'Montserrat', sans-serif;
    flex-grow: 1;
    display: flex;
    justify-content: end;
    align-items: center;
`;

export const TextWrapper = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const TopText = styled.div`
    display: flex;
    font-size: 10px;
    justify-content: end;
`;

export const BottomText = styled.div`
    display: flex;
    font-size: 18px;
    line-height: 18px;
    justify-content: end;
`;

export const CardBody = styled.div``;
export const CardText = styled.div`
    position: relative;
    z-index: 3;
    top: -10px;
    left: -5px;
`;

export const CardLine = styled.div`
    width: 100%;
    margin: 5px;
    display: flex;
    font-size: 12px;
`;

export const Label = styled.div`
    width: 120px;
    margin-left: 5px;
    margin-right: 5px;
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
    margin: 2px;
    padding: 3px;
    border-radius: 3px;
    border-style: dotted;
    border-color: ${gray[5]};
    border-width: 1px;
    font-size: 12px;
    line-height: 12px;
`;

export const GroupsBadges = styled.div`
    width: 100%;
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
`;

export const StyledHr = styled.div`
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
    border-style: dotted;
    border-width: 1px 0px 0px 0px;
    border-color: ${gray[4]};
`;

export const BackgroudNumber = styled.div`
    z-index: 2;
    position: absolute;
    top: 130px;
    left: 140px;
    height: 150px;
    width: 150px;
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
    font-size: 108px;
    line-height: 108px;
    letter-spacing: -10px;
    background: ${gray[3]};
`;
