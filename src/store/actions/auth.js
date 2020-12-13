import { AUTH_LOGOUT, AUTH_SUCCESS } from "./actionTypes";
import axios from 'axios';

export const authSuccess = (token) => ({
  type: AUTH_SUCCESS,
  token
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: AUTH_LOGOUT
  }
}

export const autoLogout = (time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  }
};

export const auth = (email, password, isLogin) => {
  return async dispatch => {
    const authData = {
      email, password,
      returnSecureToken: true,
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBry7YxHoSdToJDB1OztRdXgYCViBa2YE';

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBry7YxHoSdToJDB1OztRdXgYCViBa2YE'
    }

    const response = await axios.post(url, authData);
    const data = response.data;

    const expirationData = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationData);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn))
  }
};

export const autoLogin = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime) / 1000 ))
      }
    }
  }
}
