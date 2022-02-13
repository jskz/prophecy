import { LOGIN_SUCCESS, LOGOUT } from "./types";

export const login = (username, password) => dispatch => {
    dispatch({ type: LOGIN_SUCCESS });
};

export const loginWithRememberedToken = (token) => dispatch => {
    dispatch({ type: LOGIN_SUCCESS });
};

export const logout = () => dispatch => {
    localStorage.removeItem('token');

    dispatch({ type: LOGOUT });
}