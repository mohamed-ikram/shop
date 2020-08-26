import React from 'react';
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

const ProductOverView = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Button title="ok" accessibilityLabel="ok" />
      <FlatList
        ListHeaderComponent={<Banner />}
        ListEmptyComponent={() => (
          <View>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text>Empty</Text>
          </View>
        )}
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
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
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
