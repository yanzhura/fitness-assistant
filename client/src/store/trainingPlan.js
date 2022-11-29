import { createSlice } from '@reduxjs/toolkit';
import workoutService from '../services/workoutService';

const initialState = {
    entities: null,
    exerciseGroups: null,
    isLoading: true,
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
            state.entities = action.payload.trainingplanData;
            state.exerciseGroups = action.payload.exerciseGroupsData;
            state.isLoading = false;
        },
        trainingPlanDataFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        trainingPlanErrorReset: (state) => {
            state.error = null;
        }
    }
});

const { actions, reducer: trainingPlanReducer } = trainingPlanSlice;
const { trainingPlanDataRequested, trainingPlanDataReceived, trainingPlanDataFailed, trainingPlanErrorReset } = actions;

export const loadTrainingPlan = () => async (dispatch) => {
    dispatch(trainingPlanDataRequested());
    try {
        const trainingplanData = await workoutService.fetchFullTrainingPlan();
        const exerciseGroupsData = await workoutService.fetchExerciseGroups();
        dispatch(trainingPlanDataReceived({ trainingplanData, exerciseGroupsData }));
    } catch (error) {
        console.error('store/trainingPlan > loadTraininglan() > error :', error);
        dispatch(trainingPlanDataFailed('Ошибка при запросе данных по тренировкам с сервера.'));
    }
};

export const resetTrainingPlanError = () => (dispatch) => {
    dispatch(trainingPlanErrorReset());
};

export const getTrainingPlanLoadingStatus = () => (state) => state.trainingPlan.isLoading;
export const getTrainingPlanErrors = () => (state) => state.trainingPlan.error;
export const getTrainingPlan = () => (state) => state.trainingPlan.entities;
export const getExerciseGroups = () => (state) => state.trainingPlan.exerciseGroups;

export default trainingPlanReducer;
