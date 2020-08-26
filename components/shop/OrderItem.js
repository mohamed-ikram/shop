import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import moment from 'moment';
import CartItem from './CartItem';
import Card from '../UI/Card';

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const date = moment(props.date).format('MMM Do YYYY, hh:mm A');
  return (
    <Card styles={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${props.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Button
          title={!showDetails ? 'Show Details' : 'Hide Details'}
          color={Colors.primary}
          onPress={() => {
            setShowDetails((prevState) => !prevState);
          }}
        />
      </View>
      {showDetails && (
        <View>
          {props.items.map((item) => (
            <CartItem {...item} key={item.productId} />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4,
  },
  amount: {fontFamily: Fonts.bold, fontSize: 16},
  date: {fontFamily: Fonts.regular, fontSize: 14, color: '#888'},
});

export default OrderItem;
