import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import {removeFromCart} from '../../store/actions/cart';
import {addOrder} from '../../store/actions/order';
import Card from '../../components/UI/Card';

const CartScreen = (props) => {
  const [loading, setLoading] = useState(false);
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
  const sendOrderHandler = async () => {
    try {
      setLoading(true);
      await dispatch(addOrder(cartItems, cart.totalAmount));
      setLoading(false);
      props.navigation.navigate('Order');
    } catch (err) {
      const error = err.toString().replace(/Error: /g, '');
      alert(error);
    }
  };
  return (
    <View style={styles.screen}>
      <Card styles={styles.container}>
        <Text style={styles.text}>
          Total:
          <Text style={styles.amount}>
            $ {Math.round(cart.totalAmount.toFixed(2))}
          </Text>
        </Text>
        {loading ? (
          <ActivityIndicator color={Colors.accent} size="small" />
        ) : (
          <Button
            title="Order Now"
            onPress={() => sendOrderHandler()}
            color={Colors.accent}
            disabled={cartItems.length === 0}
          />
        )}
      </Card>
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
  },
  text: {fontFamily: Fonts.bold, fontSize: 18},
  amount: {color: Colors.primary},
});

export default CartScreen;
