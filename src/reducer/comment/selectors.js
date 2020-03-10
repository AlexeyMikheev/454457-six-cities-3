import NameSpace from "../name-space.js";

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

