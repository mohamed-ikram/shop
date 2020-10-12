import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '../../constants/Fonts';

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <View style={{width:'80%'}}>
        <Text style={styles.title} >
          {props.title}
        </Text>
        </View>        
      </View>
      <View style={{...styles.itemData}}>
        <Text style={styles.title}>${props.sum.toFixed(2)}</Text>
        {props.onRemove && (
          <TouchableOpacity onPress={props.onRemove} style={{paddingLeft:4}}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  itemData: {flexDirection: 'row', alignItems: 'center'},
  quantity: {fontFamily: Fonts.regular, color: '#888', fontSize: 16},
  title: {fontFamily: Fonts.bold, fontSize: 16},
  deleteBtn: {},
});
export default CartItem;
