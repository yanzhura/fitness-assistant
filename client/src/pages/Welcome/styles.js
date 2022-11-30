import styled from '@emotion/styled';
import { blue } from '@ant-design/colors';
import { Carousel } from 'antd';

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

export const StyledCarouselBox = styled.div`
    height: 600px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const StyledComponentBox = styled.div`
    height: 100%;
`;

export const StyledButtonsBox = styled.div`
    display: flex;
    justify-content: end;
`;
