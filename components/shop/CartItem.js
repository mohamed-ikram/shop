import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '../../constants/Fonts';

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode={'middle'}>
          {props.title}
        </Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.title}>${props.sum.toFixed(2)}</Text>
        {props.onRemove && (
          <TouchableOpacity onPress={props.onRemove} style={styles.deleteBtn}>
            <Ionicons name="trash-outline" size={20} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {flexDirection: 'row', alignItems: 'center'},
  quantity: {fontFamily: Fonts.regular, color: '#888', fontSize: 16},
  title: {fontFamily: Fonts.bold, fontSize: 16},
  deleteBtn: {},
});
export default CartItem;
