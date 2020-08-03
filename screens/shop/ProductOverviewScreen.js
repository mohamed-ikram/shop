import React from 'react';
import {FlatList, StyleSheet, SafeAreaView, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import Banner from '../../components/shop/Banner';
import * as CartActions from '../../store/actions/cart';
import CustomHeaderButtons from '../../components/UI/Header';

const ProductOverView = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        ListHeaderComponent={<Banner />}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            {...itemData.item}
            onViewDetail={() => {
              props.navigation.navigate('ProductDetail', {
                id: itemData.item.id,
                title: itemData.item.title,
              });
            }}
            onAddToCart={() => {
              dispatch(CartActions.addToCart(itemData.item));
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

ProductOverView.navigationOptions = (data) => {
  return {
    headerTitle: 'ALL PRODUCTS',
    headerLeft: (props) => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'menu-outline' : 'menu'}
          onPress={() => {
            data.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'cart-outline' : 'cart'}
          onPress={() => {
            data.navigation.navigate('CartScreen');
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({});

export default ProductOverView;
