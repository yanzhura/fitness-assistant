import { combineReducers, configureStore } from '@reduxjs/toolkit';
import trainingPlanReducer from './trainingPlan';
import userReducer from './user';

const rootReducer = combineReducers({
    user: userReducer,
    trainingPlan: trainingPlanReducer
});

export default configureStore({ reducer: rootReducer });
