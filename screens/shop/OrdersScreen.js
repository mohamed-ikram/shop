import React from 'react';
import {View, Text, StyleSheet, FlatList, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButtons from '../../components/UI/Header';
import OrderItem from '../../components/shop/OrderItem';

const OrderScreen = (props) => {
  const order = useSelector((state) => state.order.orders);
  return (
    <FlatList
      data={order}
      keyExtractor={(item) => item.toString()}
      renderItem={(itemData) => <OrderItem {...itemData.item} />}
    />
  );
};

const styles = StyleSheet.create({});

OrderScreen.navigationOptions = (data) => {
  return {
    headerTitle: 'Your Orders',
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
  };
};

export default OrderScreen;
