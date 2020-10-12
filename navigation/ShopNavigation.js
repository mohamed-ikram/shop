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
import EditProductScreen from '../screens/user/EditProductScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import CustomHeaderButtons from '../components/UI/Header';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Bar from '../screens/learningComponent/bar';
import TextEditor from '../screens/learningComponent/TextEditor';
import CnEditor from '../screens/learningComponent/cnEditor';
import AuthScreen from '../screens/user/AuthScreen';

const option = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {fontFamily: Fonts.bold},
  headerBackTitleStyle: {fontFamily: Fonts.regular},
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const Hamburger = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
      <Item
        title="Menu"
        iconName={Platform.OS === 'android' ? 'menu-outline' : 'menu'}
        onPress={() => {
          props.toggleDrawer();
        }}
        iconSize={24}
        testID="Menu"
        accessibilityLabel="Menu"
      />
    </HeaderButtons>
  );
};

const ProductNavigator = createStackNavigator(
  {
    ProductOverView: {
      screen: ProductOverView,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => <Hamburger {...navigation} />,
      }),
      path: 'home',
    },
    ProductDetail: {
      screen: ProductDetail,
      path: 'details/:id/:title',
    },
    CartScreen: {
      screen: CartScreen,
    },
    TextEditor: CnEditor,
  },
  {
    defaultNavigationOptions: option,
  },
);

const OrderNavigator = createStackNavigator(
  {
    Order: {
      screen: OrderScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => <Hamburger {...navigation} />,
      }),
      path: 'order',
    },
  },
  {
    defaultNavigationOptions: option,
  },
);

const UserNavigator = createStackNavigator(
  {
    UserProducts: {
      screen: UserProductScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => <Hamburger {...navigation} />,
      }),
      path: 'order',
    },
    EditProduct: {
      screen: EditProductScreen,
      path: 'edit',
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
    User: {
      screen: UserNavigator,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Ionicons
            name="person-circle-outline"
            size={24}
            style={{color: tintColor}}
          />
        ),
      },
      path: 'order',
    },
  },
  {contentOptions: {activeTintColor: Colors.primary}},
);

const createRootNavigator = createSwitchNavigator({
  splashPage: {
    screen: EditProductScreen,
    path: 'super',
  },
  HomePage: {
    screen: ShopNavigator,
    path: 'initial',
  },
});

const AuthNavigator = createStackNavigator({
  AuthHome: {
    screen: AuthScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

const AppContainer = createAppContainer(MainNavigator);

export default () => {
  const prefix = 'https://www.shop.com/';
  return <AppContainer uriPrefix={prefix} />;
};
