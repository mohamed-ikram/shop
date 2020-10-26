import PRODUCTS from '../../data/dummy-data';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT,
} from '../actionTypes/product';
import Product from '../../modals/product';

// const initialState = {
//   availableProducts: PRODUCTS,
//   userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
// };

const initialState = {
  availableProducts: [],
  userProducts: [],
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        availableProducts: action.produts,
        userProducts: action.userProducts,
      };

    case CREATE_PRODUCT:
      const createAction = action.productData;
      const newProduct = new Product(
        createAction.id,
        createAction.ownerId,
        createAction.title,
        createAction.imageUrl,
        createAction.description,
        createAction.price,
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const updateAction = action.productData;
      const productIndex = state.userProducts.findIndex(
        (product) => product.id === updateAction.id,
      );
      const updatedProduct = new Product(
        updateAction.id,
        'u1',
        updateAction.title,
        updateAction.imageUrl,
        updateAction.description,
        updateAction.price,
      );
      const updatedProducts = [...state.userProducts];
      updatedProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.userProducts.findIndex(
        (product) => product.id === updateAction.id,
      );
      const updateAvailable = [...state.availableProducts];
      updateAvailable[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updateAvailable,
        userProducts: updatedProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid,
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid,
        ),
      };
  }
  return state;
};

export default productReducer;
