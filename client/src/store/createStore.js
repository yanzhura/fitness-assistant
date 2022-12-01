import { combineReducers, configureStore } from '@reduxjs/toolkit';
import trainingPlanReducer from './trainingPlan';
import userReducer from './user';
import workoutsReducer from './workouts';

const rootReducer = combineReducers({
    user: userReducer,
    workouts: workoutsReducer,
    trainingPlan: trainingPlanReducer
});

export default configureStore({ reducer: rootReducer });
