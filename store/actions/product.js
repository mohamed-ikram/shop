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
    try {
      const response = await Axios.get('products.json');
      if (!response.status) {
        throw new Error('Something went wrong!');
      }
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
      dispatch({
        type: SET_PRODUCT,
        produts: productsArray,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (id) => {
  console.log(id);
  return async (dispatch) => {
    const response = await Axios.delete(`products/${id}.json`);
    if (!response.status) {
      throw new Error('Something went wrong!');
    }
    dispatch({type: DELETE_PRODUCT, pid: id});
  };
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
      productData: {
        id: response.data.name,
        ...produts,
      },
    });
  };
};

export const updateProduct = (id, title, image, price, desc) => {
  return async (dispatch) => {
    const response = await Axios.patch(
      `products/${id}.json`,
      JSON.stringify({
        title: title,
        imageUrl: image,
        price: price,
        description: desc,
      }),
    );
    if (!response.status) {
      throw new Error('Something went wrong!');
    }
    dispatch({
      type: UPDATE_PRODUCT,
      productData: {
        id: id,
        title: title,
        imageUrl: image,
        price: price,
        description: desc,
      },
    });
  };
};
