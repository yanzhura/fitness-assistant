import { createSlice } from '@reduxjs/toolkit';
import workoutService from '../services/workoutService';

const initialState = {
    data: null,
    isLoading: false,
    error: null
};

const trainingPlanSlice = createSlice({
    name: 'trainingPlan',
    initialState,
    reducers: {
        trainingPlanDataRequested: (state) => {
            state.isLoading = true;
        },
        trainingPlanDataReceived: (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        },
        trainingPlanDataFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer: trainingPlanReducer } = trainingPlanSlice;
const { trainingPlanDataRequested, trainingPlanDataReceived, trainingPlanDataFailed } = actions;

export const loadTrainingPlan = () => async (dispatch) => {
    dispatch(trainingPlanDataRequested());
    try {
        const trainingplanData = await workoutService.fetchFullTrainingPlan();
        dispatch(trainingPlanDataReceived(trainingplanData));
    } catch (error) {
        const errorMessage = error.response.data.error.message;
        console.error('store/trainingPlan > loadTraininglan() > error :', errorMessage);
        dispatch(trainingPlanDataFailed('Ошибка при запросе данных по тренировкам с сервера.'));
    }
};

export const getTrainingPlanLoadingStatus = () => (state) => state.trainingPlan.isLoading;
export const getTrainingPlanErrors = () => (state) => state.trainingPlan.error;
export const getTrainingPlan = () => (state) => state.trainingPlan.data;

export default trainingPlanReducer;
