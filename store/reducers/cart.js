import {ADD_TO_CART, REMOVE_FROM_CART} from '../actionTypes/cart';
import CartItem from '../../modals/cart-item';
import {ADD_ORDER} from '../actionTypes/order';

const initialState = {
  items: {},
  totalAmount: 0,
};

const CartReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_TO_CART:
      const addedProduct = actions.product;
      const price = addedProduct.price;
      const title = addedProduct.title;
      let cartItem = null;
      if (state.items[addedProduct.id]) {
        //available
        cartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          price,
          title,
          state.items[addedProduct.id].sum + price,
        );
      } else {
        cartItem = new CartItem(1, price, title, price);
      }
      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: cartItem,
        },
        totalAmount: state.totalAmount + price,
      };
    case REMOVE_FROM_CART:
      const selectedItem = state.items[actions.id];
      const currentQty = selectedItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedItem.quantity - 1,
          selectedItem.price,
          selectedItem.title,
          selectedItem.sum - selectedItem.price,
        );
        updatedCartItems = {...state.items, [actions.id]: updatedCartItem};
      } else {
        updatedCartItems = {...state.items};
        delete updatedCartItems[actions.id];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedItem.price,
      };
    case ADD_ORDER:
      return initialState;
  }
  return state;
};
export default CartReducer;
