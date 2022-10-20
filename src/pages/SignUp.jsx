import React from 'react';

const SignUp = () => {
    return (
        <div className="container shadow mt-4 mb-4">
            <h2>Форма для регистрации</h2>
            <div>
                <label htmlFor="email" className="form-label">
                    Электронная почта
                </label>
                <input type="email" className="form-control" id="email" placeholder="E-mail" />
                <label htmlFor="password" className="form-label">
                    Пароль
                </label>
                <input type="password" className="form-control" id="password" placeholder="Пароль" />
                <label htmlFor="password-repeat" className="form-label">
                    Подтвердите пароль
                </label>
                <input type="password" className="form-control" id="password-repeat" placeholder="Пароль" />
                <button className="btn btn-secondary">Зарегистрироваться</button>
            </div>
        </div>
    );
};

export default SignUp;
