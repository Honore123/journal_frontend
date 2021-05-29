import * as ActionTypes from "./ActionTypes";

export const Auth = (
  state = {
    isLoading: false,
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token"),
    user: localStorage.getItem("creds")
      ? JSON.parse(localStorage.getItem("creds"))
      : null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: null,
        user: action.payload.user,
        token: action.payload.token,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.message,
      };
    case ActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: true,
      };
    case ActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMess: action.message,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    case ActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
      };
    case ActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};
