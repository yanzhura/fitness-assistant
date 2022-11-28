import { createSlice } from '@reduxjs/toolkit';
import workoutService from '../services/workoutService';

const initialState = {
    entities: {},
    isLoading: true,
    error: null
};

const workoutsSlice = createSlice({
    name: 'workouts',
    initialState,
    reducers: {
        workoutDataRequested: (state) => {
            state.isLoading = true;
        },
        workoutDataReceived: (state, action) => {
            state.entities[action.payload.sequenceNumber] = action.payload;
            state.isLoading = false;
        },
        workoutDataRequestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        workoutErrorReset: (state) => {
            state.error = null;
        }
    }
});

const { actions, reducer: workoutsReducer } = workoutsSlice;
const { workoutDataRequested, workoutDataReceived, workoutDataRequestFailed, workoutErrorReset } = actions;

export const loadWorkout = (number) => async (dispatch, getState) => {
    const { workouts } = getState();
    if (!workouts.entities[number]) {
        dispatch(workoutDataRequested());
        try {
            const workoutData = await workoutService.fetchWorkoutBySeqNumber(number);
            dispatch(workoutDataReceived(workoutData));
        } catch (error) {
            console.error('store/workouts > loadWorkout() > error :', error);
            dispatch(workoutDataRequestFailed('Ошибка при запросе данных по тренировкам с сервера.'));
        }
    }
};

export const resetWorkoutError = () => (dispatch) => {
    dispatch(workoutErrorReset());
};

export const getWorkoutsLoadingStatus = () => (state) => state.workouts.isLoading;
export const getWorkoutsErrors = () => (state) => state.workouts.error;
export const getWorkoutByNumber = (number) => (state) => {
    if (number) {
        return state.workouts.entities[number];
    }
};

export default workoutsReducer;
