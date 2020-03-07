import {extendObject} from "../../utils.js";
import {ErrorType} from "../../consts";
import Comment from "../../model/comment.js";

const initialState = {
  comments: [],
  commentError: null,
  isLoading: false
};

const ActionType = {
  SET_COMMENTS: `SET_COMMENTS`,
  SET_COMMENT_ERROR: `SET_COMMENT_ERROR`,
  SET_LOADING_STATUS: `SET_LOADING_STATUS`,
};

const ActionCreator = {
  setComments: (comments) => {
    return {
      type: ActionType.SET_COMMENTS,
      payload: comments
    };
  },
  setCommentError: (message) => {
    return {
      type: ActionType.SET_COMMENT_ERROR,
      payload: message
    };
  },
  setLoadingStatu: (isLoading) => {
    return {
      type: ActionType.SET_LOADING_STATUS,
      payload: isLoading
    };
  }
};

const setCommentError = (state, action) => {
  return extendObject(state, {commentError: action.payload});
};

const setComments = (state, action) => {
  return extendObject(state, {comments: action.payload});
};

const addComment = (state, action) => {
  const updatedComments = [...state.comments, action.payload];

  return extendObject(state, {comments: updatedComments});
};

const setLoadingStatus = (state, action) => {
  return extendObject(state, {commeisLoadingntError: action.payload});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_COMMENTS:
      return setComments(state, action);
    case ActionType.ADD_COMMENT:
      return addComment(state, action);
    case ActionType.SET_COMMENT_ERROR:
      return setCommentError(state, action);
    case ActionType.SET_LOADING_STATUS:
      return setLoadingStatus(state, action);
  }

  return state;
};

const Operation = {
  getComments: (offerId) => (dispatch, getState, api) => {
    return api.get(`/comments/${offerId}`)
      .then((response) => {
        dispatch(ActionCreator.setComments(Comment.parseComemnts(response.data)));
      })
      .catch((err) => {
        const {response} = err;

        if (response.status === ErrorType.BABREQUEST) {
          ActionCreator.setCommentError(response.data.error);
        }
        throw err;
      });
  },

  sendComment: (offerId, commentData) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setLoadingStatu(true));
    return api.post(`/comments/${offerId}`, commentData)
    .then((response) => {
      dispatch(ActionCreator.setComments(Comment.parseComemnts(response.data)));

      dispatch(ActionCreator.setLoadingStatu(false));
    })
    .catch((err) => {
      const {response} = err;

      if (response.status === ErrorType.BABREQUEST) {
        dispatch(ActionCreator.setAuthError(response.data.error));
      }
      dispatch(ActionCreator.setLoadingStatu(false));
      throw err;
    });
  },
};

export {ActionCreator, ActionType, Operation, reducer};
