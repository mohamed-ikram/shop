import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {saveData} from '../../storage/AppStorage';
import {AUTHENICATE, LOGOUT, SIGNIN, SIGNUP} from '../actionTypes/auth';
const API_KEY = 'AIzaSyAzIUnTD1XJthQcy1q6NF8XTOXl3UNPZ-Y';
let timer;
export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogOutTimer(expiryTime));
    dispatch({type: AUTHENICATE, userId: userId, token: token});
  };
};

export const signUp = (email, password) => {
  const userDetails = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  return async (dispatch) => {
    try {
      const response = await Axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        JSON.stringify(userDetails),
      );
      dispatch(
        authenticate(
          response.data.localId,
          response.data.idToken,
          +response.data.expiresIn * 1000,
        ),
      );
      const expirationDate = new Date(
        new Date().getTime() + parseInt(response.data.expiresIn) * 1000,
      );
      saveData('token', response.data.idToken);
      saveData('userId', response.data.localId);
      saveData('expiryDate', expirationDate.toISOString());
    } catch (err) {
      let message = 'Something went wrong!';
      if (err.response.data.error.message === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }
  };
};

export const signIn = (email, password) => {
  const userDetails = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  return async (dispatch) => {
    try {
      const response = await Axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        JSON.stringify(userDetails),
      );
      console.log(response.data);
      dispatch(
        authenticate(
          response.data.localId,
          response.data.idToken,
          +response.data.expiresIn * 1000,
        ),
      );
      const expirationDate = new Date(
        new Date().getTime() + parseInt(response.data.expiresIn) * 1000,
      );
      saveData('token', response.data.idToken);
      saveData('userId', response.data.localId);
      saveData('expiryDate', expirationDate.toISOString());
    } catch (err) {
      let message = 'Something went wrong!';
      if (err.response.data.error.message === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (err.response.data.error.message === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }
  };
};

export const logOut = () => {
  return (dispatch) => {
    clearLogoutTimer();
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('userId');
    AsyncStorage.removeItem('expiryDate');
    dispatch({type: LOGOUT});
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogOutTimer = (expiryTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logOut());
    }, expiryTime);
  };
};
