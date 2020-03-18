import NameSpace from "../name-space.js";
import {createSelector} from "reselect";
import {LoadingStatus} from "../../consts.js";

const NAME_SPACE = NameSpace.COMMNET;

export const getCommnets = (state) => {
  return state[NAME_SPACE].comments;
};

export const getCommentError = (state) => {
  return state[NAME_SPACE].commentError;
};

export const getLoadingStatus = (state) => {
  return state[NAME_SPACE].loadingStatus;
};

export const isLoadingStatus = createSelector(
    getLoadingStatus,
    (loadingStatus) => {
      return loadingStatus === LoadingStatus.LOADING;
    }
);

export const isSuccessStatus = createSelector(
    getLoadingStatus,
    (loadingStatus) => {
      return loadingStatus === LoadingStatus.SUCCESS;
    }
);
