import { createSlice } from '@reduxjs/toolkit';
import workoutService from '../services/workoutService';

const initialState = {
    entities: null,
    exercises: null,
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
            state.entities = action.payload.trainingPlanData;
            state.exercises = action.payload.exercisesData;
            state.exerciseGroups = action.payload.exerciseGroups;
            state.bodyParts = action.payload.bodyParts;
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
        const trainingPlanData = await workoutService.fetchTrainingPlan();
        const exercisesData = await workoutService.fetchExercises();
        const exerciseGroups = trainingPlanData.reduce((acc, item) => {
            for (const group of item.exerciseGroups) {
                if (!acc.includes(group)) {
                    acc.push(group);
                }
            }
            return acc;
        }, []);
        const bodyParts = exercisesData.reduce((acc, item) => {
            for (const part of item.bodyParts) {
                if (!acc.includes(part)) {
                    acc.push(part);
                }
            }
            return acc;
        }, []);
        dispatch(trainingPlanDataReceived({ trainingPlanData, exercisesData, exerciseGroups, bodyParts }));
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
export const getExercises = () => (state) => state.trainingPlan.exercises;
export const getExerciseGroups = () => (state) => state.trainingPlan.exerciseGroups;
export const getBodyParts = () => (state) => state.trainingPlan.bodyParts;
export const getWorkoutByNumber = (number) => (state) => {
    return state.trainingPlan.entities.find((w) => w.sequenceNumber === number);
};
export const getExercisesForWorkout = (number) => (state) => {
    const { exercises } = state.trainingPlan.entities.find((w) => w.sequenceNumber === number);
    return exercises.map((id) => state.trainingPlan.exercises.find((e) => e._id === id));
};

export default trainingPlanReducer;
