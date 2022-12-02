import styled from '@emotion/styled';
import backgroundImage from '../../assets/background4.jpg';

const PhotoWrapper = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
    height: 100%;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`;

export default PhotoWrapper;
