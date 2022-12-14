import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/user';
import { StyledButton, FormWrapper, formOverride, CenteredWrapper } from './styles';
import { StyledTitle } from '../../components/StyledComponents';

const RegisterPage = () => {
    const dispatch = useDispatch();

    const onFinish = (values) => {
        dispatch(createUser(values));
    };

    return (
        <CenteredWrapper>
            <FormWrapper>
                <StyledTitle level="3">Регистрация</StyledTitle>
                <Form
                    style={formOverride}
                    requiredMark="optional"
                    labelAlign="left"
                    labelWrap={true}
                    colon={false}
                    layout="horizontal"
                    name="registerForm"
                    onFinish={onFinish}
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
                                message: 'Для регистрации необходим Ваш E-mail '
                            },
                            {
                                type: 'email',
                                message: 'Неверный формат адреса электронной почты '
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

                    <Form.Item
                        name="name"
                        label="Имя"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Имя не можут быть пустым'
                            },
                            {
                                min: 2,
                                message: 'Имя не может быть короче 2-х символов'
                            }
                        ]}>
                        <Input placeholder="Ваше имя или никнейм" />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}>
                        <StyledButton type="primary" htmlType="submit" className="login-form-button">
                            Регистрация
                        </StyledButton>
                    </Form.Item>
                </Form>
                <Link to="/login/signIn">
                    <span>...войдите, если у вас уже есть учётная запись.</span>
                </Link>
            </FormWrapper>
        </CenteredWrapper>
    );
};

export default RegisterPage;
