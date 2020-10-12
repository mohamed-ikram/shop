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
import Card from '../UI/Card';
const ProductItem = (props) => {
  let TouchableComp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }
  return (
    <Card styles={styles.product}>
      <TouchableComp onPress={props.onSelect} useForeground>
        <View>
          <Image
            style={styles.image}
            source={{uri: props.imageUrl}}
            resizeMode="contain"
          />
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
      </TouchableComp>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
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
  title: {fontSize: 18, marginVertical: 2, fontFamily: Fonts.bold,textAlign:"center"},
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
