import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
const ProductItem = (props) => {
  let TouchableComp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.product}>
      <TouchableComp onPress={props.onViewDetail} useForeground>
        <View>
          <Image style={styles.image} source={{uri: props.imageUrl}} />
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>
            <Button
              title="View Detail"
              color={Colors.primary}
              onPress={props.onViewDetail}
            />
            <Button
              title="Add To Cart"
              color={Colors.primary}
              onPress={props.onAddToCart}
            />
          </View>
        </View>
      </TouchableComp>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: 'white',
    height: Dimensions.get('window').height * 0.5,
    margin: 20,
    overflow: 'hidden',
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  image: {
    height: '60%',
    width: '100%',
  },
  title: {fontSize: 18, marginVertical: 2, fontFamily: Fonts.bold},
  price: {fontSize: 14, color: '#888', fontFamily: Fonts.regular},
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    padding: 16,
  },
});

export default ProductItem;
