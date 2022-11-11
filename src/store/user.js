/* eslint-disable indent */
import { createAction, createSlice } from '@reduxjs/toolkit';
import firebaseUserService from '../services/firebaseUserService';
import httpAuthService from '../services/httpAuthService';
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
        }
    }
});

const authRequested = createAction('user/authRequested');

const { actions, reducer: userReducer } = userSlice;
const { authSucceeded, authFailed, userDataRequested, userDataReceived, userDataRequestFailed, userLoggedOut } =
    actions;

export const login = (userData) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const authData = await httpAuthService.signIn(userData);
        localstorageService.setTokens(authData);
        dispatch(authSucceeded(authData));
        customHistory.replace('/');
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

export const getUserData = () => async (dispatch) => {
    dispatch(userDataRequested());
    try {
        const userData = await firebaseUserService.getCurrentUser();
        dispatch(userDataReceived(userData));
    } catch (error) {
        console.log('store/users > getUserData > error :', error.response);
        dispatch(userDataRequestFailed('Ошибка получения данных пользователя'));
    }
};

export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getUserLoadingStatus = () => (state) => state.user.isLoading;
export const getUserErrors = () => (state) => state.user.error;
export const getCurrentUser = () => (state) => ({
    userId: state.user.userId,
    userData: state.user.userData
});

export default userReducer;
