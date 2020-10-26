const {SIGNIN, SIGNUP, AUTHENICATE, LOGOUT} = require('../actionTypes/auth');

const initialState = {
  token: null,
  userId: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SIGNIN:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    case AUTHENICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default AuthReducer;
