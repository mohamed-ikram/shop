import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import moment from 'moment';


const OrderItem = (props) => {
  console.log(moment(props.date).format('MMMM Do YYYY, hh:mm'));
  return (
    <View style={styles.orderItem}>
      {console.log(props)}
      <View style={styles.summary}>
        <Text style={styles.amount}>${props.totalAmount}</Text>
        <Text style={styles.date}>{props.readableDate}</Text>
      </View>
      <Button title="Show Details" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {fontFamily: Fonts.bold, fontSize: 16},
  date: {fontFamily: Fonts.regular, fontSize: 16, color: '#888'},
});

export default OrderItem;
