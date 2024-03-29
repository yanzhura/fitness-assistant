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
            error: null,
            quickTourPage: 0
        };
    } else {
        return {
            userId: null,
            userData: null,
            isLoggedIn: false,
            isLoading: true,
            error: null,
            quickTourPage: 0
        };
    }
};

const initialUserData = {
    currentWorkout: 1,
    completedWorkouts: 0,
    showWelcomePage: true,
    showQuickTour: true
};

const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        authSucceeded: (state, action) => {
            state.isLoggedIn = true;
            state.isLoading = true;
            state.userId = action.payload.userId;
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
            state.quickTourPage = 0;
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
            if (!state.userData.schedule[sequenceNumber - 1]) {
                state.userData.schedule.push({
                    workout: sequenceNumber,
                    date: 0,
                    results: []
                });
            }
            state.userData.schedule[sequenceNumber - 1].date = date;
            if (result) {
                for (const key in result) {
                    state.userData.schedule[sequenceNumber - 1].results.push({
                        exercise: key,
                        count: result[key]
                    });
                }
            }
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
        },
        welcomePageHidden: (state) => {
            state.userData.showWelcomePage = false;
        },
        quickTourHidden: (state) => {
            state.userData.showQuickTour = false;
        },
        quickTourPageChanged: (state) => {
            state.quickTourPage = state.quickTourPage + 1;
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
    trainingFinished,
    welcomePageHidden,
    quickTourHidden,
    quickTourPageChanged
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
            const authData = await authService.signUp({ email, password, ...rest, ...initialUserData });
            dispatch(
                userCreateSucceeded({
                    userId: authData.userId,
                    userData: { ...initialUserData, email, ...rest }
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

export const hideWelcomePage = () => (dispatch) => {
    dispatch(welcomePageHidden());
    dispatch(updateUser());
};

export const hideQuickTour = () => (dispatch) => {
    dispatch(quickTourHidden());
    dispatch(updateUser());
};

export const nextQuickTourPage = () => (dispatch) => {
    dispatch(quickTourPageChanged());
};

// Selectors

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
    const currentWorkout = state.user.userData.currentWorkout;
    if (state.user.userData?.schedule && state.user.userData.schedule.length > 0) {
        return state.user.userData.schedule[currentWorkout - 1];
    }
};
export const getScheduleByWorkout = (number) => (state) => {
    if (state.user.userData?.schedule && state.user.userData.schedule.length > 0) {
        return state.user.userData.schedule.find((el) => el.workout === number);
    }
};
export const getUserTrainingStatus = () => (state) => ({
    trainingStartedAt: state.user.userData?.trainingStartedAt,
    trainingFinishedAt: state.user.userData?.trainingFinishedAt
});
export const getShowWelcomePage = () => (state) => state.user.userData?.showWelcomePage;
export const getShowQuickTour = () => (state) => state.user.userData?.showQuickTour;
export const getQuickTourPage = () => (state) => state.user.quickTourPage;

export default userReducer;
