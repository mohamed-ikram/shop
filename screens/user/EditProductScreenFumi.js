import React, {useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import Fonts from '../../constants/Fonts';
import * as yup from 'yup';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButtons from '../../components/UI/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Fumi} from 'react-native-textinput-effects';
import Colors from '../../constants/Colors';
import {Formik, Form} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import {updateProduct, createProduct} from '../../store/actions/product';

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam('prodId');
  let initialValues = {title: '', image: '', price: '', description: ''};
  if (productId) {
    const products = useSelector((state) => state.products.userProducts);
    const editProduct = products.find((product) => product.id === productId);
    initialValues = {
      title: editProduct.title,
      image: editProduct.imageUrl,
      price: editProduct.price.toString(),
      description: editProduct.description,
    };
  }
  const dispatch = useDispatch();
  const yupValidation = yup.object().shape({
    title: yup
      .string()
      .required('Title is required')
      .min(3, 'Title should have minimum of 3 or more characters'),
    image: yup
      .string()
      .required('Image link is required')
      .matches(/.(jpg|jpeg|png|gif)$/i, 'Enter Valid images'),
    price: yup
      .number()
      .typeError('Prize must be a number')
      .required('Enter the price'),
    description: yup
      .string()
      .required('Description is required')
      .min(3, 'Description should have minimum of 3 or more characters'),
  });
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <Formik
          initialValues={initialValues}
          validationSchema={yupValidation}
          onSubmit={(values) => {
            if (productId) {
              dispatch(
                updateProduct(
                  productId,
                  values.title,
                  values.image,
                  +values.price,
                  values.description,
                ),
              );
            } else {
              dispatch(
                createProduct(
                  values.title,
                  values.image,
                  +values.price,
                  values.description,
                ),
              );
            }
            // props.navigation.goBack();
          }}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            setFieldTouched,
            touched,
          }) => {
            useEffect(() => {
              props.navigation.setParams({handleSubmit: handleSubmit.bind()});
            }, []);
            return (
              <View style={{margin: 10, paddingTop: 20}}>
                <View
                  style={
                    touched.title && errors.title ? null : {marginBottom: 16}
                  }>
                  <Fumi
                    name="title"
                    label={'Title'}
                    iconClass={Ionicons}
                    iconName={'trophy-sharp'}
                    iconColor={Colors.primary}
                    inputStyle={{color: 'black'}}
                    iconSize={28}
                    inputPadding={20}
                    iconWidth={50}
                    value={values.title}
                    onChangeText={handleChange('title')}
                    autoCapitalize={'sentences'}
                    autoCorrect={false}
                    returnKeyType={'next'}
                    testID="title"
                    accessibilityLabel="title"
                    // onEndEditing={() => console.log('Edit')}
                    // onSubmitEditing={() => console.log('Submit')}
                    onBlur={() => setFieldTouched('title')}
                  />
                  {touched.title && errors.title && (
                    <Text style={styles.error}>{errors.title}</Text>
                  )}
                </View>
                <View
                  style={
                    touched.image && errors.image ? null : {marginBottom: 16}
                  }>
                  <Fumi
                    name="image"
                    label={'Image'}
                    iconClass={Ionicons}
                    iconName={'aperture-sharp'}
                    iconColor={Colors.primary}
                    inputStyle={{color: 'black'}}
                    iconSize={28}
                    inputPadding={20}
                    iconWidth={50}
                    testID="image"
                    accessibilityLabel="image"
                    value={values.image}
                    onChangeText={handleChange('image')}
                    onBlur={() => setFieldTouched('image')}
                  />
                  {touched.image && errors.image && (
                    <Text style={styles.error}>{errors.image}</Text>
                  )}
                </View>
                <View
                  style={
                    touched.price && errors.price ? null : {marginBottom: 16}
                  }>
                  <Fumi
                    name="price"
                    label={'Price'}
                    keyboardType={'number-pad'}
                    iconClass={Ionicons}
                    iconName={'pricetags-sharp'}
                    iconColor={Colors.primary}
                    inputStyle={{color: 'black'}}
                    iconSize={28}
                    inputPadding={20}
                    testID="price"
                    accessibilityLabel="price"
                    iconWidth={50}
                    value={values.price}
                    onChangeText={handleChange('price')}
                    onBlur={() => setFieldTouched('price')}
                  />
                  {touched.price && errors.price && (
                    <Text style={styles.error}>{errors.price}</Text>
                  )}
                </View>
                <View
                  style={
                    touched.description && errors.description
                      ? null
                      : {marginBottom: 16}
                  }>
                  <Fumi
                    name="description"
                    label={'Description'}
                    iconClass={Ionicons}
                    iconName={'reader-sharp'}
                    iconColor={Colors.primary}
                    inputStyle={{color: 'black'}}
                    iconSize={28}
                    inputPadding={20}
                    iconWidth={50}
                    value={values.description}
                    onChangeText={handleChange('description')}
                    onBlur={() => setFieldTouched('description')}
                    testID="description"
                    accessibilityLabel="description"
                  />
                  {touched.description && errors.description && (
                    <Text style={styles.error}>{errors.description}</Text>
                  )}
                </View>
              </View>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (data) => {
  return {
    headerTitle: data.navigation.getParam('prodId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item
          title="Finish"
          iconSize={30}
          iconName={
            Platform.OS === 'android'
              ? 'checkmark-done-circle-outline'
              : 'checkmark-done-circle'
          }
          onPress={() => {
            data.navigation.state.params.handleSubmit();
          }}
          testID="Finish"
          accessibilityLabel="Finish"
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  error: {
    fontSize: 14,
    color: 'red',
    fontFamily: Fonts.bold,
    marginVertical: 4,
  },
});

export default EditProductScreen;
