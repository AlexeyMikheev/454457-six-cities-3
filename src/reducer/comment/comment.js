import {extendObject} from "../../utils.js";
import {ErrorType, Url, LoadingStatus} from "../../consts";
import {adaptCommentsResponse} from "../../adapters";

const initialState = {
  comments: [],
  commentError: null,
  loadingStatus: LoadingStatus.DEFAULT
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
  setLoadingStatu: (status) => {
    return {
      type: ActionType.SET_LOADING_STATUS,
      payload: status
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
  return extendObject(state, {loadingStatus: action.payload});
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
  resetComments: () => (dispatch, _getState, _api) => {
    dispatch(ActionCreator.setComments([]));
  },
  getComments: (offerId) => (dispatch, _getState, api) => {
    return api.get(`/${Url.COMMENTS}/${offerId}`)
      .then((response) => {
        dispatch(ActionCreator.setComments(adaptCommentsResponse(response.data)));
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
    dispatch(ActionCreator.setLoadingStatus(LoadingStatus.LOADING));
    return api.post(`/${Url.COMMENTS}/${offerId}`, commentData)
    .then((response) => {
      dispatch(ActionCreator.setComments(adaptCommentsResponse(response.data)));

      dispatch(ActionCreator.setLoadingStatus(LoadingStatus.SUCCESS));
    })
    .catch((err) => {
      const {response} = err;

      if (response.status === ErrorType.BABREQUEST) {
        dispatch(ActionCreator.setLoadingStatus(LoadingStatus.ERROR));
      }
      dispatch(ActionCreator.setLoadingStatus(false));
      throw err;
    });
  },
};

export {ActionCreator, ActionType, Operation, reducer};
