import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import {fetchOrder} from '../../store/actions/order';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/Colors';

const OrderScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const order = useSelector((state) => state.order.orders);
  order.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  const dispatch = useDispatch();
  const loadOrders = async () => {
    try {
      setLoading(true);
      await dispatch(fetchOrder());
      setLoading(false);
    } catch (err) {
      const error = err.toString().replace(/Error: /g, '');
      alert(error);
    }
  };
  useEffect(() => {
    loadOrders();
  }, []);
  return (
    <FlatList
      data={order}
      contentContainerStyle={{flexGrow: 1}}
      renderItem={(itemData) => <OrderItem {...itemData.item} />}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <LottieView
            source={require('../../assets/images/9704-ecommerce.json')}
            autoPlay
            loop
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({});

OrderScreen.navigationOptions = (data) => {
  return {
    headerTitle: 'Your Orders',
  };
};

export default OrderScreen;
