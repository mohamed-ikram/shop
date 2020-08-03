import {ADD_ORDER} from '../actionTypes/order';

export const addOrder = (cartItems, totalAmount) => {
  return {type: ADD_ORDER, orderData: {items: cartItems, amount: totalAmount}};
};
