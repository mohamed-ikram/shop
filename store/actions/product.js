import Axios from 'axios';
import Product from '../../modals/product';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT,
} from '../actionTypes/product';

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await Axios.get('products.json');
    const productsArray = [];
    for (const key in response.data) {
      const data = response.data[key];
      productsArray.push(
        new Product(
          key,
          'u1',
          data.title,
          data.imageUrl,
          data.description,
          data.price,
        ),
      );
    }
    console.log(productsArray);
    dispatch({
      type: SET_PRODUCT,
      produts: productsArray,
    });
  };
};

export const deleteProduct = (id) => {
  return {type: DELETE_PRODUCT, pid: id};
};

export const createProduct = (title, image, price, desc) => {
  const produts = {
    title: title,
    imageUrl: image,
    price: price,
    description: desc,
  };
  return async (dispatch) => {
    const response = await Axios.post('products.json', JSON.stringify(produts));
    dispatch({
      type: CREATE_PRODUCT,
      productData: produts,
    });
  };
};

export const updateProduct = (id, title, image, price, desc) => {
  return {
    type: UPDATE_PRODUCT,
    productData: {
      id: id,
      title: title,
      imageUrl: image,
      price: price,
      description: desc,
    },
  };
};
