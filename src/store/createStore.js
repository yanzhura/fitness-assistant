import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    user: 'awsdasd'
});

export const createStore = () => {
    configureStore({
        reducer: rootReducer
    });
};
