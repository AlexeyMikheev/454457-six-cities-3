import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, Operation, ActionCreator, ActionType} from "./comment.js";
import {LoadingStatus, Url} from "../../consts";
import {adaptCommentsResponse} from "../../adapters.js";

const api = createAPI(() => {});

const mockDate = new Date(0).valueOf();

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

const commentError = `comment arror`;
const offerId = -1;

it(`Reducer comment initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    comments: [],
    commentError: null,
    loadingStatus: LoadingStatus.DEFAULT
  });
});


it(`Reducer comment setComments`, () => {
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

it(`Reducer comment setComments`, () => {
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


describe(`Reducer user getComments`, () => {
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
