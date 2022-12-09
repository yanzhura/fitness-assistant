import { Button, Result } from 'antd';
import React from 'react';
import { LayoutColumn, LayoutWrapper } from '../components/StyledComponents';
import customHistory from '../utils/customHistory';

const NotFound = () => {
    const handleClick = () => {
        customHistory.push('/');
    };

    return (
        <LayoutWrapper>
            <LayoutColumn>
                <Result
                    status="404"
                    title="404"
                    subTitle="Страница на которую вы перешли не существует."
                    extra={
                        <Button type="primary" onClick={handleClick}>
                            Вернуться на главную
                        </Button>
                    }
                />
            </LayoutColumn>
        </LayoutWrapper>
    );
};

export default NotFound;
