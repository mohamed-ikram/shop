import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ProductOverView from '../screens/shop/ProductOverviewScreen';
import {Platform} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import ProductDetail from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrdersScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Super from '../screens/user/EditProductScreen';
import Check from '../screens/user/check';

const option = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {fontFamily: Fonts.bold},
  headerBackTitleStyle: {fontFamily: Fonts.regular},
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};
const ProductNavigator = createStackNavigator(
  {
    ProductOverView: {
      screen: ProductOverView,
      path: '/home',
    },
    ProductDetail: {
      screen: ProductDetail,
      path: 'details/:id/:title',
    },
    CartScreen: {
      screen: CartScreen,
    },
  },
  {
    defaultNavigationOptions: option,
  },
);

const OrderNavigator = createStackNavigator(
  {
    Order: OrderScreen,
    Check: {
      screen: Check,
      path: 'check',
    },
  },
  {
    defaultNavigationOptions: option,
  },
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductNavigator,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Ionicons name="logo-tux" size={24} style={{color: tintColor}} />
        ),
      },
      path: 'home',
    },
    Orders: {
      screen: OrderNavigator,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Ionicons name="list-outline" size={24} style={{color: tintColor}} />
        ),
      },
      path: 'order',
    },
  },
  {contentOptions: {activeTintColor: Colors.primary}},
);

const createRootNavigator = createSwitchNavigator({
  splashPage: {
    screen: Super,
    path: 'super',
  },
  HomePage: {
    screen: ShopNavigator,
    path: 'initial',
  },
});

const AppContainer = createAppContainer(createRootNavigator);

export default () => {
  const prefix = 'https://www.shop.com/';
  return <AppContainer uriPrefix={prefix} />;
};
