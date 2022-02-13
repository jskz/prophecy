import { LOGIN_SUCCESS } from "./types";

export const login = (username, password) => dispatch => {
    dispatch({ type: LOGIN_SUCCESS });
};

export const loginWithRememberedToken = (token) => dispatch => {
    dispatch({ type: LOGIN_SUCCESS });
};