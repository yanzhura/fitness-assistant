import styled from '@emotion/styled';
import { blue } from '@ant-design/colors';
import { Carousel } from 'antd';
import { gray } from '../../components/StyledComponents';

export const CarouselWrapper = styled(Carousel)`
    > .slick-dots li button {
        height: 3px;
        width: 13px;
        background: ${blue[6]};
    }
    > .slick-dots li.slick-active button {
        height: 3px;
        width: 23px;
        background: ${blue[6]};
    }
`;

export const SlideWrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 10px;
    border-style: dotted;
    border-color: ${gray[5]};
    border-width: 1px;
    border-radius: 5px;
`;

export const CarouselBox = styled.div`
    height: 600px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const ComponentBox = styled.div`
    height: 100%;
`;

export const ButtonsBox = styled.div`
    display: flex;
    justify-content: end;
`;
