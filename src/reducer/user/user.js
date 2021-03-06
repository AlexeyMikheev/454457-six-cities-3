import {extendObject} from "../../utils.js";
import {AuthStatus, ErrorType, Url, AppRoute} from "../../consts";
import {Operation as DataOperation} from "../data/data.js";
import history from "../../history.js";

const initialState = {
  authStatus: AuthStatus.NO_AUTH,
  authInfo: null,
  authError: null
};

const ActionType = {
  SET_AUTH_STATUS: `SET_AUTH_STATUS`,
  SET_AUTH: `SET_AUTH`,
  SET_AUTH_ERROR: `SET_AUTH_ERROR`,
};

const ActionCreator = {
  setAuthStatus: (status) => {
    return {
      type: ActionType.SET_AUTH_STATUS,
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

const setAuth = (state, action) => {
  return extendObject(state, {authInfo: action.payload, authStatus: AuthStatus.AUTH});
};

const setAuthError = (state, action) => {
  return extendObject(state, {authError: action.payload});
};

const setAuthStatus = (state, action) => {
  return extendObject(state, {authStatus: action.payload});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTH:
      return setAuth(state, action);
    case ActionType.SET_AUTH_ERROR:
      return setAuthError(state, action);
    case ActionType.SET_AUTH_STATUS:
      return setAuthStatus(state, action);
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, _getState, api) => {
    dispatch(ActionCreator.setAuthStatus(AuthStatus.LOADING));
    return api.get(`/${Url.LOGIN}`)
      .then((response) => {
        dispatch(ActionCreator.setAuthInfo(response.data));

        dispatch(DataOperation.loadFavorits());
      })
      .catch((err) => {
        const {response} = err;

        if (response.status === ErrorType.UNAUTHORIZED) {
          dispatch((ActionCreator.setAuthStatus(AuthStatus.NO_AUTH)));
        } else {
          dispatch((ActionCreator.setAuthStatus(AuthStatus.NO_AUTH)));
          dispatch(ActionCreator.setAuthError(`Error. Service is not available`));
          history.push(AppRoute.LOGIN);
        }
      });
  },

  login: (authData) => (dispatch, _getState, api) => {
    return api.post(`/${Url.LOGIN}`, {
      email: authData.login,
      password: authData.password,
    })
    .then((response) => {
      dispatch(ActionCreator.setAuthInfo(response.data));

      dispatch(DataOperation.loadFavorits());

      history.goBack();
    })
    .catch((err) => {
      const {response} = err;

      if (response.status === ErrorType.BABREQUEST) {
        dispatch(ActionCreator.setAuthError(response.data.error));
      }
    });
  },
};

export {ActionCreator, ActionType, Operation, reducer};
