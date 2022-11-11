import React from 'react';
import { Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import './App.css';
import ruRU from 'antd/es/locale/ru_RU';
import store from './store/createStore';
import customHistory from './utils/customHistory';
import Main from './layouts/Main/';

function App() {
    return (
        <ConfigProvider locale={ruRU}>
            <Provider store={store}>
                <Router history={customHistory}>
                    <Main />
                </Router>
            </Provider>
        </ConfigProvider>
    );
}

export default App;
