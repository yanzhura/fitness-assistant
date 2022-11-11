import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/user';

const LoginPage = () => {
    const dispatch = useDispatch();

    const onFinish = (values) => {
        dispatch(login(values));
    };
    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    return (
        <Row justify={'center'}>
            <Col span={8}>
                <Form
                    name="loginForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelCol={{
                        span: 8
                    }}
                    wrapperCol={{
                        span: 16
                    }}>
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

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Войти
                        </Button>{' '}
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}>
                        ... или{' '}
                        <Link to="/login/signUp">
                            <span>зарегистрируйтесь, если у вас нет учётной записи.</span>
                        </Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default LoginPage;
