import React from 'react';
import {View, Text, StyleSheet, Button, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import {removeFromCart} from '../../store/actions/cart';
import {addOrder} from '../../store/actions/order';

const CartScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartItems = [];
  for (const key in cart.items) {
    cartItems.push({
      productId: key,
      title: cart.items[key].title,
      price: cart.items[key].price,
      quantity: cart.items[key].quantity,
      sum: cart.items[key].sum,
    });
  }
  cartItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Total:
          <Text style={styles.amount}>$ {cart.totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          onPress={() => {
            dispatch(addOrder(cartItems, cart.totalAmount));
          }}
          color={Colors.accent}
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            onRemove={() => dispatch(removeFromCart(itemData.item.productId))}
            {...itemData.item}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, margin: 20},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  text: {fontFamily: Fonts.bold, fontSize: 18},
  amount: {color: Colors.primary},
});

export default CartScreen;
