import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {AuthStatus} from "../../consts.js";

const NAME_SPACE = NameSpace.USER;


export const getAuthStatus = (state) => {
  return state[NAME_SPACE].authStatus;
};

export const getAuthInfo = (state) => {
  return state[NAME_SPACE].authInfo;
};

export const getAuthError = (state) => {
  return state[NAME_SPACE].authError;
};

export const isUserAuthorized = createSelector(
    getAuthStatus,
    (authStatus) => {
      return authStatus === AuthStatus.AUTH;
    }
);


