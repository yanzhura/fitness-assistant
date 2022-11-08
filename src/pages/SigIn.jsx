import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const signIn = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            wrapperCol={{ span: 10 }}>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Введите ваш e-mail'
                    }
                ]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Введите пароль'
                    }
                ]}>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Пароль" />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
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

            <p>
                <a className="login-form-forgot" href="">
                    Забыли пароль?
                </a>
            </p>
        </Form>
    );
};

export default signIn;
