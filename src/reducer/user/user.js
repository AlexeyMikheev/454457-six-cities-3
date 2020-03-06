import {extendObject} from "../../utils.js";
import {AuthStatus} from "../../consts";

const initialState = {
  authStatus: AuthStatus.NO_AUTH,
  authInfo: null
};

const ActionType = {
  CHECK_AUTH: `CHECK_AUTH`,
  SET_AUTH: `SET_AUTH`,
};

const ActionCreator = {
  checkAuth: (status) => {
    return {
      type: ActionType.CHECK_AUTH,
      payload: status
    };
  },
  setAuth: (authInfo) => {
    return {
      type: ActionType.SET_AUTH,
      payload: authInfo
    };
  }
};

const checkAuth = (state, action) => {
  return extendObject(state, {authStatus: action.payload});
};

const setAuth = (state, action) => {
  return extendObject(state, {authInfo: action.payload, authStatus: AuthStatus.AUTH});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHECK_AUTH:
      return checkAuth(state, action);
    case ActionType.SET_AUTH:
      return setAuth(state, action);
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.setAuth(response.data));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.setAuth(response.data));
      });
  },
};

export {ActionCreator, ActionType, Operation, reducer};
