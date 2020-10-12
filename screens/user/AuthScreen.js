import Axios from 'axios';
import React, {
  Component,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import AnimatedButton from '../../components/UI/AnimatedButton';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import {signUp} from '../../store/actions/auth';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const {width, height} = Dimensions.get('window');
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.defaults.baseURL = 'https://ikmo-reactnative.firebaseio.com/';
    Axios.defaults.headers.post['Content-Type'] = 'application/json';
  }, []);
  // const [loader, setLoader] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: '',
      password: '',
    },
    formIsValid: false,
  });
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  const formSubmitHandler = async () => {
    try {
      await dispatch(
        signUp(formState.inputValues.email, formState.inputValues.password),
      );
    } catch (err) {
      const error = err.toString().replace(/Error: /g, '');
      alert(error);
    }
  };

  console.log(formState.formIsValid);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <LinearGradient
        colors={['#ffedff', '#ffe3ff']}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Card styles={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Enter a valid email"
              onInputChange={inputChangeHandler}
              initialValue={''}
            />
            <Input
              id="password"
              label="Password"
              keyboardType="email-address"
              secureTextEntry
              minLength={5}
              required
              autoCapitalize="none"
              errorText="Enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue={''}
            />
            <View style={{flex: 1, alignItems: 'center'}}>
              <AnimatedButton
                initialValue={{width: width * 0.6, height: 50}}
                finalValue={{width: 50, height: 50}}
                title="Login"
                bgColor={Colors.primary}
                submit={() => formSubmitHandler()}
                validity={formState.formIsValid}
              />
              <AnimatedButton
                initialValue={{width: width * 0.6, height: 50}}
                finalValue={{width: 50, height: 50}}
                title="Switch to sign up"
                bgColor={Colors.accent}
                submit={() => alert('sss')}
                validity={true}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  screen: {flex: 1},
  authContainer: {width: '80%', maxWidth: 400, maxHeight: 400, padding: 20},
});

export default AuthScreen;
