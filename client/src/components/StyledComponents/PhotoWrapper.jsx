import styled from '@emotion/styled';
import appConfig from '../../App.config';

const PhotoWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-grow: 1;
    background-image: url(${appConfig.staticUrl}/startPage/background.jpg);
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
`;

export default PhotoWrapper;
