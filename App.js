import React, {useEffect} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import productReducer from './store/reducers/product';
import {Provider} from 'react-redux';
import AppContainer from './navigation/ShopNavigation';
import CartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import * as ART from '@react-native-community/art';
import ReduxThunk from 'redux-thunk';
import AuthReducer from './store/reducers/auth';
// import firebase  from '@react-native-firebase/app';
enableScreens();

const App = () => {
  const rootReducer = combineReducers({
    products: productReducer,
    cart: CartReducer,
    order: orderReducer,
    auth: AuthReducer,
  });
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
