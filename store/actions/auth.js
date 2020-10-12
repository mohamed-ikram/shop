import Axios from 'axios';
import {SIGNUP} from '../actionTypes/auth';

export const signUp = (email, password) => {
  const userDetails = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  return async (dispatch) => {
    const response = await Axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzIUnTD1XJthQcy1q6NF8XTOXl3UNPZ-Y',
      JSON.stringify(userDetails),
    );
    dispatch({type: SIGNUP});
  };
};
