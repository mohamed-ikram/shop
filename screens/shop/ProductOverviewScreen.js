import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  Button,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import Banner from '../../components/shop/Banner';
import * as CartActions from '../../store/actions/cart';
import CustomHeaderButtons from '../../components/UI/Header';
import Colors from '../../constants/Colors';
import Axios from 'axios';
import {fetchProducts} from '../../store/actions/product';
import LottieView from 'lottie-react-native';

const ProductOverView = (props) => {
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products.availableProducts);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    Axios.defaults.baseURL = 'https://ikmo-reactnative.firebaseio.com/';
    Axios.defaults.headers.post['Content-Type'] = 'application/json';
  }, []);
  const loadProducts = async () => {
    setLoading(true);
    await dispatch(fetchProducts());
    setLoading(false);
  };
  useEffect(() => {
    loadProducts();
  }, [dispatch]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        ListHeaderComponent={
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <Banner />
          </View>
        }
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={Colors.accent} />
            <LottieView source={require('../../assets/images/9704-ecommerce.json')} autoPlay loop />
          </View>
        )}
        contentContainerStyle={{flexGrow: 1}}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            {...itemData.item}
            onSelect={() => {
              props.navigation.navigate('ProductDetail', {
                id: itemData.item.id,
                title: itemData.item.title,
              });
            }}>
            <Button
              title="View Detail"
              color={Colors.primary}
              onPress={() => {
                props.navigation.navigate('ProductDetail', {
                  id: itemData.item.id,
                  title: itemData.item.title,
                });
              }}
              testID={itemData.item.title}
              accessibilityLabel={itemData.item.title}
            />
            <Button
              title="Add To Cart"
              color={Colors.primary}
              onPress={() => {
                dispatch(CartActions.addToCart(itemData.item));
              }}
            />
          </ProductItem>
        )}
      />
    </SafeAreaView>
  );
};

ProductOverView.navigationOptions = (data) => {
  return {
    headerTitle: 'ALL PRODUCTS',
    headerRight: (props) => (
      <HeaderButtons
        accessibilityLabel="Cart"
        HeaderButtonComponent={CustomHeaderButtons}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'cart-outline' : 'cart'}
          onPress={() => {
            data.navigation.navigate('CartScreen');
          }}
          iconSize={24}
          testID="Cart"
          accessibilityLabel="Cart"
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({});

export default ProductOverView;
