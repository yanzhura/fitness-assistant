/* eslint-disable indent */
import { createAction, createSlice } from '@reduxjs/toolkit';
import userService from '../services/userService';
import authService from '../services/authService';
import localstorageService from '../services/localstorageService';
import customHistory from '../utils/customHistory';

const getInitialState = () => {
    const userId = localstorageService.getUserId();
    if (userId) {
        return {
            userId,
            userData: null,
            isLoggedIn: true,
            isLoading: true,
            error: null
        };
    } else {
        return {
            userId: null,
            userData: null,
            isLoggedIn: false,
            isLoading: true,
            error: null
        };
    }
};

const initialUserData = {
    currentWorkout: 1,
    completedWorkouts: 0,
    trainingStartedAt: false,
    trainingFinishedAt: false,
    schedule: {
        workout1: {
            date: 0,
            sequenceNumber: 1
        }
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        authSucceeded: (state, action) => {
            state.isLoggedIn = true;
            state.isLoading = true;
            state.userId = action.payload.localId;
        },
        authFailed: (state, action) => {
            state.error = action.payload;
        },
        userDataRequested: (state) => {
            state.isLoading = true;
        },
        userDataReceived: (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
        },
        userDataRequestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        userLoggedOut: (state) => {
            state.userId = null;
            state.userData = null;
            state.isLoggedIn = false;
            state.isLoading = false;
            state.error = null;
        },
        userCreateRequested: (state) => {
            state.isLoading = true;
        },
        userCreateSucceeded: (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.userId = action.payload.userId;
            state.userData = action.payload.userData;
        },
        userCreateFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        userUpdateRequested: (state) => {
            state.isLoading = true;
        },
        userUpdateSucceeded: (state) => {
            state.isLoading = false;
        },
        userUpdateFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        userScheduleUpdated: (state, action) => {
            const sequenceNumber = action.payload.workoutSequenceNumber;
            const date = action.payload.plannedDate;
            const result = action.payload.workoutResult;
            const oldSchedule = { ...state.userData.schedule };
            state.userData.schedule = {
                ...oldSchedule,
                [`workout${sequenceNumber}`]: {
                    date,
                    sequenceNumber,
                    result
                }
            };
        },
        currentWorkoutIncreased: (state) => {
            state.userData.currentWorkout = parseInt(state.userData.currentWorkout) + 1;
        },
        completedWorkoutIncreased: (state) => {
            state.userData.completedWorkouts = parseInt(state.userData.completedWorkouts) + 1;
        },
        userErrorReset: (state) => {
            state.error = null;
        },
        trainingStarted: (state, action) => {
            state.userData.trainingStartedAt = action.payload;
        },
        trainingFinished: (state, action) => {
            state.userData.trainingFinishedAt = action.payload;
        }
    }
});

const authRequested = createAction('user/authRequested');

const { actions, reducer: userReducer } = userSlice;
const {
    authSucceeded,
    authFailed,
    userDataRequested,
    userDataReceived,
    userDataRequestFailed,
    userLoggedOut,
    userCreateRequested,
    userCreateSucceeded,
    userCreateFailed,
    userUpdateRequested,
    userUpdateSucceeded,
    userUpdateFailed,
    userScheduleUpdated,
    currentWorkoutIncreased,
    completedWorkoutIncreased,
    userErrorReset,
    trainingStarted,
    trainingFinished
} = actions;

export const login = (userData) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const authData = await authService.signIn(userData);
        localstorageService.setTokens(authData);
        dispatch(authSucceeded(authData));
        customHistory.replace('/dashboard');
    } catch (error) {
        const errorMessage = error.response.data.error.message;
        let errorWindowMessage = 'Ошибка аутентификации';
        if (errorMessage === 'INVALID_PASSWORD' || errorMessage === 'EMAIL_NOT_FOUND') {
            errorWindowMessage = 'Неверный логин или пароль';
        }
        dispatch(authFailed(errorWindowMessage));
        console.error('store/users > login() > error :', errorMessage);
    }
};

export const logout = () => (dispatch) => {
    localstorageService.removeTokens();
    dispatch(userLoggedOut());
    customHistory.push('/');
};

export const loadUserData = () => async (dispatch) => {
    dispatch(userDataRequested());
    try {
        const userData = await userService.getCurrentUser();
        dispatch(userDataReceived(userData));
    } catch (error) {
        console.log('store/users > loadUserData > error :', error.response);
        dispatch(userDataRequestFailed('Ошибка получения данных пользователя'));
    }
};

export const createUser =
    ({ email, password, passwordConfirm, ...rest }) =>
    async (dispatch) => {
        dispatch(userCreateRequested());
        try {
            const authData = await authService.signUp({ email, password });
            await userService.createNewUser(authData.localId, { ...initialUserData, ...rest });
            dispatch(
                userCreateSucceeded({
                    userId: authData.localId,
                    userData: { ...initialUserData, ...rest }
                })
            );
            localstorageService.setTokens(authData);
            customHistory.replace('/dashboard');
        } catch (error) {
            console.log('store/users > createUser() > error :', error.response);
            dispatch(userCreateFailed('Ошибка при создании пользователя на сервере'));
        }
    };

const updateUser = () => async (dispatch, getState) => {
    const { user } = getState();
    dispatch(userUpdateRequested());
    try {
        await userService.updateCurrentUser(user.userData);
        dispatch(userUpdateSucceeded());
    } catch (error) {
        console.log('error :>> ', error);
        dispatch(userUpdateFailed('Произошла ошибка при обновлении данных пользоавтеля на сервере'));
    }
};

export const updateUserSchedule = (workoutSequenceNumber, plannedDate, workoutResult) => async (dispatch) => {
    dispatch(userScheduleUpdated({ workoutSequenceNumber, plannedDate, workoutResult }));
    dispatch(updateUser());
};

export const completeCurrentWorkout =
    ({ workoutResult, completeDate }) =>
    async (dispatch, getState) => {
        const { user, trainingPlan } = getState();
        const userCurrentWorkout = user.userData.currentWorkout;
        const lastWorkout = trainingPlan.entities.length;
        if (userCurrentWorkout === 1) {
            dispatch(trainingStarted(completeDate));
            dispatch(updateUserSchedule(userCurrentWorkout, completeDate, workoutResult));
            dispatch(currentWorkoutIncreased());
            dispatch(completedWorkoutIncreased());
            dispatch(updateUser());
        } else if (userCurrentWorkout > 1 && userCurrentWorkout < lastWorkout) {
            dispatch(updateUserSchedule(userCurrentWorkout, completeDate, workoutResult));
            dispatch(currentWorkoutIncreased());
            dispatch(completedWorkoutIncreased());
            dispatch(updateUser());
        } else if (userCurrentWorkout === lastWorkout) {
            dispatch(trainingFinished(completeDate));
            dispatch(updateUserSchedule(userCurrentWorkout, completeDate, workoutResult));
            dispatch(completedWorkoutIncreased());
            dispatch(updateUser());
        }
    };

export const resetUserError = () => (dispatch) => {
    dispatch(userErrorReset());
};

export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getUserLoadingStatus = () => (state) => state.user.isLoading;
export const getUserErrors = () => (state) => state.user.error;
export const getCurrentUser = () => (state) => ({
    userId: state.user.userId,
    userData: state.user.userData
});
export const getUserCurrentWorkout = () => (state) => state.user.userData?.currentWorkout;
export const getUserCompletedWorkouts = () => (state) => state.user.userData?.completedWorkouts;
export const getUserSchedule = () => (state) => state.user.userData?.schedule;
export const getCurrentWorkoutSchedule = () => (state) => {
    const currentWorkoutKey = `workout${state.user.userData.currentWorkout}`;
    if (state.user.userData?.schedule) {
        return state.user.userData.schedule[currentWorkoutKey];
    }
};
export const getUserTrainingStatus = () => (state) => ({
    trainingStartedAt: state.user.userData?.trainingStartedAt,
    trainingFinishedAt: state.user.userData?.trainingFinishedAt
});

export default userReducer;