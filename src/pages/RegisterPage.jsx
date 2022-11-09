import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form name="registerForm" onFinish={onFinish} onFinishFailed={onFinishFailed} wrapperCol={{ span: 10 }}>
            <Form.Item
                name="email"
                label="E-mail"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Для регистрации указажите ваш E-mail '
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
                    },
                    {
                        min: 8,
                        message: 'Минимальная длина пароля 8 символов'
                    }
                ]}>
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Пароль"
                />
            </Form.Item>

            <Form.Item
                name="passwordConfirm"
                label="Потдвердите пароль"
                hasFeedback
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: 'Пароль не может быть пустым'
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Пароли не совпадают'));
                        }
                    })
                ]}>
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Пароль"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Регистрация
                </Button>{' '}
                ... или{' '}
                <Link to="/login/signin">
                    <span>войдите, если у вас уже есть учётная запись.</span>
                </Link>
            </Form.Item>
        </Form>
    );
};

export default RegisterPage;
