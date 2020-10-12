import Axios from 'axios';
import Order from '../../modals/order';
import {ADD_ORDER, SET_ORDER} from '../actionTypes/order';

export const fetchOrder = () => {
  return async (dispatch) => {
    const response = await Axios.get('orders/u1.json');
    let loadedOrder = [];
    for (let key in response.data) {
      const item = response.data[key];
      loadedOrder.push(new Order(key, item.items, item.amount, item.date));
    }
    dispatch({type: SET_ORDER, orders: loadedOrder});
  };
};
export const addOrder = (cartItems, totalAmount) => {
  const date = new Date();
  const itemDetails = {items: cartItems, amount: totalAmount};
  return async (dispatch) => {
    const response = await Axios.post(
      'orders/u1.json',
      JSON.stringify({...itemDetails, date: date.toISOString()}),
    );
    dispatch({
      type: ADD_ORDER,
      orderData: {id: response.data.name, ...itemDetails},
      date: date,
    });
  };
};
