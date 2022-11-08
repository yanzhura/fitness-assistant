import React from 'react';

const SignUp = () => {
    return (
        <div>
            <h2>Форма для регистрации</h2>
            <div>
                <label htmlFor="email">Электронная почта</label>
                <input type="email" id="email" placeholder="E-mail" />
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password" placeholder="Пароль" />
                <label htmlFor="password-repeat">Подтвердите пароль</label>
                <input type="password" id="password-repeat" placeholder="Пароль" />
                <button>Зарегистрироваться</button>
            </div>
        </div>
    );
};

export default SignUp;
