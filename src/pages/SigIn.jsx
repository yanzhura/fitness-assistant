import React from 'react';

const SigIn = () => {
    return (
        <div className="container shadow mt-4 mb-4">
            <h2>Форма для входа</h2>
            <div>
                <label htmlFor="email" className="form-label">
                    Электронная почта
                </label>
                <input type="email" className="form-control" id="email" placeholder="E-mail" />
                <label htmlFor="password" className="form-label">
                    Пароль
                </label>
                <input type="password" className="form-control" id="password" placeholder="Пароль" />
                <button className="btn btn-secondary">Войти</button>
            </div>
        </div>
    );
};

export default SigIn;
