import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from '../actionTypes/product';

export const deleteProduct = (id) => {
  return {type: DELETE_PRODUCT, pid: id};
};

export const createProduct = (title, image, price, desc) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title: title,
      imageUrl: image,
      price: price,
      description: desc,
    },
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
