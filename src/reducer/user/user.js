import {extendObject} from "../../utils.js";
import {AuthStatus} from "../../consts";

const initialState = {
  authorizationStatus: AuthStatus.NO_AUTH,
};

const ActionType = {
  CHECK_AUTH: `CHECK_AUTH`
};

const ActionCreator = {
  checkAuth: (status) => {
    return {
      type: ActionType.CHECK_AUTH,
      payload: status
    };
  }
};

const checkAuth = (state, action) => {
  return extendObject(state, {authorizationStatus: action.payload});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHECK_AUTH:
      return checkAuth(state, action);
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.checkAuth(AuthStatus.AUTH));
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
      .then(() => {
        dispatch(ActionCreator.checkAuth(AuthStatus.AUTH));
      });
  },
};

export {ActionCreator, ActionType, Operation, reducer};
