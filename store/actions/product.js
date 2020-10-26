import Axios from 'axios';
import Product from '../../modals/product';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT,
} from '../actionTypes/product';

export const fetchProducts = () => {
  return async (dispatch, state) => {
    const userId = state().auth.userId;
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
            data.ownerId,
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
        userProducts: productsArray.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, state) => {
    const token = state().auth.token;
    const response = await Axios.delete(`products/${id}.json?auth=${token}`);
    if (!response.status) {
      throw new Error('Something went wrong!');
    }
    dispatch({type: DELETE_PRODUCT, pid: id});
  };
};

export const createProduct = (title, image, price, desc) => {
  let produts = {
    title: title,
    imageUrl: image,
    price: price,
    description: desc,
  };
  return async (dispatch, state) => {
    const token = state().auth.token;
    const userId = state().auth.userId;
    produts.ownerId = userId;
    const response = await Axios.post(
      `products.json?auth=${token}`,
      JSON.stringify(produts),
    );
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
  return async (dispatch, state) => {
    const token = state().auth.token;
    const response = await Axios.patch(
      `products/${id}.json?auth=${token}`,
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
