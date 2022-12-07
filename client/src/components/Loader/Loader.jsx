import { Spin } from 'antd';
import React from 'react';
import { SpinWrapper } from './styles';

const Loader = () => {
    return (
        <SpinWrapper>
            <Spin />
        </SpinWrapper>
    );
};

export default Loader;
