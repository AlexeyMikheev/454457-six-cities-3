import {extendObject} from "../../utils.js";
import {AuthStatus, ErrorType} from "../../consts";

const initialState = {
  authStatus: AuthStatus.NO_AUTH,
  authInfo: null,
  authError: null
};

const ActionType = {
  CHECK_AUTH: `CHECK_AUTH`,
  SET_AUTH: `SET_AUTH`,
  SET_AUTH_ERROR: `SET_AUTH_ERROR`,
};

const ActionCreator = {
  setAuthStatus: (status) => {
    return {
      type: ActionType.CHECK_AUTH,
      payload: status
    };
  },
  setAuthInfo: (authInfo) => {
    return {
      type: ActionType.SET_AUTH,
      payload: authInfo
    };
  },
  setAuthError: (error) => {
    return {
      type: ActionType.SET_AUTH_ERROR,
      payload: error
    };
  },
};

const checkAuth = (state, action) => {
  return extendObject(state, {authStatus: action.payload});
};

const setAuth = (state, action) => {
  return extendObject(state, {authInfo: action.payload, authStatus: AuthStatus.AUTH});
};

const setAuthError = (state, action) => {
  return extendObject(state, {authError: action.payload});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHECK_AUTH:
      return checkAuth(state, action);
    case ActionType.SET_AUTH:
      return setAuth(state, action);
    case ActionType.SET_AUTH_ERROR:
      return setAuthError(state, action);
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.setAuthInfo(response.data));
      })
      .catch((err) => {
        const {response} = err;

        if (response.status === ErrorType.UNAUTHORIZED) {
          ActionCreator.setAuthStatus(AuthStatus.NO_AUTH);
        }
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
    .then((response) => {
      dispatch(ActionCreator.setAuthInfo(response.data));
    })
    .catch((err) => {
      const {response} = err;

      if (response.status === ErrorType.BABREQUEST) {
        dispatch(ActionCreator.setAuthError(response.data.error));
      }
      throw err;
    });
  },
};

export {ActionCreator, ActionType, Operation, reducer};
