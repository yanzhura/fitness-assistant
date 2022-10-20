import React from 'react';

const Welcome = () => {
    return (
        <div className="container shadow mt-4 mb-4">
            <h2>Добро пожаловать на наш сайт!</h2>
            <p>
                Здесь будет вступительное слово и инструкции по дальнейшей тренировке. Страница будет выполнена в стиле
                landin page с длинным скроллом. Страница будет показана олдин раз, до нажатия кнопки ДАЛЕЕ. Потом
                иструкции и можно будет посмотреть разделе ПОМОЩЬ.
            </p>
            <button className="btn btn-outline-secondary">Далее</button>
        </div>
    );
};

export default Welcome;
