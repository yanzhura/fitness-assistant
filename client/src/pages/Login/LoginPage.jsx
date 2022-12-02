import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/user';
import { StyledButton, FormWrapper, formOverride, CenteredWrapper } from './styles';
import { StyledTitle } from '../../components/StyledComponents';

const LoginPage = () => {
    const dispatch = useDispatch();

    const onFinish = (values) => {
        dispatch(login(values));
    };

    return (
        <CenteredWrapper>
            <FormWrapper>
                <StyledTitle level="3">Вход</StyledTitle>
                <Form
                    style={formOverride}
                    requiredMark="optional"
                    labelAlign="left"
                    labelWrap={true}
                    colon={false}
                    layout="horizontal"
                    name="loginForm"
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
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}>
                        <StyledButton type="primary" htmlType="submit" className="login-form-button">
                            Вход
                        </StyledButton>
                    </Form.Item>
                </Form>
                <Link to="/login/signUp">
                    <span>...зарегистрируйтесь, если у вас нет учётной записи.</span>
                </Link>
            </FormWrapper>
        </CenteredWrapper>
    );
};

export default LoginPage;
