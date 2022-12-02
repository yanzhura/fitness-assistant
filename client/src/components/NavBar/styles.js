import styled from '@emotion/styled';

export const LogoWrapper = styled.div`
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
`;

export const Logo = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

export const MenuWrapper = styled.div`
    height: 100%;
    flex-grow: 1;
`;

export const Profile = styled.div`
    height: 100%;
    width: 200px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #ffffff;
`;

export const menuOverride = {
    height: '100%',
    background: 'rgba(100, 100, 100, 0%)',
    lineHeight: '110px'
};
