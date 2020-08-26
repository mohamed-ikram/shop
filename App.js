import React from 'react';
import {createStore, combineReducers} from 'redux';
import productReducer from './store/reducers/product';
import {Provider} from 'react-redux';
import AppContainer from './navigation/ShopNavigation';
import CartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
enableScreens();

const App = () => {
  const rootReducer = combineReducers({
    products: productReducer,
    cart: CartReducer,
    order: orderReducer,
  });
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
