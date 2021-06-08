import {
  REGISTER_RIGHT,
  REGISTER_WRONG,
  CLEAN_ALERT,
  LOGIN_RIGHT,
  LOGIN_WRONG,
  GET_USER,
  LOGOUT,
} from "../../Types";
const AuthReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_RIGHT:
    case REGISTER_WRONG:
    case LOGIN_WRONG:
    case CLEAN_ALERT:
      return {
        ...state,
        msg: action.payload,
      };
    case LOGIN_RIGHT:
      localStorage.setItem("loginToken", action.payload);
      return {
        ...state,
        auth: true,
        token: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        auth: true,
      };
    case LOGOUT:
      localStorage.removeItem("loginToken");
      return {
        ...state,
        token: null,
        auth: null,
        user: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
