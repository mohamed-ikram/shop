import React from 'react';
import {
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  Button,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import * as CartAction from '../../store/actions/cart';

const ProductDetail = (props) => {
  const productId = props.navigation.getParam('id');
  const title = props.navigation.getParam('title');
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find(
      (product) => product.id === productId,
    ),
  );
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image source={{uri: selectedProduct.imageUrl}} style={styles.image} />
      <View style={{marginVertical: 10, alignItems: 'center'}}>
        <Button
          title="ADD TO CART"
          color={Colors.primary}
          onPress={() => dispatch(CartAction.addToCart(selectedProduct))}
          testID={selectedProduct.title}
          accessibilityLabel={selectedProduct.title}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetail.navigationOptions = (data) => {
  return {
    headerTitle: data.navigation.getParam('title'),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: Fonts.bold,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: Fonts.regular,
  },
});

export default ProductDetail;
