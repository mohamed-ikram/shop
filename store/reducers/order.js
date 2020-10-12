import {ADD_ORDER, SET_ORDER} from '../actionTypes/order';
import Order from '../../modals/order';

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return {orders: action.orders};
    case ADD_ORDER:
      console.log(action.orderData.id);
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.date,
      );
      console.log(newOrder);
      return {...state, orders: state.orders.concat(newOrder)};
  }
  return state;
};

export default orderReducer;
