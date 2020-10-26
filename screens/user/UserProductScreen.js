import React from 'react';
import {View, Text, StyleSheet, FlatList, Button, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import {deleteProduct} from '../../store/actions/product';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButtons from '../../components/UI/Header';

const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  console.log(userProducts);
  const dispatch = useDispatch();
  const editHandler = (id) => {
    props.navigation.navigate('EditProduct', {prodId: id});
  };
  const deleteHandler = (id) => {
    Alert.alert('Are you sure', 'Do you really want to delete', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          {...itemData.item}
          onSelect={() => editHandler(itemData.item.id)}>
          <Button
            title="Edit"
            color={Colors.primary}
            onPress={() => editHandler(itemData.item.id)}
          />
          <Button
            title="Delete"
            color={Colors.primary}
            onPress={() => deleteHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No products found, maybe start creating some?</Text>
        </View>
      )}
      contentContainerStyle={{flexGrow: 1}}
    />
  );
};

UserProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Products',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item
          title="add"
          iconSize={30}
          iconName={Platform.OS === 'android' ? 'add' : 'add'}
          onPress={() => {
            // props.toggleDrawer();
            navData.navigation.navigate('EditProduct');
          }}
          testID="add"
          accessibilityLabel="add"
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default UserProductScreen;
