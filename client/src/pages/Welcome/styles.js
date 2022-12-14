import styled from '@emotion/styled';
import { blue } from '@ant-design/colors';
import { Carousel } from 'antd';
import { gray } from '../../components/StyledComponents';
import appConfig from '../../App.config';

export const SlideWrapper = styled.div`
    flex-grow: 1;
    width: 100%;
    padding: 10px;
`;

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

export const PhotoBox = styled.div`
    height: 100%;
    display: flex;
    flex-grow: 1;
    background-image: url(${appConfig.staticUrl}/gymLight.jpg);
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 5px;
`;

export const CarouselBox = styled.div`
    height: 600px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-style: dotted;
    border-color: ${gray[5]};
    border-width: 1px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 60%);
`;

export const ComponentBox = styled.div`
    height: 100%;
`;

export const ButtonsBox = styled.div`
    display: flex;
    justify-content: end;
`;

export const SlideText = styled.div`
    font-size: 14px;
`;
