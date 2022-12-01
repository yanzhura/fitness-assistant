import { Button, Result } from 'antd';
import React from 'react';
import customHistory from '../utils/customHistory';

const NotFound = () => {
    const handleClick = () => {
        customHistory.push('/');
    };

    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Страница на которую вы перешли не существует."
                extra={
                    <Button type="primary" onClick={handleClick}>
                        Домой
                    </Button>
                }
            />
        </div>
    );
};

export default NotFound;
