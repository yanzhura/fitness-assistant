import React from 'react';
import HelpDrawer from '../components/HelpDrawer/HelpDrawer';
import { AboutHelp } from '../pages/QuickTour';

const Help = () => {
    return (
        <>
            <div>
                <h2>Страница с помощью</h2>
                <p>
                    Сюда переедет вступительное слово и помощь по навигации, после того, как их прощёлкает вновь
                    зарегистрировавшийся пользователь
                </p>
                <p>
                    Здесь так же будет информация с карточками по каждому упражнению: фото, схемы, аннотация как делать.
                </p>
            </div>
            <HelpDrawer>
                <AboutHelp />
            </HelpDrawer>
        </>
    );
};

export default Help;
