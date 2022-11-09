import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import httpAuthService from '../services/httpAuthService';

const LoginPage = () => {
    const onFinish = (values) => {
        httpAuthService.login(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form name="loginForm" onFinish={onFinish} onFinishFailed={onFinishFailed} wrapperCol={{ span: 10 }}>
            <Form.Item
                name="email"
                label="E-mail"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Для входа указажите ваш E-mail '
                    },
                    {
                        type: 'email',
                        message: 'Неверный формат адреса электроной почты '
                    }
                ]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
            </Form.Item>

            <Form.Item
                name="password"
                label="Пароль"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Пароль не может быть пустым'
                    }
                ]}>
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Пароль"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Войти
                </Button>{' '}
                ... или{' '}
                <Link to="/login/signup">
                    <span>зарегистрироваться.</span>
                </Link>
            </Form.Item>
        </Form>
    );
};

export default LoginPage;
