import { Button, Divider, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
    return (
        <>
            <Title level={1}>GYM ASSISTANT</Title>
            <Title level={2}>Спортивный зал для начинающих</Title>
            <p>Начните тренироваться с нами!</p>
            <Space>
                <Link to="/login/signIn">
                    <Button>Вход</Button>
                </Link>
                <Divider type="vertical"></Divider>
                <Link to="/login/signUp">
                    <Button>Регистрация</Button>
                </Link>
            </Space>
        </>
    );
};

export default Start;
