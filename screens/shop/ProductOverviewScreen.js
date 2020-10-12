import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  Button,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
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
  const [refreshing, setRefreshing] = useState(false);
  const [orientation, setOrientation] = useState('');
  const products = useSelector((state) => state.products.availableProducts);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      let error = err.toString().replace(/Error: /g, '');
      alert(error);
    }
  }, [dispatch, refreshing]);

  const getOrientation = () => {
    if (rootView) {
      if (Dimensions.get('window').width < Dimensions.get('window').height) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }
    }
  };
  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts,
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    getOrientation();
    Dimensions.addEventListener('change', () => {
      getOrientation();
    });
    loadProducts();
  }, [dispatch]);
  const onRefresh = () => {
    setRefreshing(true);
    loadProducts();
    setRefreshing(false);
  };
  return (
    <SafeAreaView style={{flex: 1}} ref={(value) => (rootView = value)}>
      <FlatList
        ListHeaderComponent={
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <Text>{orientation}</Text>
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
            <LottieView
              source={require('../../assets/images/9704-ecommerce.json')}
              autoPlay
              loop
            />
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
                props.navigation.navigate('TextEditor', {
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={['#007bff', '#FF0101', '#00b300']}
            onRefresh={onRefresh}
          />
        }
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
