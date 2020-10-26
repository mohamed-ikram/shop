import React, {useEffect, useRef} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import ProductOverView from '../screens/shop/ProductOverviewScreen';
import {Button, Platform, SafeAreaView, View} from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions,
} from 'react-navigation';
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
import Splash from '../screens/SplashScreen';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../store/actions/auth';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

const option = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {fontFamily: Fonts.bold},
  headerBackTitleStyle: {fontFamily: Fonts.regular},
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerBackground: () => (
    <LinearGradient
      colors={['#99e5e9', '#2b4d7b']}
      style={{flex: 1}}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
    />
  ),
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
        iconSize={30}
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
  {
    contentOptions: {activeTintColor: Colors.primary},
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{flex: 1}}>
          <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(logOut());
                // props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  },
);

// const createRootNavigator = createSwitchNavigator({
//   splashPage: {
//     screen: EditProductScreen,
//     path: 'super',
//   },
//   HomePage: {
//     screen: ShopNavigator,
//     path: 'initial',
//   },
// });

const AuthNavigator = createStackNavigator({
  AuthHome: {
    screen: AuthScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const MainNavigator = createSwitchNavigator({
  Splash: Splash,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

const AppContainer = createAppContainer(MainNavigator);

export default (props) => {
  const navRef = useRef();
  const authToken = useSelector((state) => !!state.auth.token);
  const token = async () => {
    const data = await AsyncStorage.getItem('token');
    return data;
  };
  useEffect(() => {
    // if (!authToken) {
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err));
    //   navRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth'}));
    // }
    token()
      .then((res) => {
        console.log(res);
        if (!res) {
          navRef.current.dispatch(
            NavigationActions.navigate({routeName: 'Auth'}),
          );
        }
      })
      .catch((err) => console.log(err));
  }, [token]);
  const prefix = 'https://www.shop.com/';
  return <AppContainer uriPrefix={prefix} ref={navRef} />;
};
