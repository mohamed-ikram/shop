import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Button,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import AnimatedButton from '../../components/UI/AnimatedButton';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import {signIn, signUp} from '../../store/actions/auth';
import LottieView from 'lottie-react-native';
// import crashlytics from '@react-native-firebase/crashlytics';

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

const AuthScreen = (props) => {
  const [loader, setLoader] = useState(false);
  const [isSingnUp, setIsSignup] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [
        {text: 'Okay', onPress: () => setError(null)},
      ]);
    }
  }, [error]);

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
    if (formState.formIsValid) {
      try {
        setLoader(true);
        await dispatch(
          isSingnUp
            ? signUp(
                formState.inputValues.email,
                formState.inputValues.password,
              )
            : signIn(
                formState.inputValues.email,
                formState.inputValues.password,
              ),
        );
        setLoader(false);
        props.navigation.navigate('Shop');
      } catch (err) {
        console.log(err);
        const error = err.toString().replace(/Error: /g, '');
        setLoader(false);
        setError(error);
      }
    } else {
      alert('Enter e-mail and password correctly');
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
      style={styles.screen}>
      <LinearGradient
        colors={['#99e5e9', '#2b4d7b']}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Card styles={styles.authContainer}>
          {loader ? (
            <LottieView
              source={require('../../assets/images/9704-ecommerce.json')}
              autoPlay
              loop
              resizeMode="cover"
              style={{flex: 0, height: 300}}
            />
          ) : (
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
                  title={isSingnUp ? 'Sign Up' : 'Login'}
                  bgColor={Colors.primary}
                  submit={() => formSubmitHandler()}
                  loading={formState.formIsValid && !error}
                />
                <AnimatedButton
                  initialValue={{width: width * 0.6, height: 50}}
                  finalValue={{width: 50, height: 50}}
                  title={`Switch to ${isSingnUp ? 'login' : 'sign up'}`}
                  bgColor={Colors.accent}
                  submit={() => {
                    setIsSignup((prevState) => !prevState);
                  }}
                />
              </View>
            </ScrollView>
          )}
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  screen: {flex: 1},
  authContainer: {
    height: 'auto',
    flex: 0,
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
});

export default AuthScreen;
