import {ADD_ORDER} from '../actionTypes/order';
import Order from '../../modals/order';

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        Math.random(),
        action.orderData.items,
        action.orderData.amount,
        new Date(),
      );
      return {...state, orders: state.orders.concat(newOrder)};
  }
  return state;
};

export default orderReducer;
