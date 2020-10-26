import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {authenticate} from '../store/actions/auth';

const Splash = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.defaults.baseURL = 'https://ikmo-reactnative.firebaseio.com/';
    Axios.defaults.headers.post['Content-Type'] = 'application/json';
  }, []);
  useEffect(() => {
    const loginCheck = async () => {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      const expiryDate = await AsyncStorage.getItem('expiryDate');
      const navigateToAuth = () => {
        props.navigation.navigate('Auth');
        SplashScreen.hide();
      };
      if (!userId && !token && !expiryDate) {
        navigateToAuth();
        return;
      }
      const expirationToken = new Date(expiryDate);
      if (expirationToken <= new Date() || !token || !userId) {
        navigateToAuth();
        return;
      }
      const expiryTime = expirationToken.getTime() - new Date().getTime();
      props.navigation.navigate('Shop');
      dispatch(authenticate(userId, token, expiryTime));
    };
    loginCheck();
    SplashScreen.hide();
  }, [dispatch]);
  return null;
};

export default Splash;
