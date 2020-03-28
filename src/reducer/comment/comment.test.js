import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, Operation, ActionCreator, ActionType} from "./comment.js";
import {LoadingStatus, Url} from "../../consts";
import {adaptCommentsResponse} from "../../adapters.js";

const api = createAPI(() => {});

const mockDate = new Date(0).valueOf();

const commentData = {
  comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  rating: 4
};

const commentsMock = [
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: mockDate,
    id: 1,
    rating: 4,
    user: {
      [`avatar_url`]: `img/1.png`,
      id: 4,
      [`is_pro`]: false,
      name: `Max`
    }
  }
];

const commentError = `comment error`;
const offerId = -1;

it(`Reducer comment initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    comments: [],
    commentError: null,
    loadingStatus: LoadingStatus.DEFAULT
  });
});


it(`Reducer comment SET_COMMENTS`, () => {
  expect(reducer({
    comments: [],
    commentError: null,
    loadingStatus: LoadingStatus.DEFAULT
  }, ActionCreator.setComments(commentsMock))).toEqual({
    comments: commentsMock,
    commentError: null,
    loadingStatus: LoadingStatus.DEFAULT
  });
});

it(`Reducer comment SET_COMMENT_ERROR`, () => {
  expect(reducer({
    comments: commentsMock,
    commentError: null,
    loadingStatus: LoadingStatus.DEFAULT
  }, ActionCreator.setCommentError(commentError))).toEqual({
    comments: commentsMock,
    commentError,
    loadingStatus: LoadingStatus.DEFAULT
  });
});

it(`Reducer comment SET_LOADING_STATUS`, () => {
  expect(reducer({
    comments: [],
    commentError: null,
    loadingStatus: LoadingStatus.DEFAULT
  }, ActionCreator.setLoadingStatus(LoadingStatus.LOADING))).toEqual({
    comments: [],
    commentError: null,
    loadingStatus: LoadingStatus.LOADING
  });
});


describe(`Reducer comment Operation.getComments`, () => {
  it(`Should make a correct API`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.getComments(offerId);

    apiMock
      .onGet(`/${Url.COMMENTS}/${offerId}`)
      .reply(200, commentsMock);

    return loader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_COMMENTS,
          payload: adaptCommentsResponse(commentsMock)
        });
      });
  });
});

describe(`Reducer comment Operation.sendComment success`, () => {
  it(`Should make a correct API`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.sendComment(offerId, commentData);

    apiMock
      .onPost(`/${Url.COMMENTS}/${offerId}`)
      .reply(200, commentsMock);

    return loader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_LOADING_STATUS,
          payload: LoadingStatus.LOADING
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_COMMENTS,
          payload: adaptCommentsResponse(commentsMock)
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_LOADING_STATUS,
          payload: LoadingStatus.SUCCESS
        });
      });
  });
});

describe(`Reducer comment Operation.sendComment error`, () => {
  it(`Should make a correct API`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.sendComment(offerId, commentData);

    apiMock
      .onPost(`/${Url.COMMENTS}/${offerId}`)
      .reply(400, {error: commentError});

    return loader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_LOADING_STATUS,
          payload: LoadingStatus.LOADING
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_LOADING_STATUS,
          payload: LoadingStatus.ERROR
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_COMMENT_ERROR,
          payload: commentError
        });

      });
  });
});


